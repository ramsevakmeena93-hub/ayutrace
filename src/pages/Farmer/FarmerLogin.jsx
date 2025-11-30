import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sprout, Phone, CreditCard } from 'lucide-react'

const FarmerLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ mobile: '', aadhaar: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/farmer/dashboard')
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <Sprout size={48} color="#8bc34a" />
          <h2 style={styles.title}>Farmer Login</h2>
          <p style={styles.subtitle}>Enter your credentials to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Phone size={18} />
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={formData.mobile}
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <CreditCard size={18} />
              Aadhaar Number
            </label>
            <input
              type="text"
              placeholder="Enter 12-digit Aadhaar number"
              value={formData.aadhaar}
              onChange={(e) => setFormData({...formData, aadhaar: e.target.value})}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>Login</button>
          
          <p style={styles.signupText}>
            Don't have an account? <a href="#" style={styles.link}>Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 200px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    padding: '2.5rem',
    maxWidth: '450px',
    width: '100%',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.8rem',
    color: '#2e7d32',
    margin: '1rem 0 0.5rem',
  },
  subtitle: {
    color: '#666',
    fontSize: '0.95rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#333',
    fontWeight: '500',
    fontSize: '0.95rem',
  },
  input: {
    padding: '0.8rem',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '0.9rem',
    background: 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)',
    color: 'white',
    borderRadius: '6px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  signupText: {
    textAlign: 'center',
    color: '#666',
    fontSize: '0.9rem',
  },
  link: {
    color: '#2e7d32',
    textDecoration: 'none',
    fontWeight: '600',
  },
}

export default FarmerLogin
