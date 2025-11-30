import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div style={styles.section}>
            <h3 style={styles.heading}>Quick Links</h3>
            <div style={styles.links}>
              <Link to="/" style={styles.link}>Home</Link>
              <Link to="/about" style={styles.link}>About Us</Link>
              <a href="/#stakeholders" style={styles.link}>Stakeholders</a>
              <Link to="/privacy" style={styles.link}>Privacy Policy</Link>
              <Link to="/terms" style={styles.link}>Terms & Conditions</Link>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.heading}>Contact Information</h3>
            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <Phone size={18} />
                <a href="tel:+919303386187" style={{color: '#ccc', textDecoration: 'none'}}>+91-9303386187</a>
              </div>
              <div style={styles.contactItem}>
                <Mail size={18} />
                <span>support@ayutrace.com</span>
              </div>
              <div style={styles.contactItem}>
                <MapPin size={18} />
                <span>AyuTrace Technologies Pvt. Ltd.<br />Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.heading}>Send Us a Query</h3>
            <form style={styles.form} onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const name = formData.get('name')
              const email = formData.get('email')
              const mobile = formData.get('mobile')
              const message = formData.get('message')
              const whatsappMessage = `*New Query from AyuTrace*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Mobile:* ${mobile}%0A*Message:* ${message}`
              window.open(`https://wa.me/919303386187?text=${whatsappMessage}`, '_blank')
              e.target.reset()
            }}>
              <input type="text" name="name" placeholder="Name" style={styles.input} required />
              <input type="email" name="email" placeholder="Email" style={styles.input} required />
              <input type="tel" name="mobile" placeholder="Mobile" style={styles.input} required />
              <textarea name="message" placeholder="Message / Query" style={styles.textarea} rows="3" required></textarea>
              <button type="submit" style={styles.button}>Submit via WhatsApp</button>
            </form>
          </div>
        </div>

        <div style={styles.social}>
          <h3 style={styles.heading}>Follow Us</h3>
          <div style={styles.socialIcons}>
            <a href="#" style={styles.socialIcon}><Instagram size={24} /></a>
            <a href="#" style={styles.socialIcon}><Linkedin size={24} /></a>
            <a href="#" style={styles.socialIcon}><Twitter size={24} /></a>
            <a href="#" style={styles.socialIcon}><Youtube size={24} /></a>
          </div>
        </div>

        <div style={styles.copyright}>
          <p>Copyright © 2025 AyuTrace – All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: '#1a1a1a',
    color: 'white',
    padding: '3rem 0 1rem',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
    gap: 'clamp(1.5rem, 3vw, 2rem)',
    marginBottom: '2rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  heading: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#66bb6a',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  contactItem: {
    display: 'flex',
    gap: '0.8rem',
    alignItems: 'flex-start',
    color: '#ccc',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  input: {
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #444',
    background: '#2a2a2a',
    color: 'white',
  },
  textarea: {
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #444',
    background: '#2a2a2a',
    color: 'white',
    resize: 'vertical',
  },
  button: {
    padding: '0.7rem',
    background: '#66bb6a',
    color: 'white',
    borderRadius: '4px',
    fontWeight: '600',
    transition: 'background 0.3s',
  },
  social: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginTop: '1rem',
  },
  socialIcon: {
    color: 'white',
    transition: 'color 0.3s',
  },
  copyright: {
    textAlign: 'center',
    paddingTop: '2rem',
    borderTop: '1px solid #444',
    color: '#888',
  },
}

export default Footer
