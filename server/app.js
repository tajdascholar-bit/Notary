import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { randomUUID } from 'crypto'
import * as db from './db.js'
import { upload, getUploadMode, saveAdminUpload, sendLocalFile, IS_BLOB, ALLOWED_MIME } from './storage.js'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'notaryadmin2024'

const app = express()
app.use(cors())
app.use(express.json())

// ── Admin auth middleware ─────────────────────────────────────────────────────
function adminOnly(req, res, next) {
  const auth = req.headers['x-admin-password'] || req.query.admin_pw
  if (auth === ADMIN_PASSWORD) return next()
  res.status(401).json({ error: 'Unauthorized' })
}

// ── Health ────────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ ok: true }))

// ── Upload mode (frontend queries this to decide how to upload) ───────────────
app.get('/api/upload-mode', (_req, res) => res.json({ mode: getUploadMode() }))

// ── Admin login ───────────────────────────────────────────────────────────────
app.post('/api/admin/login', (req, res) => {
  req.body.password === ADMIN_PASSWORD
    ? res.json({ ok: true })
    : res.status(401).json({ error: 'Incorrect password' })
})

// ── Vercel Blob client-upload token endpoint ──────────────────────────────────
// Only active when BLOB_READ_WRITE_TOKEN is set (production).
// @vercel/blob/client calls this to get a signed token, then uploads directly.
app.post('/api/blob-upload', async (req, res) => {
  if (!IS_BLOB) return res.status(404).json({ error: 'Blob upload not enabled' })
  try {
    const { handleUpload } = await import('@vercel/blob/client')
    const response = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (_pathname) => ({
        allowedContentTypes: ALLOWED_MIME,
        maximumSizeInBytes: 20 * 1024 * 1024,
      }),
      onUploadCompleted: async () => { /* no-op */ },
    })
    res.json(response)
  } catch (err) {
    console.error('blob-upload error', err)
    res.status(400).json({ error: err.message })
  }
})

// ── CLIENT: Submit documents ──────────────────────────────────────────────────
// Two modes:
//   multipart/form-data  → dev (direct file upload via multer)
//   application/json     → prod (blob URLs already uploaded by client)
app.post('/api/submissions', upload.array('documents', 10), async (req, res) => {
  try {
    const { client_name, client_email, client_phone, company, service_type, notes } = req.body

    if (!client_name || !client_email || !service_type) {
      return res.status(400).json({ error: 'Name, email, and service type are required.' })
    }

    const submissionId = randomUUID()
    await db.createSubmission({ id: submissionId, client_name, client_email, client_phone, company, service_type, notes })

    // ── Direct upload (dev): files come via multer ─────────────────────────
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await db.addDocument({
          id: randomUUID(),
          submission_id: submissionId,
          stored_name: file.filename,
          original_name: file.originalname,
          mime_type: file.mimetype,
          size_bytes: file.size,
          doc_type: 'original',
        })
      }
    }

    // ── Blob upload (prod): client sends blob URLs as JSON ────────────────
    const blobFiles = req.body.blobFiles
    if (blobFiles) {
      const parsed = typeof blobFiles === 'string' ? JSON.parse(blobFiles) : blobFiles
      for (const bf of parsed) {
        await db.addDocument({
          id: randomUUID(),
          submission_id: submissionId,
          stored_name: bf.url,
          original_name: bf.name,
          mime_type: bf.contentType || null,
          size_bytes: bf.size || null,
          doc_type: 'original',
        })
      }
    }

    if ((!req.files || req.files.length === 0) && !blobFiles) {
      // Clean up and fail
      await db.deleteSubmission(submissionId)
      return res.status(400).json({ error: 'At least one document is required.' })
    }

    res.status(201).json({ id: submissionId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error. Please try again.' })
  }
})

// ── CLIENT: Track submission ──────────────────────────────────────────────────
app.get('/api/submissions/:id/track', async (req, res) => {
  try {
    const sub = await db.getSubmissionById(req.params.id)
    if (!sub) return res.status(404).json({ error: 'Submission not found.' })
    if (sub.client_email.toLowerCase() !== (req.query.email || '').toLowerCase()) {
      return res.status(403).json({ error: 'Email does not match this submission.' })
    }
    const docs = await db.getDocsBySubmission(req.params.id)
    res.json({ ...sub, documents: docs })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── ADMIN: List all submissions ───────────────────────────────────────────────
app.get('/api/admin/submissions', adminOnly, async (_req, res) => {
  try {
    res.json(await db.getAllSubmissions())
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── ADMIN: Get one submission with docs ──────────────────────────────────────
app.get('/api/admin/submissions/:id', adminOnly, async (req, res) => {
  try {
    const sub = await db.getSubmissionWithDocs(req.params.id)
    if (!sub) return res.status(404).json({ error: 'Not found' })
    res.json(sub)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── ADMIN: Update status ──────────────────────────────────────────────────────
app.patch('/api/admin/submissions/:id/status', adminOnly, async (req, res) => {
  const allowed = ['pending', 'reviewing', 'notarized', 'completed']
  if (!allowed.includes(req.body.status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }
  await db.updateSubmissionStatus(req.params.id, req.body.status)
  res.json({ ok: true })
})

// ── ADMIN: Upload notarized document ─────────────────────────────────────────
app.post('/api/admin/submissions/:id/notarized', adminOnly, upload.single('document'), async (req, res) => {
  try {
    const sub = await db.getSubmissionById(req.params.id)
    if (!sub) return res.status(404).json({ error: 'Submission not found' })
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

    const { storedName, originalName, mimeType, sizeBytes } = await saveAdminUpload(req.file)

    await db.addDocument({
      id: randomUUID(),
      submission_id: req.params.id,
      stored_name: storedName,
      original_name: originalName,
      mime_type: mimeType,
      size_bytes: sizeBytes,
      doc_type: 'notarized',
    })

    // Auto-advance status
    if (sub.status === 'reviewing') {
      await db.updateSubmissionStatus(req.params.id, 'notarized')
    }

    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Upload failed' })
  }
})

// ── ADMIN: Delete submission ──────────────────────────────────────────────────
app.delete('/api/admin/submissions/:id', adminOnly, async (req, res) => {
  await db.deleteSubmission(req.params.id)
  res.json({ ok: true })
})

// ── Serve local files (dev only) ──────────────────────────────────────────────
app.get('/api/files/:filename', async (req, res) => {
  if (IS_BLOB) return res.status(410).json({ error: 'Files served via Vercel Blob in production.' })

  const adminAuth = req.headers['x-admin-password'] || req.query.admin_pw
  const { submission_id, email } = req.query

  const doc = await db.getDocumentByStoredName(req.params.filename)
  if (!doc) return res.status(404).json({ error: 'File not found' })

  let authorized = false
  if (adminAuth === ADMIN_PASSWORD) {
    authorized = true
  } else if (submission_id && email) {
    const sub = await db.getSubmissionById(submission_id)
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
  sendLocalFile(doc.stored_name, doc.original_name, res)
})

// ── Multer error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large. Maximum 20 MB per file.' })
  }
  console.error(err)
  res.status(500).json({ error: err.message || 'Server error' })
})

export default app
