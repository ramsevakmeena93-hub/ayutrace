import React from 'react'
import { Shield, Users, Globe, Award } from 'lucide-react'

const About = () => {
  const features = [
    { icon: Shield, title: 'Blockchain Security', description: 'Immutable records ensure complete transparency' },
    { icon: Users, title: 'Multi-Stakeholder', description: 'Connecting farmers, processors, labs, and distributors' },
    { icon: Globe, title: 'Global Standards', description: 'Compliant with international quality standards' },
    { icon: Award, title: 'Quality Assurance', description: 'AI-powered authenticity verification' },
  ]

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>About AyuTrace</h1>
        <p style={styles.subtitle}>
          Revolutionizing Ayurvedic herb traceability through blockchain technology
        </p>
      </div>

      <div style={styles.content}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.text}>
            AyuTrace is dedicated to bringing transparency and trust to the Ayurvedic supply chain. 
            By leveraging blockchain technology, we ensure that every herb's journey from farm to consumer 
            is recorded, verified, and accessible. Our platform empowers consumers to make informed decisions 
            while rewarding ethical sourcing practices.
          </p>
        </section>

        <section style={styles.featuresSection}>
          <h2 style={styles.sectionTitle}>Why Choose AyuTrace?</h2>
          <div style={styles.featuresGrid}>
            {features.map((feature, idx) => (
              <div key={idx} style={styles.featureCard}>
                <feature.icon size={40} color="#2e7d32" />
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureText}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 200px)',
  },
  hero: {
    background: 'linear-gradient(135deg, #1b5e20 0%, #4caf50 100%)',
    color: 'white',
    padding: '4rem 1rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: 0.95,
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 1rem',
  },
  section: {
    marginBottom: '3rem',
  },
  sectionTitle: {
    fontSize: '2rem',
    color: '#2e7d32',
    marginBottom: '1.5rem',
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#555',
  },
  featuresSection: {
    marginTop: '4rem',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  featureTitle: {
    fontSize: '1.3rem',
    color: '#333',
    margin: '1rem 0 0.5rem',
  },
  featureText: {
    color: '#666',
    lineHeight: '1.6',
  },
}

export default About
