import 'dotenv/config'
import app from './app.js'
import { init } from './db.js'

const PORT = process.env.PORT || 3001

// Initialize database schema then start server
init()
  .then(() => {
    app.listen(PORT, () => console.log(`Notary API running on http://localhost:${PORT}`))
  })
  .catch(err => {
    console.error('Failed to initialize database:', err)
    process.exit(1)
  })
