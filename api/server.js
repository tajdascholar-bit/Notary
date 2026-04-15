/**
 * Vercel Serverless Function entry point.
 * Imports the Express app and exports it as the default handler.
 * Vercel wraps it automatically.
 *
 * DB schema is initialized lazily on first request via the /api/health route
 * (or any request) because we can't run init() at module load time in serverless.
 */
import { init } from '../server/db.js'
import app from '../server/app.js'

let initialized = false

export default async function handler(req, res) {
  if (!initialized) {
    await init()
    initialized = true
  }
  app(req, res)
}
