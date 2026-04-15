import Database from 'better-sqlite3'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const db = new Database(join(__dirname, 'notary.db'))

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id          TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    company     TEXT,
    service_type TEXT NOT NULL,
    notes       TEXT,
    status      TEXT NOT NULL DEFAULT 'pending',
    submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS documents (
    id            TEXT PRIMARY KEY,
    submission_id TEXT NOT NULL,
    stored_name   TEXT NOT NULL,
    original_name TEXT NOT NULL,
    mime_type     TEXT,
    size_bytes    INTEGER,
    doc_type      TEXT NOT NULL DEFAULT 'original',
    uploaded_at   TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
  );
`)

export default db
