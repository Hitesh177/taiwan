import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import { photoGrid } from './data/posts'
import { api } from './api'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-inner">
        <div className="navbar-logo">
          <img src="/taiwan-experience-logo.png" alt="Taiwan Experience" className="navbar-logo-img" />
          <span className="navbar-logo-text">TAIWAN EXPERIENCE</span>
        </div>

        <ul className="navbar-links">
          <li><a href="#">Destinations</a></li>
          <li><a href="#">Experiences</a></li>
          <li><a href="#">Food</a></li>
          <li><a href="#">Cafés</a></li>
          <li><a href="#">Blog</a></li>
          <li><Link to="/essentials">Essentials</Link></li>
          <li><a href="#">About</a></li>
        </ul>

        <div className="navbar-actions">
          <button className="navbar-search" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </button>
          <button className="navbar-cta">Plan Your Trip</button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-video-wrapper">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">Experience Taiwan<br />Like Never Before</h1>
        <p className="hero-subtitle">
          Discover hidden cafés, breathtaking mountains, vibrant night markets, unforgettable road trips, local culture, and authentic experiences across Taiwan.
        </p>
        <div className="hero-search">
          <svg className="hero-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input className="hero-search-input" type="text" placeholder="Where do you want to explore?" />
          <button className="hero-search-btn">Search</button>
        </div>
        <div className="hero-actions">
          <button className="hero-cta">
            Explore Taiwan
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
        <span className="scroll-text">Scroll to Explore</span>
      </div>
    </section>
  )
}

const destinationsList = [
  { name: 'Taipei', region: 'Northern Taiwan', emoji: '🏙️', color: '#1a5276', count: 24, image: '/taipei-card.jpg' },
  { name: 'New Taipei', region: 'Northern Taiwan', emoji: '🏞️', color: '#2e86c1', count: 18, image: '/new-taipei-card.jpg' },
  { name: 'Taichung', region: 'Central Taiwan', emoji: '🎨', color: '#d4a017', count: 20, image: '/taichung-card.jpg' },
  { name: 'Tainan', region: 'Southern Taiwan', emoji: '🏛️', color: '#c0392b', count: 22, image: '/tainan-card.jpg' },
  { name: 'Kaohsiung', region: 'Southern Taiwan', emoji: '🌊', color: '#1e8449', count: 19, image: '/kaohsiung-card.jpg' },
  { name: 'Hualien', region: 'Eastern Taiwan', emoji: '🏔️', color: '#6c3483', count: 15, image: '/hualien-card.jpg' },
  { name: 'Taitung', region: 'Eastern Taiwan', emoji: '🌅', color: '#e67e22', count: 12, image: '/taitung-card.jpg' },
  { name: 'Taoyuan', region: 'Northern Taiwan', emoji: '✈️', color: '#16a085', count: 10, image: '/taoyuan-card.jpg' },
  { name: 'Yilan', region: 'Eastern Taiwan', emoji: '♨️', color: '#27ae60', count: 11, image: '/yilan-card.jpg' },
  { name: 'Hsinchu', region: 'Northern Taiwan', emoji: '💻', color: '#2980b9', count: 8, image: '/hsinchu-card.jpg' },
  { name: 'Chiayi', region: 'Southern Taiwan', emoji: '🚂', color: '#8e44ad', count: 9, image: '/chiayi-card.jpg' },
  { name: 'Nantou', region: 'Central Taiwan', emoji: '🌲', color: '#2c3e50', count: 14, image: '/nantou-card.jpg' },
  { name: 'Pingtung', region: 'Southern Taiwan', emoji: '🏖️', color: '#f39c12', count: 10, image: '/pingtung-card.jpg' },
  { name: 'Miaoli', region: 'Central Taiwan', emoji: '🍓', color: '#e74c3c', count: 7 },
  { name: 'Changhua', region: 'Central Taiwan', emoji: '🛕', color: '#d35400', count: 6, image: '/changhua-card.jpg' },
  { name: 'Yunlin', region: 'Central Taiwan', emoji: '🌾', color: '#7d6608', count: 5, image: '/yunlin-card.jpg' },
  { name: 'Penghu', region: 'Outlying Islands', emoji: '🏝️', color: '#3498db', count: 8, image: '/penghu-card.jpg' },
  { name: 'Kinmen', region: 'Outlying Islands', emoji: '🏯', color: '#a04000', count: 6, image: '/kinmen-card.jpg' },
  { name: 'Matsu', region: 'Outlying Islands', emoji: '⛰️', color: '#5d6d7e', count: 4, image: '/matsu-card.jpg' },
  { name: 'Keelung', region: 'Northern Taiwan', emoji: '⛵', color: '#1a5276', count: 9, image: '/keelung-card.jpg' },
]

function DestinationCards() {
  return (
    <section className="destinations-section">
      <div className="destinations-inner">
        <h2 className="destinations-title">Where do you want to go?</h2>
        <p className="destinations-subtitle">Explore Taiwan by region — from bustling cities to serene coastlines</p>
        <div className="destinations-grid">
          {destinationsList.map((d, i) => (
            <div key={d.name} className="destination-card" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="dest-card-image" style={{
                background: d.image
                  ? `url(${d.image}) center/cover no-repeat`
                  : `linear-gradient(135deg, ${d.color}, ${d.color}dd)`
              }}>
                {!d.image && <span className="dest-card-emoji">{d.emoji}</span>}
                <div className="dest-card-image-overlay" />
              </div>
              <div className="dest-card-body">
                <h3 className="dest-card-name">{d.name}</h3>
                <p className="dest-card-desc">Discover {d.name.toLowerCase()}'s hidden gems, local flavors, and unforgettable experiences.</p>
                <span className="dest-card-explore">Explore <span className="dest-card-arrow">↗</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BlogGrid() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getPosts()
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  const getCardStyle = (post) => {
    const cat = (post.category_name || '').toLowerCase()
    const styles = {
      food: { emoji: '🍜', bg: 'linear-gradient(135deg, #7d6608, #d4ac0d)' },
      culture: { emoji: '🏮', bg: 'linear-gradient(135deg, #922b21, #d35400)' },
      adventure: { emoji: '🏔️', bg: 'linear-gradient(135deg, #1a5276, #117a65)' },
      hiking: { emoji: '🥾', bg: 'linear-gradient(135deg, #145a32, #1e8449)' },
      cafés: { emoji: '☕', bg: 'linear-gradient(135deg, #6e2f1a, #ca6f1e)' },
      cafes: { emoji: '☕', bg: 'linear-gradient(135deg, #6e2f1a, #ca6f1e)' },
      'night markets': { emoji: '🌙', bg: 'linear-gradient(135deg, #4a235a, #7d3c98)' },
      'travel tips': { emoji: '✈️', bg: 'linear-gradient(135deg, #1c2833, #2e4053)' },
      'road trips': { emoji: '🚗', bg: 'linear-gradient(135deg, #1e3a5f, #154360)' },
    }
    for (const [key, val] of Object.entries(styles)) {
      if (cat.includes(key)) return val
    }
    return { emoji: '📍', bg: 'linear-gradient(135deg, #2c3e50, #5d6d7e)' }
  }

  if (loading) {
    return (
      <div>
        <h2 className="section-title">Recent Dispatches</h2>
        <div className="blog-grid" style={{ opacity: 0.4 }}>
          {[1,2,3].map(i => (
            <div key={i} className="blog-card">
              <div className="card-image-placeholder" style={{ background: '#2c3e50', height: 180 }} />
              <div className="card-body">
                <div style={{ height: 20, background: '#34495e', borderRadius: 4, marginBottom: 8, width: '60%' }} />
                <div style={{ height: 14, background: '#34495e', borderRadius: 4, marginBottom: 4, width: '80%' }} />
                <div style={{ height: 14, background: '#34495e', borderRadius: 4, width: '40%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="section-title">Recent Dispatches</h2>
      {posts.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center', padding: '40px 0' }}>
          No posts yet. Check back soon for stories from Taiwan!
        </p>
      ) : (
        <div className="blog-grid">
          {posts.map(post => {
            const style = getCardStyle(post)
            return (
              <Link key={post.id} to={`/post/${post.slug}`} className="blog-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div
                  className="card-image-placeholder"
                  style={post.featured_image ? { background: `url(${post.featured_image}) center/cover no-repeat` } : { background: style.bg }}
                >
                  {!post.featured_image && style.emoji}
                </div>
                <div className="card-body">
                  {post.category_name && <span className="tag">{post.category_name}</span>}
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="post-meta">
                    <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</span>
                    <span className="post-meta-dot" />
                    <span>{post.reading_time} min read</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Sidebar() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api.getCategories()
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]))
  }, [])

  return (
    <aside className="sidebar">
      <div className="sidebar-widget">
        <h3 className="widget-title">Destinations</h3>
        <div className="destinations-list">
          {categories.map(c => (
            <div key={c.id} className="destination-item">
              <span>{c.name}</span>
              <span className="count">{c.post_count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-widget">
        <h3 className="widget-title">Quick Travel Tips</h3>
        <div className="tips-list">
          <div className="tip-item">
            <span className="tip-icon">🚇</span>
            <span>Get an EasyCard — it works on MRT, buses, and bikes across the island.</span>
          </div>
          <div className="tip-item">
            <span className="tip-icon">💰</span>
            <span>Taiwan is very affordable. Budget NT$1,000–1,500/day including meals and transport.</span>
          </div>
          <div className="tip-item">
            <span className="tip-icon">🌧️</span>
            <span>Always carry an umbrella — typhoon season runs May to October.</span>
          </div>
          <div className="tip-item">
            <span className="tip-icon">🍵</span>
            <span>Try the high-mountain oolong tea in Alishan. It's unlike anything you've had before.</span>
          </div>
        </div>
      </div>

      <div className="newsletter-widget">
        <h3 className="widget-title">Stay in the Loop</h3>
        <p>New posts on Fridays — stories, tips, and photo journals from the road.</p>
        <input className="newsletter-input" type="email" placeholder="your@email.com" />
        <button className="newsletter-btn">Subscribe</button>
      </div>
    </aside>
  )
}

function PhotoStrip() {
  return (
    <section className="photo-strip-section">
      <div className="photo-strip-inner">
        <h2 className="photo-strip-title">📸 Moments from Taiwan</h2>
        <div className="photo-grid">
          {photoGrid.map((photo, i) => (
            <div key={i} className="photo-thumb">
              <div
                className={`photo-thumb-inner ${i === 0 ? 'large' : ''}`}
                style={{ background: photo.bg }}
              >
                {photo.emoji}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuoteSection() {
  return (
    <div className="quote-section">
      <div className="quote-card">
        <blockquote>
          "Taiwan is the country that Asia forgot to tell the world about — and that's exactly what makes it perfect."
        </blockquote>
        <cite>— A traveler's notebook, Jiufen, 2025</cite>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/taiwan-experience-logo.png" alt="Taiwan Experience" className="footer-logo-img" />
              Taiwan Experience
            </div>
            <p>
              Your ultimate guide to discovering hidden cafés, breathtaking mountains, vibrant night markets, unforgettable road trips, local culture, and authentic experiences across Taiwan.
            </p>
          </div>
          <div>
            <h4 className="footer-col-title">Explore</h4>
            <ul className="footer-links">
              <li><a href="#">Taipei</a></li>
              <li><a href="#">East Coast</a></li>
              <li><a href="#">South Taiwan</a></li>
              <li><a href="#">Mountain Trails</a></li>
              <li><a href="#">Day Trips</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">More</h4>
            <ul className="footer-links">
              <li><a href="#">About</a></li>
              <li><a href="#">Travel Resources</a></li>
              <li><a href="#">Photo Gallery</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Taiwan Experience. Made with ❤️ in Taipei.</span>
          <div className="footer-social">
            <a href="#">📷</a>
            <a href="#">🐦</a>
            <a href="#">📘</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function CursorFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      className="cursor-follower"
      style={{ left: pos.x, top: pos.y }}
    >
      🧋
    </div>
  )
}

function ConstructionBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="construction-overlay" onClick={() => setDismissed(true)}>
      <div className="construction-modal" onClick={e => e.stopPropagation()}>
        <button className="construction-close" onClick={() => setDismissed(true)}>×</button>
        <div className="construction-icon">🚧</div>
        <h2 className="construction-title">Hey, this site's still cooking</h2>
        <p className="construction-text">
          Yep, it's a work in progress. I'm building this thing out as I go — adding guides,
          destination pages, and blog posts from my travels around Taiwan. Some stuff works,
          some stuff is still being written. Bear with me.
        </p>
        <div className="construction-details">
          <div className="construction-item">
            <span className="construction-check">✅</span>
            <span>Essentials guides — these are actually done</span>
          </div>
          <div className="construction-item">
            <span className="construction-check">🔄</span>
            <span>Destination pages — still building these out</span>
          </div>
          <div className="construction-item">
            <span className="construction-check">🔄</span>
            <span>Food & café reviews — slowly but surely</span>
          </div>
          <div className="construction-item">
            <span className="construction-check">🔄</span>
            <span>Blog posts — more coming every week</span>
          </div>
        </div>
        <button className="construction-btn" onClick={() => setDismissed(true)}>
          Okay, show me what's ready
        </button>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ConstructionBanner />
      <CursorFollower />
      <Navbar />
      <Hero />
      <DestinationCards />
      <div className="main-content">
        <BlogGrid />
        <Sidebar />
      </div>
      <PhotoStrip />
      <QuoteSection />
      <Footer />
    </>
  )
}