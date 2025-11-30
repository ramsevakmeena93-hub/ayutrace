import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Truck, CreditCard, Lock } from 'lucide-react'

const DistributorLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ aadhaar: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/distributor/dashboard')
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <Truck size={48} color="#9c27b0" />
          <h2 style={styles.title}>Distributor Login</h2>
          <p style={styles.subtitle}>Manage distribution and generate QR codes</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <CreditCard size={18} />
              Aadhaar ID
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

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Lock size={18} />
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>Login</button>
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
    background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
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
    color: '#6a1b9a',
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
  },
  button: {
    padding: '0.9rem',
    background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
    color: 'white',
    borderRadius: '6px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
}

export default DistributorLogin
