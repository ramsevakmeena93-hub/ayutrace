import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoText}>AyuTrace</span>
        </Link>
        
        <button style={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav style={{...styles.nav, ...(isOpen ? styles.navOpen : {})}}>
          <Link to="/" style={styles.navLink} onClick={() => setIsOpen(false)}>Home</Link>
          <a href="/#stakeholders" style={styles.navLink} onClick={() => setIsOpen(false)}>Stakeholders</a>
          <Link to="/about" style={styles.navLink} onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/contact" style={styles.navLink} onClick={() => setIsOpen(false)}>Contact</Link>
        </nav>
      </div>
    </header>
  )
}

const styles = {
  header: {
    background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
    color: 'white',
    padding: '1rem 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    textDecoration: 'none',
    color: 'white',
  },
  logoText: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  menuButton: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    color: 'white',
    padding: '0.5rem',
    cursor: 'pointer',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
  },
  navOpen: {
    display: 'flex',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'opacity 0.3s',
  },
}

export default Header
