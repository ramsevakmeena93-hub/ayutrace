import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Package, Zap, CheckCircle, TrendingUp, Plus, QrCode, Leaf, Factory } from 'lucide-react'

const ManufacturerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Raw Materials', value: '245', icon: Leaf, color: '#8bc34a' },
    { label: 'In Production', value: '42', icon: Zap, color: '#ff9800' },
    { label: 'Products Ready', value: '128', icon: Package, color: '#2196f3' },
    { label: 'Quality Approved', value: '98', icon: CheckCircle, color: '#4caf50' },
  ]

  const productionData = [
    { month: 'Jan', produced: 120, quality: 115 },
    { month: 'Feb', produced: 98, quality: 95 },
    { month: 'Mar', produced: 156, quality: 148 },
    { month: 'Apr', produced: 142, quality: 138 },
    { month: 'May', produced: 178, quality: 172 },
  ]

  const qualityData = [
    { name: 'Excellent', value: 65, color: '#4caf50' },
    { name: 'Good', value: 25, color: '#ff9800' },
    { name: 'Average', value: 8, color: '#f44336' },
    { name: 'Rejected', value: 2, color: '#9e9e9e' },
  ]

  const products = [
    { id: 'PRD001', name: 'Ashwagandha Capsules', batch: 'BATCH-2025-001', quantity: '5000 units', status: 'Ready' },
    { id: 'PRD002', name: 'Turmeric Powder', batch: 'BATCH-2025-002', quantity: '2000 kg', status: 'Production' },
    { id: 'PRD003', name: 'Brahmi Extract', batch: 'BATCH-2025-003', quantity: '1500 bottles', status: 'Testing' },
  ]

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manufacturing Dashboard</h1>
        <p style={styles.subtitle}>Monitor production, quality, and supply chain analytics</p>
      </div>

      <div style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <div key={idx} style={styles.statCard}>
            <div style={{...styles.statIcon, background: stat.color}}>
              <stat.icon size={24} color="white" />
            </div>
            <div>
              <p style={styles.statValue}>{stat.value}</p>
              <p style={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.chartsGrid}>
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Production Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="produced" fill="#ff9800" name="Produced" />
              <Bar dataKey="quality" fill="#4caf50" name="Quality Passed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Quality Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={qualityData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({name, value}) => `${name}: ${value}%`}
              >
                {qualityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={styles.tabs}>
        <button
          style={{...styles.tab, ...(activeTab === 'overview' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('overview')}
        >
          Products Overview
        </button>
        <button
          style={{...styles.tab, ...(activeTab === 'production' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('production')}
        >
          New Production
        </button>
        <button
          style={{...styles.tab, ...(activeTab === 'qr' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('qr')}
        >
          QR Generation
        </button>
      </div>

      {activeTab === 'overview' && (
        <div style={styles.content}>
          <div style={styles.table}>
            <div style={styles.tableHeader}>
              <div>Product ID</div>
              <div>Product Name</div>
              <div>Batch</div>
              <div>Quantity</div>
              <div>Status</div>
            </div>
            {products.map((product) => (
              <div key={product.id} style={styles.tableRow}>
                <div>{product.id}</div>
                <div>{product.name}</div>
                <div>{product.batch}</div>
                <div>{product.quantity}</div>
                <div>
                  <span style={{
                    ...styles.badge,
                    background: product.status === 'Ready' ? '#4caf50' : 
                               product.status === 'Production' ? '#ff9800' : '#2196f3'
                  }}>
                    {product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'production' && (
        <div style={styles.content}>
          <form style={styles.form}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Product Name</label>
                <input type="text" style={styles.input} placeholder="Enter product name" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Raw Material Source</label>
                <select style={styles.input}>
                  <option>Select source</option>
                  <option>Green Valley Farm - Ashwagandha</option>
                  <option>Organic Herbs Ltd - Turmeric</option>
                  <option>Nature's Best - Brahmi</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Production Quantity</label>
                <input type="number" style={styles.input} placeholder="Enter quantity" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Expected Completion</label>
                <input type="date" style={styles.input} />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Production Notes</label>
              <textarea style={{...styles.input, minHeight: '80px'}} placeholder="Production specifications and notes"></textarea>
            </div>
            <button type="submit" style={styles.submitBtn}>
              <Plus size={20} />
              Start Production
            </button>
          </form>
        </div>
      )}

      {activeTab === 'qr' && (
        <div style={styles.content}>
          <div style={styles.qrSection}>
            <h3 style={styles.qrTitle}>Generate Product QR Codes</h3>
            <p style={styles.qrDescription}>Create blockchain-linked QR codes for finished products</p>
            
            <form style={styles.qrForm}>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Product Batch ID</label>
                  <input type="text" style={styles.input} placeholder="e.g., BATCH-2025-001" />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Product Name</label>
                  <input type="text" style={styles.input} placeholder="e.g., Ashwagandha Capsules" />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Manufacturing Date</label>
                  <input type="date" style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Expiry Date</label>
                  <input type="date" style={styles.input} />
                </div>
              </div>
              <button type="submit" style={styles.qrBtn}>
                <QrCode size={20} />
                Generate QR Code
              </button>
            </form>
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
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.2rem',
    color: '#e65100',
    marginBottom: '0.5rem',
    fontWeight: '700',
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1rem',
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
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  statIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  chartCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  chartTitle: {
    fontSize: '1.3rem',
    color: '#333',
    marginBottom: '1.5rem',
    fontWeight: '600',
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
    color: '#e65100',
    borderBottom: '3px solid #e65100',
  },
  content: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  table: {
    width: '100%',
    overflowX: 'auto',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    padding: '1rem',
    background: '#f5f5f5',
    fontWeight: '600',
    borderRadius: '6px 6px 0 0',
    gap: '0.5rem',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    padding: '1rem',
    borderBottom: '1px solid #e0e0e0',
    alignItems: 'center',
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
    background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
    color: 'white',
    borderRadius: '6px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  qrSection: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  qrTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '0.5rem',
    fontWeight: '600',
  },
  qrDescription: {
    color: '#666',
    marginBottom: '2rem',
  },
  qrForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  qrBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '1rem',
    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
    color: 'white',
    borderRadius: '6px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
}

export default ManufacturerDashboard