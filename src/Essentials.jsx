import { Link } from 'react-router-dom'
import './Essentials.css'

const guides = [
  {
    icon: '📱',
    title: 'SIM Cards & Internet',
    desc: 'How to get online in Taiwan without selling a kidney. eSIM, prepaid, or pocket WiFi — we break it down.',
    slug: 'sim-cards'
  },
  {
    icon: '✈️',
    title: 'Airport to City',
    desc: 'MRT, bus, taxi, or private car -- the right way to get from Taoyuan Airport to your hotel, whatever your budget.',
    slug: 'airport-to-city'
  },
  {
    icon: '🚄',
    title: 'Transportation',
    desc: 'HSR, TRA, MRT, buses, and the EasyCard that will become your soulmate. Yes, you will still get lost in Taichung.',
    slug: 'transport'
  },
  {
    icon: '💰',
    title: 'Money',
    desc: 'Taiwan is cheap, but not that cheap. How much cash to carry, why your card might get rejected, and the one trick that works.',
    slug: 'money'
  },
  {
    icon: '🌸',
    title: 'When to Visit',
    desc: 'Cherry blossoms in March, typhoons in August, and why October is the undisputed king of Taiwan months.',
    slug: 'when-to-visit'
  },
  {
    icon: '🍜',
    title: 'Night Market Survival',
    desc: 'How to eat your way through Taiwan without needing stomach surgery. Which queues are worth it and what to never order.',
    slug: 'night-market-survival'
  },
  {
    icon: '🎒',
    title: 'Packing',
    desc: 'What to bring (and what to leave at home for snack space). Umbrella: essential. Hiking boots: only if you actually plan to hike.',
    slug: 'packing'
  },
  {
    icon: '🗣️',
    title: 'Language',
    desc: 'You don\'t need to learn Chinese. But these 5 phrases will make everyone love you. Pointing at menus is also a valid strategy.',
    slug: 'language'
  },
  {
    icon: '🏨',
    title: 'Accommodation',
    desc: 'Where to sleep in every city, from hostels to that one night at a 7-Eleven. Booking.com is your best friend.',
    slug: 'accommodation'
  }
]

export default function Essentials() {
  return (
    <div className="essentials-page">
      <nav className="essentials-navbar">
        <div className="essentials-navbar-inner">
          <Link to="/" className="essentials-navbar-logo">
            <img src="/taiwan-experience-logo.png" alt="Taiwan Experience" />
            <span>TAIWAN EXPERIENCE</span>
          </Link>
          <Link to="/" className="essentials-navbar-back">← Back to Home</Link>
        </div>
      </nav>

      <section className="essentials-hero">
        <div className="essentials-hero-bg" />
        <div className="essentials-hero-content">
          <span className="essentials-hero-badge">KNOW BEFORE YOU GO</span>
          <h1 className="essentials-hero-title">Essentials</h1>
          <p className="essentials-hero-subtitle">
            The stuff nobody tells you before you book that flight to Taiwan.<br />
            SIM cards, trains, money, and other adulting — served with a side of sarcasm.
          </p>
        </div>
      </section>

      <div className="essentials-container">
        <div className="essentials-grid">
          {guides.map((guide, i) => (
            <Link
              key={guide.slug}
              to={`/essentials/${guide.slug}`}
              className="essentials-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="essentials-card-icon">{guide.icon}</span>
              <h2 className="essentials-card-title">{guide.title}</h2>
              <p className="essentials-card-desc">{guide.desc}</p>
              <span className="essentials-card-cta">
                Read the Guide <span className="essentials-card-arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <footer className="essentials-footer">
        <div className="essentials-footer-inner">
          <Link to="/" className="essentials-footer-link">← Explore Taiwan</Link>
          <p>© 2026 Taiwan Experience</p>
        </div>
      </footer>
    </div>
  )
}