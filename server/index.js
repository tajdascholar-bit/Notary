import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'
import { randomUUID } from 'crypto'
import db from './db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const UPLOADS_DIR = join(__dirname, 'uploads')
const PORT = process.env.PORT || 3001
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'notaryadmin2024'

const app = express()
app.use(cors())
app.use(express.json())

// ── Multer storage ──────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${randomUUID()}${extname(file.originalname)}`
    cb(null, unique)
  },
})

const ALLOWED_MIME = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/tiff',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB per file
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error(`File type not allowed: ${file.mimetype}`))
    }
  },
})

// ── Admin auth middleware ────────────────────────────────────────────────────
function adminOnly(req, res, next) {
  const auth = req.headers['x-admin-password']
  if (auth === ADMIN_PASSWORD) return next()
  res.status(401).json({ error: 'Unauthorized' })
}

// ── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true }))

// Admin login check
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body
  if (password === ADMIN_PASSWORD) {
    res.json({ ok: true })
  } else {
    res.status(401).json({ error: 'Incorrect password' })
  }
})

// ── CLIENT: Submit documents for notarization ────────────────────────────────
app.post('/api/submissions', upload.array('documents', 10), (req, res) => {
  try {
    const { client_name, client_email, client_phone, company, service_type, notes } = req.body

    if (!client_name || !client_email || !service_type) {
      return res.status(400).json({ error: 'Name, email, and service type are required.' })
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'At least one document is required.' })
    }

    const submissionId = randomUUID()

    db.prepare(`
      INSERT INTO submissions (id, client_name, client_email, client_phone, company, service_type, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(submissionId, client_name, client_email, client_phone || null, company || null, service_type, notes || null)

    const insertDoc = db.prepare(`
      INSERT INTO documents (id, submission_id, stored_name, original_name, mime_type, size_bytes, doc_type)
      VALUES (?, ?, ?, ?, ?, ?, 'original')
    `)

    for (const file of req.files) {
      insertDoc.run(randomUUID(), submissionId, file.filename, file.originalname, file.mimetype, file.size)
    }

    res.status(201).json({ id: submissionId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error. Please try again.' })
  }
})

// ── CLIENT: Track a submission by ID + email ─────────────────────────────────
app.get('/api/submissions/:id/track', (req, res) => {
  const { id } = req.params
  const { email } = req.query

  const sub = db.prepare('SELECT * FROM submissions WHERE id = ?').get(id)
  if (!sub) return res.status(404).json({ error: 'Submission not found.' })
  if (sub.client_email.toLowerCase() !== (email || '').toLowerCase()) {
    return res.status(403).json({ error: 'Email does not match this submission.' })
  }

  const docs = db.prepare('SELECT * FROM documents WHERE submission_id = ?').all(id)
  res.json({ ...sub, documents: docs })
})

// ── ADMIN: List all submissions ───────────────────────────────────────────────
app.get('/api/admin/submissions', adminOnly, (_req, res) => {
  const submissions = db.prepare(`
    SELECT s.*, COUNT(d.id) as doc_count
    FROM submissions s
    LEFT JOIN documents d ON d.submission_id = s.id AND d.doc_type = 'original'
    GROUP BY s.id
    ORDER BY s.submitted_at DESC
  `).all()
  res.json(submissions)
})

// ── ADMIN: Get one submission with all docs ───────────────────────────────────
app.get('/api/admin/submissions/:id', adminOnly, (req, res) => {
  const sub = db.prepare('SELECT * FROM submissions WHERE id = ?').get(req.params.id)
  if (!sub) return res.status(404).json({ error: 'Not found' })
  const docs = db.prepare('SELECT * FROM documents WHERE submission_id = ? ORDER BY uploaded_at').all(req.params.id)
  res.json({ ...sub, documents: docs })
})

// ── ADMIN: Update submission status ──────────────────────────────────────────
app.patch('/api/admin/submissions/:id/status', adminOnly, (req, res) => {
  const { status } = req.body
  const allowed = ['pending', 'reviewing', 'notarized', 'completed']
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }
  db.prepare(`
    UPDATE submissions SET status = ?, updated_at = datetime('now') WHERE id = ?
  `).run(status, req.params.id)
  res.json({ ok: true })
})

// ── ADMIN: Upload notarized document back ────────────────────────────────────
app.post('/api/admin/submissions/:id/notarized', adminOnly, upload.single('document'), (req, res) => {
  try {
    const sub = db.prepare('SELECT id FROM submissions WHERE id = ?').get(req.params.id)
    if (!sub) return res.status(404).json({ error: 'Submission not found' })
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

    db.prepare(`
      INSERT INTO documents (id, submission_id, stored_name, original_name, mime_type, size_bytes, doc_type)
      VALUES (?, ?, ?, ?, ?, ?, 'notarized')
    `).run(randomUUID(), req.params.id, req.file.filename, req.file.originalname, req.file.mimetype, req.file.size)

    // Auto-advance status to notarized
    db.prepare(`
      UPDATE submissions SET status = 'notarized', updated_at = datetime('now') WHERE id = ? AND status = 'reviewing'
    `).run(req.params.id)

    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Upload failed' })
  }
})

// ── ADMIN: Delete a submission ────────────────────────────────────────────────
app.delete('/api/admin/submissions/:id', adminOnly, (req, res) => {
  db.prepare('DELETE FROM submissions WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

// ── Serve uploaded files (with access control) ────────────────────────────────
app.get('/api/files/:filename', (req, res) => {
  const adminHeader = req.headers['x-admin-password']
  const { submission_id, email, admin_pw } = req.query

  const doc = db.prepare('SELECT * FROM documents WHERE stored_name = ?').get(req.params.filename)
  if (!doc) return res.status(404).json({ error: 'File not found' })

  let authorized = false

  // Admin access: via header or query param (query param used for direct browser downloads)
  if (adminHeader === ADMIN_PASSWORD || admin_pw === ADMIN_PASSWORD) {
    authorized = true
  } else if (submission_id && email) {
    // Client access: can only download their own notarized documents
    const sub = db.prepare('SELECT * FROM submissions WHERE id = ?').get(submission_id)
    if (
      sub &&
      sub.client_email.toLowerCase() === email.toLowerCase() &&
      doc.submission_id === submission_id &&
      doc.doc_type === 'notarized'
    ) {
      authorized = true
    }
  }

  if (!authorized) return res.status(403).json({ error: 'Forbidden' })

  // Sanitize filename for Content-Disposition
  const safeName = doc.original_name.replace(/[^\w.\-]/g, '_')
  res.setHeader('Content-Disposition', `attachment; filename="${safeName}"`)
  res.sendFile(join(UPLOADS_DIR, req.params.filename))
})

// ── Multer error handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large. Maximum 20 MB per file.' })
  }
  console.error(err)
  res.status(500).json({ error: err.message || 'Server error' })
})

app.listen(PORT, () => console.log(`Notary API running on http://localhost:${PORT}`))
