import { Router } from 'express'
import { getDb } from '../db.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function calcReadingTime(content) {
  const text = content.replace(/<[^>]*>/g, '')
  const words = text.split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

// GET /api/posts — public, only published
router.get('/', (req, res) => {
  const db = getDb()
  const { category, tag, status, limit } = req.query
  let sql = `SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM posts p LEFT JOIN categories c ON p.category_id = c.id`
  const conditions = []
  const params = []

  if (status) {
    conditions.push('p.status = ?')
    params.push(status)
  } else {
    conditions.push("p.status = 'published'")
  }
  if (category) {
    conditions.push('c.slug = ?')
    params.push(category)
  }
  if (tag) {
    conditions.push("p.id IN (SELECT post_id FROM post_tags WHERE tag = ?)")
    params.push(tag)
  }

  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ')
  sql += ' ORDER BY p.published_at DESC'

  if (limit) {
    sql += ' LIMIT ?'
    params.push(parseInt(limit))
  }

  const posts = db.prepare(sql).all(...params)
  const tagStmt = db.prepare('SELECT tag FROM post_tags WHERE post_id = ?')
  const result = posts.map(p => ({ ...p, tags: tagStmt.all(p.id).map(t => t.tag) }))
  res.json(result)
})

// GET /api/posts/all — admin, all statuses
router.get('/all', authMiddleware, (req, res) => {
  const db = getDb()
  const posts = db.prepare(`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM posts p LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.updated_at DESC
  `).all()
  const tagStmt = db.prepare('SELECT tag FROM post_tags WHERE post_id = ?')
  const result = posts.map(p => ({ ...p, tags: tagStmt.all(p.id).map(t => t.tag) }))
  res.json(result)
})

// GET /api/posts/:slug — public single post
router.get('/:slug', (req, res) => {
  const db = getDb()
  const post = db.prepare(`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM posts p LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ?
  `).get(req.params.slug)

  if (!post) return res.status(404).json({ error: 'Not found' })
  const tags = db.prepare('SELECT tag FROM post_tags WHERE post_id = ?').all(post.id).map(t => t.tag)
  post.tags = tags
  res.json(post)
})

// POST /api/posts — create
router.post('/', authMiddleware, (req, res) => {
  const db = getDb()
  const { title, content, excerpt, category_id, status, tags, featured_image, meta_title, meta_description, scheduled_at } = req.body
  if (!title) return res.status(400).json({ error: 'Title is required' })

  let slug = slugify(title)
  let counter = 1
  while (db.prepare('SELECT id FROM posts WHERE slug = ?').get(slug)) {
    slug = slugify(title) + '-' + counter++
  }

  const reading_time = calcReadingTime(content || '')
  const now = new Date().toISOString()
  const published_at = status === 'published' ? now : null

  const result = db.prepare(`
    INSERT INTO posts (title, slug, content, excerpt, category_id, status, featured_image, meta_title, meta_description, reading_time, published_at, scheduled_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, slug, content || '', excerpt || '', category_id || null, status || 'draft', featured_image || '', meta_title || '', meta_description || '', reading_time, published_at, scheduled_at || null, now, now)

  if (tags && tags.length) {
    const stmt = db.prepare('INSERT INTO post_tags (post_id, tag) VALUES (?, ?)')
    for (const tag of tags) stmt.run(result.lastInsertRowid, tag)
  }

  if (category_id) {
    const count = db.prepare('SELECT COUNT(*) as c FROM posts WHERE category_id = ? AND status = ?').get(category_id, 'published').c
    db.prepare('UPDATE categories SET post_count = ? WHERE id = ?').run(count, category_id)
  }

  db.prepare('INSERT INTO post_revisions (post_id, title, content, excerpt) VALUES (?, ?, ?, ?)').run(result.lastInsertRowid, title, content || '', excerpt || '')

  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid)
  res.json(post)
})

// PUT /api/posts/:id — update
router.put('/:id', authMiddleware, (req, res) => {
  const db = getDb()
  const { title, content, excerpt, category_id, status, tags, featured_image, meta_title, meta_description, scheduled_at } = req.body
  const id = req.params.id

  const existing = db.prepare('SELECT * FROM posts WHERE id = ?').get(id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  let slug = existing.slug
  if (title && title !== existing.title) {
    slug = slugify(title)
    let counter = 1
    while (db.prepare('SELECT id FROM posts WHERE slug = ? AND id != ?').get(slug, id)) {
      slug = slugify(title) + '-' + counter++
    }
  }

  const reading_time = calcReadingTime(content || existing.content)
  const now = new Date().toISOString()
  let published_at = existing.published_at
  if (status === 'published' && !published_at) published_at = now

  db.prepare(`UPDATE posts SET title=?, slug=?, content=?, excerpt=?, category_id=?, status=?, featured_image=?, meta_title=?, meta_description=?, reading_time=?, published_at=?, scheduled_at=?, updated_at=? WHERE id=?`).run(
    title || existing.title, slug, content !== undefined ? content : existing.content,
    excerpt !== undefined ? excerpt : existing.excerpt,
    category_id !== undefined ? category_id : existing.category_id,
    status || existing.status, featured_image !== undefined ? featured_image : existing.featured_image,
    meta_title !== undefined ? meta_title : existing.meta_title,
    meta_description !== undefined ? meta_description : existing.meta_description,
    reading_time, published_at, scheduled_at || null, now, id
  )

  db.prepare('DELETE FROM post_tags WHERE post_id = ?').run(id)
  if (tags && tags.length) {
    const stmt = db.prepare('INSERT INTO post_tags (post_id, tag) VALUES (?, ?)')
    for (const tag of tags) stmt.run(id, tag)
  }

  if (category_id) {
    const count = db.prepare('SELECT COUNT(*) as c FROM posts WHERE category_id = ? AND status = ?').get(category_id, 'published').c
    db.prepare('UPDATE categories SET post_count = ? WHERE id = ?').run(count, category_id)
  }

  db.prepare('INSERT INTO post_revisions (post_id, title, content, excerpt) VALUES (?, ?, ?, ?)').run(id, title || existing.title, content !== undefined ? content : existing.content, excerpt !== undefined ? excerpt : existing.excerpt)

  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(id)
  res.json(post)
})

// DELETE /api/posts/:id
router.delete('/:id', authMiddleware, (req, res) => {
  const db = getDb()
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id)
  if (!post) return res.status(404).json({ error: 'Not found' })
  db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id)
  if (post.category_id) {
    const count = db.prepare('SELECT COUNT(*) as c FROM posts WHERE category_id = ? AND status = ?').get(post.category_id, 'published').c
    db.prepare('UPDATE categories SET post_count = ? WHERE id = ?').run(count, post.category_id)
  }
  res.json({ message: 'Deleted' })
})

// GET /api/posts/:id/revisions
router.get('/:id/revisions', authMiddleware, (req, res) => {
  const db = getDb()
  const revisions = db.prepare('SELECT * FROM post_revisions WHERE post_id = ? ORDER BY saved_at DESC').all(req.params.id)
  res.json(revisions)
})

export default router