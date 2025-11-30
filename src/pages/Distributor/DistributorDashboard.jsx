import React, { useState } from 'react'
import { Package, CheckCircle, TrendingUp, QrCode, MapPin, DollarSign } from 'lucide-react'

const DistributorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [qrGenerated, setQrGenerated] = useState(false)

  const stats = [
    { label: 'Inventory', value: '342', icon: Package, color: '#9c27b0' },
    { label: 'Verified Batches', value: '128', icon: CheckCircle, color: '#4caf50' },
    { label: 'Orders', value: '89', icon: TrendingUp, color: '#2196f3' },
    { label: 'QR Generated', value: '128', icon: QrCode, color: '#ff9800' },
  ]

  const batches = [
    { id: 'BATCH001', herb: 'Ashwagandha', quantity: '500kg', status: 'Verified' },
    { id: 'BATCH002', herb: 'Tulsi', quantity: '300kg', status: 'Verified' },
  ]

  const handleGenerateQR = (e) => {
    e.preventDefault()
    setQrGenerated(true)
    setTimeout(() => setQrGenerated(false), 3000)
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Distributor Dashboard</h1>

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
          Inventory
        </button>
        <button
          style={{...styles.tab, ...(activeTab === 'qr' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('qr')}
        >
          QR Generator
        </button>
        <button
          style={{...styles.tab, ...(activeTab === 'map' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('map')}
        >
          Traceability Map
        </button>
      </div>

      {activeTab === 'overview' && (
        <div style={styles.content}>
          <h3 style={styles.contentTitle}>Verified Herb Batches</h3>
          <div style={styles.table}>
            <div style={styles.tableHeader}>
              <div>Batch ID</div>
              <div>Herb Name</div>
              <div>Quantity</div>
              <div>Status</div>
            </div>
            {batches.map((batch) => (
              <div key={batch.id} style={styles.tableRow}>
                <div>{batch.id}</div>
                <div>{batch.herb}</div>
                <div>{batch.quantity}</div>
                <div>
                  <span style={{...styles.badge, background: '#4caf50'}}>
                    {batch.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'qr' && (
        <div style={styles.content}>
          <h3 style={styles.contentTitle}>Blockchain QR Code Generator</h3>
          <form onSubmit={handleGenerateQR} style={styles.form}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Batch ID</label>
                <input type="text" style={styles.input} placeholder="Enter batch ID" required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Herb Name</label>
                <input type="text" style={styles.input} placeholder="Enter herb name" required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Quantity</label>
                <input type="text" style={styles.input} placeholder="Enter quantity" required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Destination</label>
                <input type="text" style={styles.input} placeholder="Enter destination" required />
              </div>
            </div>
            <button type="submit" style={styles.submitBtn}>
              <QrCode size={20} />
              Generate Blockchain QR Code
            </button>
          </form>
          {qrGenerated && (
            <div style={styles.qrSuccess}>
              <CheckCircle size={24} color="#4caf50" />
              <p>QR Code generated successfully and linked to blockchain!</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'map' && (
        <div style={styles.content}>
          <h3 style={styles.contentTitle}>Real-Time Supply Chain Heatmap</h3>
          <div style={styles.mapPlaceholder}>
            <MapPin size={48} color="#9c27b0" />
            <p>Interactive supply chain map showing production hotspots</p>
            <p style={{fontSize: '0.9rem', color: '#666'}}>
              Track herb movement from farm to distribution center
            </p>
          </div>
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
  title: {
    fontSize: '2rem',
    color: '#6a1b9a',
    marginBottom: '2rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
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
    flexWrap: 'wrap',
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
  },
  activeTab: {
    color: '#6a1b9a',
    borderBottom: '3px solid #6a1b9a',
  },
  content: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  contentTitle: {
    fontSize: '1.3rem',
    color: '#333',
    marginBottom: '1.5rem',
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 2fr 1.5fr 1fr',
    padding: '1rem',
    background: '#f5f5f5',
    fontWeight: '600',
    borderRadius: '6px 6px 0 0',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 2fr 1.5fr 1fr',
    padding: '1rem',
    borderBottom: '1px solid #e0e0e0',
    alignItems: 'center',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
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
    background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
    color: 'white',
    borderRadius: '6px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  qrSuccess: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#e8f5e9',
    borderRadius: '6px',
    marginTop: '1rem',
  },
  mapPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem',
    background: '#f5f5f5',
    borderRadius: '8px',
    textAlign: 'center',
    gap: '1rem',
  },
}

export default DistributorDashboard
