import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create WhatsApp message
    const whatsappMessage = `*New Query from AyuTrace*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Mobile:* ${formData.mobile}%0A*Message:* ${formData.message}`
    
    // WhatsApp API URL
    const whatsappURL = `https://wa.me/919303386187?text=${whatsappMessage}`
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank')
    
    // Reset form
    setFormData({ name: '', email: '', mobile: '', message: '' })
  }

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>Get in touch with the AyuTrace team</p>
      </div>

      <div style={styles.content}>
        <div style={styles.grid}>
          <div style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>Get In Touch</h2>
            <p style={styles.infoText}>
              Have questions about AyuTrace? We're here to help. Reach out to us through any of the channels below.
            </p>

            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <Phone size={24} color="#2e7d32" />
                <div>
                  <h4 style={styles.contactLabel}>Phone / WhatsApp</h4>
                  <a href="https://wa.me/919303386187" target="_blank" rel="noopener noreferrer" style={{...styles.contactValue, color: '#2e7d32', textDecoration: 'none', fontWeight: '600'}}>
                    +91-9303386187
                  </a>
                </div>
              </div>

              <div style={styles.contactItem}>
                <Mail size={24} color="#2e7d32" />
                <div>
                  <h4 style={styles.contactLabel}>Email</h4>
                  <p style={styles.contactValue}>support@ayutrace.com</p>
                </div>
              </div>

              <div style={styles.contactItem}>
                <MapPin size={24} color="#2e7d32" />
                <div>
                  <h4 style={styles.contactLabel}>Address</h4>
                  <p style={styles.contactValue}>
                    AyuTrace Technologies Pvt. Ltd.<br />
                    Jaipur, Rajasthan, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.formSection}>
            <h2 style={styles.sectionTitle}>Send Us a Message</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Mobile</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  style={{...styles.input, minHeight: '120px'}}
                  required
                ></textarea>
              </div>

              <button type="submit" style={styles.submitBtn}>
                <Send size={20} />
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '3rem',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#2e7d32',
  },
  infoText: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#555',
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  contactItem: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  contactLabel: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '0.3rem',
  },
  contactValue: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.6',
  },
  formSection: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginTop: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontWeight: '500',
    color: '#333',
    fontSize: '0.95rem',
  },
  input: {
    padding: '0.8rem',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '1rem',
    background: 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)',
    color: 'white',
    borderRadius: '6px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
}

export default Contact
