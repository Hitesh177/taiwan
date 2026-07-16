import { useState, useEffect } from 'react'
import { api } from '../api'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [error, setError] = useState('')

  const load = () => {
    api.getCategories().then(setCategories)
  }

  useEffect(() => { load() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setError('')
    try {
      await api.createCategory({ name: name.trim(), slug: slug.trim() || undefined })
      setName('')
      setSlug('')
      load()
    } catch {
      setError('Category already exists')
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? Posts in this category will be uncategorized.`)) return
    await api.deleteCategory(id)
    load()
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Categories</h1>
      </div>

      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', alignItems: 'flex-end' }}>
        <div className="admin-form-group" style={{ margin: 0, minWidth: '200px' }}>
          <label>Name</label>
          <input value={name} onChange={e => { setName(e.target.value); setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')) }} placeholder="New category name" />
        </div>
        <div className="admin-form-group" style={{ margin: 0, minWidth: '150px' }}>
          <label>Slug</label>
          <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="slug" />
        </div>
        <button className="admin-btn admin-btn-primary">Add Category</button>
      </form>
      {error && <div className="admin-error">{error}</div>}

      <div className="categories-list">
        {categories.map(cat => (
          <div key={cat.id} className="category-card">
            <div>
              <h4>{cat.name}</h4>
              <div className="cat-slug">/{cat.slug}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="cat-count">{cat.post_count} posts</div>
              <button
                className="admin-btn admin-btn-danger admin-btn-sm"
                style={{ marginTop: '0.35rem' }}
                onClick={() => handleDelete(cat.id, cat.name)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}