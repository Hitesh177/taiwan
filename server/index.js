import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'
import categoryRoutes from './routes/categories.js'
import mediaRoutes from './routes/media.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '50mb' }))

const uploadsDir = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
app.use('/uploads', express.static(uploadsDir))

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/media', mediaRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

const distPath = path.join(__dirname, '..', 'dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Taiwan Experience CMS running on http://localhost:${PORT}`)
  console.log(`Admin: http://localhost:${PORT}/admin`)
})