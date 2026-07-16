import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { getDb } from '../db.js'
import { authMiddleware } from '../middleware/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, unique + ext)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg|mp4|mov/
    const ext = allowed.test(path.extname(file.originalname).toLowerCase())
    const mime = allowed.test((file.mimetype || '').split('/')[1])
    cb(null, ext || mime)
  }
})

const router = Router()

router.post('/upload', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  const db = getDb()
  const result = db.prepare('INSERT INTO media (filename, original_name, mime_type, size) VALUES (?, ?, ?, ?)').run(req.file.filename, req.file.originalname, req.file.mimetype, req.file.size)
  const media = db.prepare('SELECT * FROM media WHERE id = ?').get(result.lastInsertRowid)
  media.url = '/uploads/' + media.filename
  res.json(media)
})

router.get('/', authMiddleware, (req, res) => {
  const db = getDb()
  const media = db.prepare('SELECT * FROM media ORDER BY created_at DESC').all()
  res.json(media.map(m => ({ ...m, url: '/uploads/' + m.filename })))
})

router.delete('/:id', authMiddleware, (req, res) => {
  const db = getDb()
  const file = db.prepare('SELECT * FROM media WHERE id = ?').get(req.params.id)
  if (!file) return res.status(404).json({ error: 'Not found' })
  const filePath = path.join(UPLOAD_DIR, file.filename)
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  db.prepare('DELETE FROM media WHERE id = ?').run(req.params.id)
  res.json({ message: 'Deleted' })
})

export default router