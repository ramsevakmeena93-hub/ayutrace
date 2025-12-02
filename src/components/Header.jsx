import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Leaf, QrCode, Scan } from 'lucide-react'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header style={{
      ...styles.header,
      background: scrolled ? 'rgba(46, 125, 50, 0.98)' : 'linear-gradient(135deg, rgba(46, 125, 50, 0.95) 0%, rgba(102, 187, 106, 0.95) 100%)',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.1)',
    }}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo} onClick={() => setIsOpen(false)}>
          <img 
            src="/ayutrace-logo.png" 
            alt="AyuTrace Logo" 
            style={styles.logoImage}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div style={styles.logoFallback}>
            <Leaf size={28} style={{ marginRight: '0.5rem' }} />
            <span style={styles.logoText}>AyuTrace</span>
          </div>
        </Link>
        
        <button 
          style={{
            ...styles.menuButton,
            display: window.innerWidth <= 768 ? 'block' : 'none'
          }} 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div style={styles.rightSection}>
          <button 
            style={styles.scanButton}
            onClick={() => navigate('/scan')}
            title="Scan QR Code"
          >
            <QrCode size={20} />
            <span style={styles.scanText}>Scan</span>
          </button>

          <nav style={{
            ...styles.nav,
            ...(isOpen && window.innerWidth <= 768 ? styles.navOpen : {}),
            display: window.innerWidth <= 768 ? (isOpen ? 'flex' : 'none') : 'flex'
          }}>
            <Link to="/" style={styles.navLink} onClick={() => setIsOpen(false)}>
              <span style={styles.navLinkText}>Home</span>
            </Link>
            <Link to="/about" style={styles.navLink} onClick={() => setIsOpen(false)}>
              <span style={styles.navLinkText}>About</span>
            </Link>
            <Link to="/contact" style={styles.navLink} onClick={() => setIsOpen(false)}>
              <span style={styles.navLinkText}>Contact</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

const styles = {
  header: {
    color: 'white',
    padding: '1.2rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    textDecoration: 'none',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.3s ease',
  },
  logoImage: {
    height: '50px',
    width: 'auto',
    objectFit: 'contain',
  },
  logoFallback: {
    display: 'none',
    alignItems: 'center',
  },
  logoText: {
    fontSize: '1.8rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  menuButton: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    color: 'white',
    padding: '0.5rem',
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
  nav: {
    display: 'flex',
    gap: '2.5rem',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  navOpen: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'rgba(46, 125, 50, 0.98)',
    backdropFilter: 'blur(10px)',
    padding: '1rem',
    gap: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    position: 'relative',
    padding: '0.5rem 0',
  },
  navLinkText: {
    position: 'relative',
    zIndex: 1,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  scanButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: '0.6rem 1.2rem',
    borderRadius: '25px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  scanText: {
    '@media (max-width: 480px)': {
      display: 'none',
    },
  },
}

export default Header
