const API_BASE = 'http://localhost:3001/api'

function getToken() {
  return localStorage.getItem('cms_token')
}

function setToken(token) {
  localStorage.setItem('cms_token', token)
}

function clearToken() {
  localStorage.removeItem('cms_token')
}

async function request(path, options = {}) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (res.status === 401) {
    clearToken()
    window.location.href = '/admin/login'
    throw new Error('Unauthorized')
  }
  return res.json()
}

export const api = {
  // Auth
  login: (email, password) =>
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(r => r.json()).then(data => {
      if (data.token) setToken(data.token)
      return data
    }),

  getMe: () => request('/auth/me'),
  logout: () => clearToken(),
  isAuthenticated: () => !!getToken(),

  // Posts
  getPosts: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return request(`/posts${q ? '?' + q : ''}`)
  },
  getAllPosts: () => request('/posts/all'),
  getPost: (slug) => request(`/posts/${slug}`),
  createPost: (data) => request('/posts', { method: 'POST', body: JSON.stringify(data) }),
  updatePost: (id, data) => request(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePost: (id) => request(`/posts/${id}`, { method: 'DELETE' }),
  getRevisions: (id) => request(`/posts/${id}/revisions`),

  // Categories
  getCategories: () => request('/categories'),
  createCategory: (data) => request('/categories', { method: 'POST', body: JSON.stringify(data) }),
  deleteCategory: (id) => request(`/categories/${id}`, { method: 'DELETE' }),

  // Media
  getMedia: () => request('/media'),
  uploadMedia: async (file) => {
    const token = getToken()
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch(`${API_BASE}/media/upload`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData
    })
    return res.json()
  },
  deleteMedia: (id) => request(`/media/${id}`, { method: 'DELETE' })
}

export { setToken, clearToken }