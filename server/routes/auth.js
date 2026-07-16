import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { getDb } from '../db.js'
import { generateToken, authMiddleware } from '../middleware/auth.js'

const router = Router()

router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

  const db = getDb()
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const token = generateToken(user)
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
})

router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user })
})

router.put('/password', authMiddleware, (req, res) => {
  const { currentPassword, newPassword } = req.body
  const db = getDb()
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)
  if (!bcrypt.compareSync(currentPassword, user.password)) {
    return res.status(401).json({ error: 'Current password is incorrect' })
  }
  const hash = bcrypt.hashSync(newPassword, 10)
  db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hash, req.user.id)
  res.json({ message: 'Password updated' })
})

export default router