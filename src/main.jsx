import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import PostPage from './PostPage.jsx'
import Essentials from './Essentials.jsx'
import EssentialGuide from './EssentialGuide.jsx'
import Admin from './admin/Admin.jsx'
import AdminLogin from './admin/AdminLogin.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/post/:slug" element={<PostPage />} />
        <Route path="/essentials" element={<Essentials />} />
        <Route path="/essentials/:slug" element={<EssentialGuide />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)