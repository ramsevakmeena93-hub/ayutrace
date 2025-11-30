import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Leaf } from 'lucide-react'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
          <Leaf size={28} style={{ marginRight: '0.5rem' }} />
          <span style={styles.logoText}>AyuTrace</span>
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

        <nav style={{
          ...styles.nav,
          ...(isOpen && window.innerWidth <= 768 ? styles.navOpen : {}),
          display: window.innerWidth <= 768 ? (isOpen ? 'flex' : 'none') : 'flex'
        }}>
          <Link to="/" style={styles.navLink} onClick={() => setIsOpen(false)}>
            <span style={styles.navLinkText}>Home</span>
          </Link>
          <a href="/#stakeholders" style={styles.navLink} onClick={() => setIsOpen(false)}>
            <span style={styles.navLinkText}>Stakeholders</span>
          </a>
          <Link to="/about" style={styles.navLink} onClick={() => setIsOpen(false)}>
            <span style={styles.navLinkText}>About</span>
          </Link>
          <Link to="/contact" style={styles.navLink} onClick={() => setIsOpen(false)}>
            <span style={styles.navLinkText}>Contact</span>
          </Link>
        </nav>
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
}

export default Header
