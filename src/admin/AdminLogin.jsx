import { useState } from 'react'
import { api, setToken } from '../api'
import './AdminStyles.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@taiwanexperience.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.login(email, password)
      if (res.error) {
        setError(res.error)
      } else {
        window.location.href = '/admin'
      }
    } catch {
      setError('Login failed. Check your credentials.')
    }
    setLoading(false)
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <img src="/taiwan-experience-logo.png" alt="Taiwan Experience" className="logo-img" />
        <h1>CMS Login</h1>
        <p>Sign in to manage your content</p>
        {error && <div className="admin-error">{error}</div>}
        <div className="admin-form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="admin-form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className="admin-btn admin-btn-primary admin-btn-block" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}