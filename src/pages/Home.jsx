import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sprout, Factory, FlaskConical, Truck, User } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()

  const stakeholders = [
    { title: 'Farmers', icon: Sprout, path: '/farmer/login', color: '#8bc34a' },
    { title: 'Processors', icon: Factory, path: '/processor/login', color: '#ff9800' },
    { title: 'Testing Labs', icon: FlaskConical, path: '/lab/login', color: '#2196f3' },
    { title: 'Distributors', icon: Truck, path: '/distributor/login', color: '#9c27b0' },
    { title: 'Consumers', icon: User, path: '/consumer/scan', color: '#f44336' },
  ]

  return (
    <div>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Blockchain Traceability for Ayurvedic Herbs</h1>
          <p style={styles.heroDescription}>
            AyuTrace ensures complete transparency in the Ayurvedic supply chain by recording 
            every step of an herb's journey on the blockchain. This empowers consumers, 
            enhances trust, and rewards ethical sourcing.
          </p>
        </div>
      </section>

      <section id="stakeholders" style={styles.stakeholders}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Select Your Role</h2>
          <div style={styles.cardGrid}>
            {stakeholders.map((stakeholder) => (
              <div
                key={stakeholder.title}
                style={{...styles.card, borderTop: `4px solid ${stakeholder.color}`}}
                onClick={() => navigate(stakeholder.path)}
              >
                <stakeholder.icon size={48} color={stakeholder.color} />
                <h3 style={styles.cardTitle}>{stakeholder.title}</h3>
                <p style={styles.cardDescription}>
                  Access your {stakeholder.title.toLowerCase()} dashboard
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #1b5e20 0%, #4caf50 100%)',
    color: 'white',
    padding: '5rem 1rem',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
  },
  heroDescription: {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    opacity: 0.95,
  },
  stakeholders: {
    padding: '4rem 1rem',
    background: 'white',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#2e7d32',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '2rem',
  },
  card: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  cardTitle: {
    fontSize: '1.5rem',
    margin: '1rem 0 0.5rem',
    color: '#333',
  },
  cardDescription: {
    color: '#666',
    fontSize: '0.95rem',
  },
}

export default Home
