/**
 * File storage abstraction.
 *
 * Dev  (BLOB_READ_WRITE_TOKEN not set): multer diskStorage → local server/uploads/
 * Prod (BLOB_READ_WRITE_TOKEN set):     Vercel Blob client-side upload via /api/blob-upload
 *
 * In prod, the frontend uploads directly to Vercel Blob (bypasses serverless body limit).
 * The `stored_name` in the DB is the full Vercel Blob CDN URL.
 */

import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import { extname } from 'path'
import { randomUUID } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const UPLOADS_DIR = join(__dirname, 'uploads')
export const IS_BLOB = !!process.env.BLOB_READ_WRITE_TOKEN

export const ALLOWED_MIME = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/tiff',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

// ── Multer instance (only used in dev/direct-upload mode) ────────────────────
const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${randomUUID()}${extname(file.originalname)}`)
  },
})

export const upload = multer({
  storage: IS_BLOB ? multer.memoryStorage() : diskStorage,
  limits: { fileSize: IS_BLOB ? 10 * 1024 * 1024 : 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    ALLOWED_MIME.includes(file.mimetype) ? cb(null, true) : cb(new Error(`File type not allowed: ${file.mimetype}`))
  },
})

// ── Upload mode helper ────────────────────────────────────────────────────────
/** Returns the upload mode the client should use. */
export function getUploadMode() {
  return IS_BLOB ? 'blob' : 'direct'
}

// ── Admin upload: notarized document ─────────────────────────────────────────
/**
 * When admin uploads a notarized doc in prod, it's a small single-file upload.
 * We allow it to go through the function (< 10 MB) and immediately push to Vercel Blob.
 * Returns { storedName, originalName, mimeType, sizeBytes }.
 */
export async function saveAdminUpload(file) {
  if (IS_BLOB) {
    const { put } = await import('@vercel/blob')
    const blob = await put(file.originalname, file.buffer, {
      access: 'public',
      contentType: file.mimetype,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
    return {
      storedName: blob.url,
      originalName: file.originalname,
      mimeType: file.mimetype,
      sizeBytes: file.size,
    }
  }
  // Dev: already saved to disk by multer
  return {
    storedName: file.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    sizeBytes: file.size,
  }
}

// ── Serve a local file ────────────────────────────────────────────────────────
export function sendLocalFile(storedName, originalName, res) {
  const safeName = (originalName || storedName).replace(/[^\w.\-]/g, '_')
  res.setHeader('Content-Disposition', `attachment; filename="${safeName}"`)
  res.sendFile(join(UPLOADS_DIR, storedName))
}
