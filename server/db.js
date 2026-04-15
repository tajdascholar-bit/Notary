import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required. See .env.example for setup instructions.')
}

const sql = neon(process.env.DATABASE_URL)

// ── Schema init (called on server start) ─────────────────────────────────────
export async function init() {
  await sql`
    CREATE TABLE IF NOT EXISTS submissions (
      id            TEXT PRIMARY KEY,
      client_name   TEXT NOT NULL,
      client_email  TEXT NOT NULL,
      client_phone  TEXT,
      company       TEXT,
      service_type  TEXT NOT NULL,
      notes         TEXT,
      status        TEXT NOT NULL DEFAULT 'pending',
      submitted_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS documents (
      id            TEXT PRIMARY KEY,
      submission_id TEXT NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
      stored_name   TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type     TEXT,
      size_bytes    BIGINT,
      doc_type      TEXT NOT NULL DEFAULT 'original',
      uploaded_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}

// ── Submissions ───────────────────────────────────────────────────────────────
export async function createSubmission({ id, client_name, client_email, client_phone, company, service_type, notes }) {
  await sql`
    INSERT INTO submissions (id, client_name, client_email, client_phone, company, service_type, notes)
    VALUES (${id}, ${client_name}, ${client_email}, ${client_phone ?? null}, ${company ?? null}, ${service_type}, ${notes ?? null})
  `
}

export async function getSubmissionById(id) {
  const rows = await sql`SELECT * FROM submissions WHERE id = ${id}`
  return rows[0] ?? null
}

export async function getAllSubmissions() {
  return sql`
    SELECT s.*, COUNT(d.id)::int AS doc_count
    FROM submissions s
    LEFT JOIN documents d ON d.submission_id = s.id AND d.doc_type = 'original'
    GROUP BY s.id
    ORDER BY s.submitted_at DESC
  `
}

export async function getSubmissionWithDocs(id) {
  const [subRows, docRows] = await Promise.all([
    sql`SELECT * FROM submissions WHERE id = ${id}`,
    sql`SELECT * FROM documents WHERE submission_id = ${id} ORDER BY uploaded_at`,
  ])
  const sub = subRows[0]
  if (!sub) return null
  return { ...sub, documents: docRows }
}

export async function updateSubmissionStatus(id, status) {
  await sql`
    UPDATE submissions SET status = ${status}, updated_at = NOW() WHERE id = ${id}
  `
}

export async function deleteSubmission(id) {
  await sql`DELETE FROM submissions WHERE id = ${id}`
}

// ── Documents ─────────────────────────────────────────────────────────────────
export async function addDocument({ id, submission_id, stored_name, original_name, mime_type, size_bytes, doc_type }) {
  await sql`
    INSERT INTO documents (id, submission_id, stored_name, original_name, mime_type, size_bytes, doc_type)
    VALUES (${id}, ${submission_id}, ${stored_name}, ${original_name}, ${mime_type ?? null}, ${size_bytes ?? null}, ${doc_type})
  `
}

export async function getDocumentByStoredName(storedName) {
  const rows = await sql`SELECT * FROM documents WHERE stored_name = ${storedName}`
  return rows[0] ?? null
}

export async function getDocsBySubmission(submission_id) {
  return sql`SELECT * FROM documents WHERE submission_id = ${submission_id} ORDER BY uploaded_at`
}
