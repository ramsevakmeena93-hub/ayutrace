import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sprout, Factory, FlaskConical, Truck, User } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()

  const stakeholders = [
    { title: 'Farmers', icon: Sprout, path: '/farmer/login', color: '#8bc34a', gradient: 'linear-gradient(135deg, #8bc34a 0%, #689f38 100%)', desc: 'Grow and harvest herbs' },
    { title: 'Processors', icon: Factory, path: '/processor/login', color: '#ff5722', gradient: 'linear-gradient(135deg, #ff5722 0%, #d84315 100%)', desc: 'Initial herb processing' },
    { title: 'Manufacturers', icon: Factory, path: '/manufacturer/login', color: '#ff9800', gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)', desc: 'Create final products' },
    { title: 'Testing Labs', icon: FlaskConical, path: '/lab/login', color: '#2196f3', gradient: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)', desc: 'Quality testing and certification' },
    { title: 'Distributors', icon: Truck, path: '/distributor/login', color: '#9c27b0', gradient: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)', desc: 'Supply chain and logistics' },
  ]

  return (
    <div>
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <div style={styles.badge}>🌿 Blockchain Powered</div>
          <h1 style={styles.heroTitle}>
            Blockchain Traceability for <span style={styles.highlight}>Ayurvedic Herbs</span>
          </h1>
          <p style={styles.heroDescription}>
            AyuTrace ensures complete transparency in the Ayurvedic supply chain by recording 
            every step of an herb's journey on the blockchain. This empowers consumers, 
            enhances trust, and rewards ethical sourcing.
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.primaryBtn} onClick={() => navigate('/scan')}>
              Scan QR Code
            </button>
            <button style={styles.secondaryBtn} onClick={() => document.getElementById('stakeholders').scrollIntoView({ behavior: 'smooth' })}>
              Get Started
            </button>
          </div>
        </div>
        <div style={styles.heroPattern}></div>
      </section>

      <section id="stakeholders" style={styles.stakeholders}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Choose Your Role</h2>
            <p style={styles.sectionSubtitle}>Select your stakeholder type to access your personalized dashboard</p>
          </div>
          <div style={styles.cardGrid}>
            {stakeholders.map((stakeholder, index) => (
              <div
                key={stakeholder.title}
                style={{
                  ...styles.card,
                  animationDelay: `${index * 0.1}s`,
                }}
                onClick={() => navigate(stakeholder.path)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
                }}
              >
                <div style={{...styles.iconWrapper, background: stakeholder.gradient}}>
                  <stakeholder.icon size={32} color="white" />
                </div>
                <h3 style={styles.cardTitle}>{stakeholder.title}</h3>
                <p style={styles.cardDescription}>
                  {stakeholder.desc}
                </p>
                <div style={{...styles.cardArrow, color: stakeholder.color}}>→</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

const styles = {
  hero: {
    position: 'relative',
    background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #4caf50 100%)',
    color: 'white',
    padding: '8rem 2rem 6rem',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  heroContent: {
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
    animation: 'fadeIn 0.8s ease-out',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    padding: '0.6rem 1.5rem',
    borderRadius: '50px',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '2rem',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    marginBottom: '1.5rem',
    fontWeight: '800',
    lineHeight: '1.2',
    letterSpacing: '-0.5px',
  },
  highlight: {
    background: 'linear-gradient(120deg, #fff 0%, #a5d6a7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroDescription: {
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    lineHeight: '1.8',
    opacity: 0.95,
    marginBottom: '3rem',
    maxWidth: '700px',
    margin: '0 auto 3rem',
    padding: '0 1rem',
  },
  heroButtons: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    background: 'white',
    color: '#2e7d32',
    padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
    borderRadius: '50px',
    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
    fontWeight: '600',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    border: 'none',
    cursor: 'pointer',
  },
  secondaryBtn: {
    background: 'transparent',
    color: 'white',
    padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
    borderRadius: '50px',
    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
    fontWeight: '600',
    border: '2px solid white',
    cursor: 'pointer',
  },
  heroPattern: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100px',
    background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 50 Q 25 30, 50 50 T 100 50\' stroke=\'rgba(255,255,255,0.1)\' fill=\'none\' stroke-width=\'2\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'repeat-x',
    opacity: 0.3,
  },
  stakeholders: {
    padding: '6rem 2rem',
    background: 'transparent',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  sectionTitle: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: '700',
    color: '#1b5e20',
    marginBottom: '1rem',
  },
  sectionSubtitle: {
    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
    gap: 'clamp(1rem, 3vw, 2rem)',
    padding: '0 1rem',
  },
  card: {
    background: 'white',
    padding: '2.5rem 2rem',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'fadeIn 0.6s ease-out',
    border: '1px solid rgba(0,0,0,0.05)',
  },
  iconWrapper: {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: '0 0 0.8rem',
    color: '#1a1a1a',
  },
  cardDescription: {
    color: '#666',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  cardArrow: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    transition: 'transform 0.3s ease',
  },
}
