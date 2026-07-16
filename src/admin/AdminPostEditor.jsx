import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { api } from '../api'

export default function AdminPostEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState('draft')
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [showMeta, setShowMeta] = useState(false)
  const [postId, setPostId] = useState(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Start writing your story...' })
    ],
    editorProps: {
      attributes: { class: 'tiptap-content' }
    }
  })

  // Load categories
  useEffect(() => {
    api.getCategories().then(setCategories)
  }, [])

  // Load post if editing
  useEffect(() => {
    if (id && !isNew) {
      api.getAllPosts().then(posts => {
        const post = posts.find(p => p.id === parseInt(id))
        if (post) {
          setTitle(post.title)
          setExcerpt(post.excerpt || '')
          setCategoryId(post.category_id || '')
          setStatus(post.status)
          setTags(post.tags || [])
          setFeaturedImage(post.featured_image || '')
          setMetaTitle(post.meta_title || '')
          setMetaDescription(post.meta_description || '')
          setPostId(post.id)
          if (editor && post.content) {
            editor.commands.setContent(post.content)
          }
        }
      })
    }
  }, [id, isNew, editor])

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) {
      setTags([...tags, t])
      setTagInput('')
    }
  }

  const removeTag = (tag) => setTags(tags.filter(t => t !== tag))

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addTag() }
  }

  const save = useCallback(async (newStatus) => {
    if (!title.trim()) { alert('Title is required'); return }
    setSaving(true)
    setMessage('')

    const data = {
      title: title.trim(),
      content: editor?.getHTML() || '',
      excerpt: excerpt.trim(),
      category_id: categoryId ? parseInt(categoryId) : null,
      status: newStatus || status,
      tags,
      featured_image: featuredImage,
      meta_title: metaTitle || title.trim(),
      meta_description: metaDescription || excerpt.trim()
    }

    try {
      let result
      if (postId) {
        result = await api.updatePost(postId, data)
      } else {
        result = await api.createPost(data)
      }
      if (result.id) {
        setPostId(result.id)
        setMessage(newStatus === 'published' ? 'Published!' : 'Saved as draft')
        setTimeout(() => setMessage(''), 3000)
        if (newStatus === 'published') {
          navigate(`/admin/posts/${result.id}`)
        }
      }
    } catch (e) {
      setMessage('Error saving')
    }
    setSaving(false)
  }, [title, excerpt, categoryId, status, tags, featuredImage, metaTitle, metaDescription, editor, postId, navigate])

  // Auto-save every 60s
  useEffect(() => {
    if (!postId || !title.trim()) return
    const interval = setInterval(() => {
      save(status)
    }, 60000)
    return () => clearInterval(interval)
  }, [save, postId, title, status])

  // Insert image from media library
  const insertImage = (url) => {
    editor?.chain().focus().setImage({ src: url }).run()
  }

  return (
    <div className="admin-editor">
      <div className="admin-header">
        <h1>{isNew ? 'New Post' : 'Edit Post'}</h1>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {message && <span style={{ fontSize: '0.85rem', color: 'var(--red)' }}>{message}</span>}
          <button className="admin-btn admin-btn-secondary" onClick={() => save('draft')} disabled={saving}>
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button className="admin-btn admin-btn-primary" onClick={() => save('published')} disabled={saving}>
            {saving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      <input
        className="editor-title-input"
        placeholder="Post title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <div className="editor-meta-row">
        <div className="admin-form-group">
          <label>Category</label>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
            <option value="">— No category —</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="admin-form-group">
          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Tags */}
      <div className="admin-form-group">
        <label>Tags (press Enter to add)</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a tag..."
            style={{ flex: 1 }}
          />
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addTag}>Add</button>
        </div>
        {tags.length > 0 && (
          <div className="editor-tags" style={{ marginTop: '0.5rem' }}>
            {tags.map(tag => (
              <span key={tag} className="editor-tag">
                {tag} <button onClick={() => removeTag(tag)}>×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Excerpt */}
      <textarea
        className="editor-excerpt"
        placeholder="Short excerpt / summary for cards..."
        value={excerpt}
        onChange={e => setExcerpt(e.target.value)}
      />

      {/* TipTap Editor */}
      <div className="tiptap-editor">
        <div className="tiptap-toolbar">
          <button onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive('bold') ? 'is-active' : ''}><b>B</b></button>
          <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={editor?.isActive('italic') ? 'is-active' : ''}><i>I</i></button>
          <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className={editor?.isActive('underline') ? 'is-active' : ''}><u>U</u></button>
          <button onClick={() => editor?.chain().focus().toggleStrike().run()} className={editor?.isActive('strike') ? 'is-active' : ''}><s>S</s></button>
          <span style={{ color: 'var(--border)' }}>|</span>
          <button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className={editor?.isActive('heading', { level: 1 }) ? 'is-active' : ''}>H1</button>
          <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''}>H2</button>
          <button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={editor?.isActive('heading', { level: 3 }) ? 'is-active' : ''}>H3</button>
          <span style={{ color: 'var(--border)' }}>|</span>
          <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={editor?.isActive('bulletList') ? 'is-active' : ''}>• List</button>
          <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={editor?.isActive('orderedList') ? 'is-active' : ''}>1. List</button>
          <button onClick={() => editor?.chain().focus().toggleBlockquote().run()} className={editor?.isActive('blockquote') ? 'is-active' : ''}>" Quote</button>
          <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()} className={editor?.isActive('codeBlock') ? 'is-active' : ''}>{'<>'} Code</button>
          <span style={{ color: 'var(--border)' }}>|</span>
          <button onClick={() => editor?.chain().focus().setTextAlign('left').run()}>L</button>
          <button onClick={() => editor?.chain().focus().setTextAlign('center').run()}>C</button>
          <button onClick={() => editor?.chain().focus().setTextAlign('right').run()}>R</button>
          <span style={{ color: 'var(--border)' }}>|</span>
          <button onClick={() => {
            const url = prompt('Image URL:')
            if (url) insertImage(url)
          }}>🖼️</button>
          <button onClick={() => {
            const url = prompt('Link URL:')
            if (url) editor?.chain().focus().setLink({ href: url }).run()
          }}>🔗</button>
        </div>
        <EditorContent editor={editor} />
      </div>

      {/* Featured Image */}
      <div className="admin-form-group">
        <label>Featured Image URL</label>
        <input
          value={featuredImage}
          onChange={e => setFeaturedImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
        {featuredImage && (
          <img src={featuredImage} alt="Preview" style={{ maxWidth: '300px', marginTop: '0.5rem', borderRadius: '8px' }} />
        )}
      </div>

      {/* SEO Meta */}
      <div className="editor-footer">
        <div className="editor-footer-left">
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setShowMeta(!showMeta)}>
            {showMeta ? 'Hide' : 'Show'} SEO Settings
          </button>
        </div>
      </div>

      {showMeta && (
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="admin-form-group">
            <label>Meta Title</label>
            <input value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="SEO title..." />
          </div>
          <div className="admin-form-group">
            <label>Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={e => setMetaDescription(e.target.value)}
              placeholder="SEO description..."
              rows={3}
            />
          </div>
        </div>
      )}
    </div>
  )
}