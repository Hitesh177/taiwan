import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, scheduled: 0 })
  const [recent, setRecent] = useState([])

  useEffect(() => {
    api.getAllPosts().then(posts => {
      const published = posts.filter(p => p.status === 'published').length
      const drafts = posts.filter(p => p.status === 'draft').length
      const scheduled = posts.filter(p => p.status === 'scheduled').length
      setStats({ total: posts.length, published, drafts, scheduled })
      setRecent(posts.slice(0, 5))
    })
  }, [])

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard</h1>
        <Link to="/admin/posts/new" className="admin-btn admin-btn-primary">
          + New Post
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Posts</h3>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-card">
          <h3>Published</h3>
          <div className="stat-value" style={{ color: '#065f46' }}>{stats.published}</div>
        </div>
        <div className="stat-card">
          <h3>Drafts</h3>
          <div className="stat-value" style={{ color: '#92400e' }}>{stats.drafts}</div>
        </div>
        <div className="stat-card">
          <h3>Scheduled</h3>
          <div className="stat-value" style={{ color: '#1e40af' }}>{stats.scheduled}</div>
        </div>
      </div>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Recent Posts</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recent.map(post => (
              <tr key={post.id}>
                <td>
                  <Link to={`/admin/posts/${post.id}`} style={{ fontWeight: 600, color: 'inherit' }}>
                    {post.title}
                  </Link>
                </td>
                <td><span className={`status-badge ${post.status}`}>{post.status}</span></td>
                <td style={{ color: 'var(--muted)' }}>
                  {new Date(post.updated_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {recent.length === 0 && (
              <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--muted)', padding: '2rem' }}>
                No posts yet. <Link to="/admin/posts/new">Create your first post</Link>
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}