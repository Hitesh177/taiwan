import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const loadPosts = () => {
    setLoading(true)
    api.getAllPosts().then(data => {
      setPosts(data)
      setLoading(false)
    })
  }

  useEffect(() => { loadPosts() }, [])

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    await api.deletePost(id)
    loadPosts()
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <div className="admin-header">
        <h1>Posts</h1>
        <Link to="/admin/posts/new" className="admin-btn admin-btn-primary">
          + New Post
        </Link>
      </div>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Tags</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td style={{ fontWeight: 600 }}>{post.title}</td>
                <td style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{post.category_name || '—'}</td>
                <td><span className={`status-badge ${post.status}`}>{post.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                    {post.tags?.map(t => (
                      <span key={t} style={{ fontSize: '0.7rem', background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>{t}</span>
                    ))}
                  </div>
                </td>
                <td style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
                  {new Date(post.updated_at).toLocaleDateString()}
                </td>
                <td>
                  <div className="admin-table-actions">
                    <Link to={`/admin/posts/${post.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">
                      Edit
                    </Link>
                    <button
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      onClick={() => handleDelete(post.id, post.title)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}