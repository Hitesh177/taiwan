import { useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { api } from '../api'
import AdminDashboard from './AdminDashboard'
import AdminPosts from './AdminPosts'
import AdminPostEditor from './AdminPostEditor'
import AdminMedia from './AdminMedia'
import AdminCategories from './AdminCategories'
import './AdminStyles.css'

function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    api.logout()
    navigate('/admin/login')
  }

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/') ? 'active' : ''

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <img src="/taiwan-experience-logo.png" alt="TW" />
          <span>Taiwan CMS</span>
        </div>

        <ul className="admin-sidebar-links">
          <li><Link to="/admin" className={isActive('/admin') && !location.pathname.includes('/posts') && !location.pathname.includes('/media') && !location.pathname.includes('/categories') ? 'active' : ''}>
            📊 <span>Dashboard</span>
          </Link></li>
          <li><Link to="/admin/posts" className={isActive('')}>
            📝 <span>Posts</span>
          </Link></li>
          <li><Link to="/admin/media" className={isActive('/admin/media') ? 'active' : ''}>
            🖼️ <span>Media</span>
          </Link></li>
          <li><Link to="/admin/categories" className={isActive('/admin/categories') ? 'active' : ''}>
            📂 <span>Categories</span>
          </Link></li>
        </ul>

        <div className="admin-sidebar-footer">
          <Link to="/" target="_blank">🌐 <span>View Site</span></Link>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLogout() }}>
            🚪 <span>Logout</span>
          </a>
        </div>
      </aside>

      <main className="admin-main">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="posts/new" element={<AdminPostEditor />} />
          <Route path="posts/:id" element={<AdminPostEditor />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="categories" element={<AdminCategories />} />
        </Routes>
      </main>
    </div>
  )
}

export default function Admin() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate('/admin/login')
    }
  }, [navigate])

  if (!api.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }

  return <AdminLayout />
}