import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from './api'
import './PostPage.css'

export default function PostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    api.getPost(slug)
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setPost(data)
        }
      })
      .catch(() => setError('Post not found'))
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (loading) {
    return (
      <div className="post-page">
        <div className="post-loading">
          <div className="post-loading-spinner" />
          <p>Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="post-page">
        <div className="post-error">
          <h1>Post Not Found</h1>
          <p>The post you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="post-back-link">← Back to Home</Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="post-page">
      <nav className="post-navbar">
        <div className="post-navbar-inner">
          <Link to="/" className="post-navbar-logo">
            <img src="/taiwan-experience-logo.png" alt="Taiwan Experience" />
            <span>TAIWAN EXPERIENCE</span>
          </Link>
          <Link to="/" className="post-navbar-back">← Back to Home</Link>
        </div>
      </nav>

      <article className="post-article">
        {post.featured_image && (
          <div className="post-hero-image">
            <img src={post.featured_image} alt={post.title} />
          </div>
        )}

        <div className="post-container">
          <div className="post-header">
            <div className="post-meta-bar">
              {post.category_name && (
                <span className="post-category">{post.category_name}</span>
              )}
              <span className="post-date">{formatDate(post.published_at)}</span>
              <span className="post-reading-time">{post.reading_time} min read</span>
            </div>
            <h1 className="post-title">{post.title}</h1>
            {post.excerpt && (
              <p className="post-excerpt">{post.excerpt}</p>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map(tag => (
                <span key={tag} className="post-tag">{tag}</span>
              ))}
            </div>
          )}

          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      <footer className="post-footer">
        <div className="post-footer-inner">
          <Link to="/" className="post-back-cta">← Explore More Stories</Link>
          <p>© 2026 Taiwan Experience</p>
        </div>
      </footer>
    </div>
  )
}