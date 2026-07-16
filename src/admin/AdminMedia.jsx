import { useState, useEffect, useRef } from 'react'
import { api } from '../api'

export default function AdminMedia() {
  const [media, setMedia] = useState([])
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  const loadMedia = () => {
    api.getMedia().then(setMedia)
  }

  useEffect(() => { loadMedia() }, [])

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    await api.uploadMedia(file)
    setUploading(false)
    loadMedia()
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    setUploading(true)
    await api.uploadMedia(file)
    setUploading(false)
    loadMedia()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this file?')) return
    await api.deleteMedia(id)
    loadMedia()
  }

  const copyUrl = (filename) => {
    navigator.clipboard.writeText(`/uploads/${filename}`)
    alert('URL copied!')
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Media Library</h1>
      </div>

      <div
        className="upload-zone"
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          hidden
          accept="image/*,video/*"
          onChange={handleUpload}
        />
        <p>{uploading ? 'Uploading...' : 'Drop images here or click to upload'}</p>
        <p style={{ fontSize: '0.78rem', marginTop: '0.25rem' }}>JPG, PNG, GIF, WebP, SVG, MP4 — up to 10MB</p>
      </div>

      <div className="media-grid">
        {media.map(item => (
          <div key={item.id} className="media-item" onClick={() => copyUrl(item.filename)}>
            {item.mime_type?.startsWith('video') ? (
              <div style={{ height: '160px', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                🎥 {item.original_name}
              </div>
            ) : (
              <img src={`/uploads/${item.filename}`} alt={item.original_name} />
            )}
            <div className="media-item-info">
              <span>{item.original_name}</span>
              <span style={{ fontSize: '0.7rem' }}>
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>
            <div style={{ padding: '0 0.75rem 0.6rem' }}>
              <button
                className="admin-btn admin-btn-danger admin-btn-sm"
                onClick={(e) => { e.stopPropagation(); handleDelete(item.id) }}
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