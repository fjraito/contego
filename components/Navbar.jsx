'use client'

import { useTheme } from './ThemeProvider'

export function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="nav">
      <a href="#" className="nav-logo">
        <img src="/assets/contego-logo.png" alt="Contego" />
      </a>
      <div className="nav-links">
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#pricing">Pricing</a>
        <a href="#blog">Blog</a>
        <a href="#faq">FAQ</a>
      </div>
      <div className="nav-cta">
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
        <a href="#cta" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: 13.5 }}>
          Book a call <span className="arrow">→</span>
        </a>
      </div>
    </nav>
  )
}
