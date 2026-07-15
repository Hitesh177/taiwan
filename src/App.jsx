import { useState, useEffect } from 'react'
import './App.css'
import { posts, destinations, photoGrid } from './data/posts'

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
          <span className="navbar-logo-flag">🇹🇼</span>
          <span>Taiwan Chronicles</span>
        </div>

        <ul className="navbar-links">
          <li><a href="#">Destinations</a></li>
          <li><a href="#">Experiences</a></li>
          <li><a href="#">Food</a></li>
          <li><a href="#">Cafés</a></li>
          <li><a href="#">Blog</a></li>
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
        <span className="hero-badge">Travel Journal 2026</span>
        <h1 className="hero-title">Experience Taiwan<br />Like Never Before</h1>
        <p className="hero-subtitle">
          Discover hidden cafés, breathtaking mountains, vibrant night markets, unforgettable road trips, local culture, and authentic experiences across Taiwan.
        </p>
        <button className="hero-cta">
          Explore Taiwan
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
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

function FeaturedPost() {
  const post = posts[0]
  return (
    <div className="featured-banner">
      <div className="featured-card">
        <div className="featured-image-placeholder" style={{ background: post.bg }}>
          <span>{post.emoji}</span>
          <p>Featured Post</p>
        </div>
        <div className="featured-content">
          <span className={`tag ${post.tagClass}`}>{post.tag}</span>
          <div className="post-meta">
            <span>{post.date}</span>
            <span className="post-meta-dot" />
            <span>{post.readTime}</span>
          </div>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <a href="#" className="read-more">Read the story →</a>
        </div>
      </div>
    </div>
  )
}

function BlogGrid() {
  const gridPosts = posts.slice(1)
  return (
    <div>
      <h2 className="section-title">🗺 Recent Dispatches</h2>
      <div className="blog-grid">
        {gridPosts.map(post => (
          <div key={post.id} className="blog-card">
            <div className="card-image-placeholder" style={{ background: post.bg }}>
              {post.emoji}
            </div>
            <div className="card-body">
              <span className={`tag ${post.tagClass}`}>{post.tag}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="post-meta">
                <span>{post.date}</span>
                <span className="post-meta-dot" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-widget">
        <h3 className="widget-title">Destinations</h3>
        <div className="destinations-list">
          {destinations.map(d => (
            <div key={d.name} className="destination-item">
              <span>{d.name}</span>
              <span className="count">{d.count}</span>
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
            <div className="footer-logo">🇹🇼 Taiwan Chronicles</div>
            <p>
              An independent travel blog documenting life, food, nature, and culture
              across the beautiful island of Taiwan. All stories are personal and honest.
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
          <span>© 2026 Taiwan Chronicles. Made with ❤️ in Taipei.</span>
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

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedPost />
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