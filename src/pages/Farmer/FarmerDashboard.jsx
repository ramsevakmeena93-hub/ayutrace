import React, { useState } from 'react'
import { Sprout, Package, Truck, CheckCircle, Plus, Search, Download } from 'lucide-react'

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  const stats = [
    { label: 'Total Herbs', value: '245', icon: Sprout, color: '#8bc34a' },
    { label: 'In Processing', value: '32', icon: Package, color: '#ff9800' },
    { label: 'Export Ready', value: '18', icon: Truck, color: '#2196f3' },
    { label: 'Blockchain Verified', value: '195', icon: CheckCircle, color: '#4caf50' },
  ]

  const myHerbs = [
    { id: 1, name: 'Ashwagandha', type: 'Root', weight: '50kg', status: 'Verified', date: '2025-11-25' },
    { id: 2, name: 'Tulsi', type: 'Leaf', weight: '30kg', status: 'Processing', date: '2025-11-28' },
    { id: 3, name: 'Turmeric', type: 'Rhizome', weight: '75kg', status: 'Verified', date: '2025-11-20' },
  ]

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome, Farmer!</h1>
        <p style={styles.subtitle}>Manage your herb inventory and track blockchain verification</p>
      </div>

      <div style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <div key={idx} style={styles.statCard}>
            <stat.icon size={32} color={stat.color} />
            <div>
              <p style={styles.statValue}>{stat.value}</p>
              <p style={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.tabs}>
        <button
          style={{...styles.tab, ...(activeTab === 'overview' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('overview')}
        >
          My Herbs
        </button>
        <button
          style={{...styles.tab, ...(activeTab === 'register' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('register')}
        >
          Register New Herb
        </button>
      </div>

      {activeTab === 'overview' && (
        <div style={styles.content}>
          <div style={styles.toolbar}>
            <div style={styles.searchBox}>
              <Search size={20} color="#666" />
              <input
                type="text"
                placeholder="Search by name or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <button style={styles.exportBtn}>
              <Download size={18} />
              Export CSV
            </button>
          </div>

          <div style={styles.table}>
            <div style={styles.tableHeader}>
              <div>Herb Name</div>
              <div>Type</div>
              <div>Weight</div>
              <div>Status</div>
              <div>Date</div>
            </div>
            {myHerbs.map((herb) => (
              <div key={herb.id} style={styles.tableRow}>
                <div>{herb.name}</div>
                <div>{herb.type}</div>
                <div>{herb.weight}</div>
                <div>
                  <span style={{...styles.badge, background: herb.status === 'Verified' ? '#4caf50' : '#ff9800'}}>
                    {herb.status}
                  </span>
                </div>
                <div>{herb.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'register' && (
        <div style={styles.content}>
          <form style={styles.form}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Herb Name</label>
                <input type="text" style={styles.input} placeholder="e.g., Ashwagandha" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Herb Type</label>
                <select style={styles.input}>
                  <option>Select type</option>
                  <option>Root</option>
                  <option>Leaf</option>
                  <option>Seed</option>
                  <option>Rhizome</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Weight (kg)</label>
                <input type="number" style={styles.input} placeholder="Enter weight" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Processing Center</label>
                <select style={styles.input}>
                  <option>Select center</option>
                  <option>Center A - Jaipur</option>
                  <option>Center B - Delhi</option>
                </select>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Description</label>
              <textarea style={{...styles.input, minHeight: '80px'}} placeholder="Enter herb description"></textarea>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Upload Herb Image</label>
              <input type="file" style={styles.input} accept="image/*" />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Location</label>
              <input type="text" style={styles.input} placeholder="Click to select location on map" />
            </div>

            <button type="submit" style={styles.submitBtn}>
              <Plus size={20} />
              Register Herb on Blockchain
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    color: '#2e7d32',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#666',
    fontSize: '1rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
    gap: 'clamp(1rem, 2vw, 1.5rem)',
    marginBottom: '2rem',
  },
  statCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  statValue: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    color: '#666',
    fontSize: '0.9rem',
  },
  tabs: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    borderBottom: '2px solid #e0e0e0',
  },
  tab: {
    padding: '0.8rem 1.5rem',
    background: 'transparent',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#666',
    cursor: 'pointer',
    borderBottom: '3px solid transparent',
    transition: 'all 0.3s',
  },
  activeTab: {
    color: '#2e7d32',
    borderBottom: '3px solid #2e7d32',
  },
  content: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    flex: 1,
    minWidth: '250px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    flex: 1,
    fontSize: '0.95rem',
  },
  exportBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.2rem',
    background: '#2e7d32',
    color: 'white',
    borderRadius: '6px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    padding: 'clamp(0.5rem, 2vw, 1rem)',
    background: '#f5f5f5',
    fontWeight: '600',
    color: '#333',
    borderRadius: '6px 6px 0 0',
    fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
    gap: '0.5rem',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    padding: 'clamp(0.5rem, 2vw, 1rem)',
    borderBottom: '1px solid #e0e0e0',
    alignItems: 'center',
    fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
    gap: '0.5rem',
  },
  badge: {
    display: 'inline-block',
    padding: '0.3rem 0.8rem',
    borderRadius: '12px',
    color: 'white',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
    gap: 'clamp(1rem, 2vw, 1.5rem)',
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
    padding: '0.7rem',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '0.95rem',
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

export default FarmerDashboard
