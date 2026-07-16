import { Router } from 'express'
import { getDb } from '../db.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.get('/', (req, res) => {
  const db = getDb()
  const categories = db.prepare(`
    SELECT c.*, (SELECT COUNT(*) FROM posts WHERE category_id = c.id AND status = 'published') as post_count
    FROM categories c ORDER BY c.name ASC
  `).all()
  res.json(categories)
})

router.post('/', authMiddleware, (req, res) => {
  const db = getDb()
  const { name, slug, description } = req.body
  if (!name) return res.status(400).json({ error: 'Name required' })
  let catSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  try {
    db.prepare('INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)').run(name, catSlug, description || '')
    res.json(db.prepare('SELECT * FROM categories WHERE slug = ?').get(catSlug))
  } catch {
    res.status(400).json({ error: 'Category already exists' })
  }
})

router.delete('/:id', authMiddleware, (req, res) => {
  const db = getDb()
  db.prepare('UPDATE posts SET category_id = NULL WHERE category_id = ?').run(req.params.id)
  db.prepare('DELETE FROM categories WHERE id = ?').run(req.params.id)
  res.json({ message: 'Deleted' })
})

export default router