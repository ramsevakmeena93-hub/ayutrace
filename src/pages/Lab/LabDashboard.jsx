import React, { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { FlaskConical, Clock, CheckCircle, FileText } from 'lucide-react'

const LabDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Samples', value: '89', icon: FlaskConical, color: '#2196f3' },
    { label: 'Pending Tests', value: '23', icon: Clock, color: '#ff9800' },
    { label: 'Completed', value: '66', icon: CheckCircle, color: '#4caf50' },
    { label: 'Reports Generated', value: '66', icon: FileText, color: '#9c27b0' },
  ]

  const pieData = [
    { name: 'Pending', value: 23, color: '#ff9800' },
    { name: 'Completed', value: 66, color: '#4caf50' },
  ]

  const testReports = [
    { id: 1, herb: 'Ashwagandha', purity: '98%', status: 'Passed', date: '2025-11-28' },
    { id: 2, herb: 'Tulsi', purity: '95%', status: 'Passed', date: '2025-11-27' },
  ]

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Laboratory Dashboard</h1>

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

      <div style={styles.chartCard}>
        <h3 style={styles.chartTitle}>Test Status Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.tabs}>
        <button
          style={{...styles.tab, ...(activeTab === 'overview' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('overview')}
        >
          Test Reports
        </button>
        <button
          style={{...styles.tab, ...(activeTab === 'form' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('form')}
        >
          New Test Entry
        </button>
      </div>

      {activeTab === 'overview' && (
        <div style={styles.content}>
          <div style={styles.table}>
            <div style={styles.tableHeader}>
              <div>Herb Name</div>
              <div>Purity Level</div>
              <div>Status</div>
              <div>Date</div>
            </div>
            {testReports.map((report) => (
              <div key={report.id} style={styles.tableRow}>
                <div>{report.herb}</div>
                <div>{report.purity}</div>
                <div>
                  <span style={{...styles.badge, background: '#4caf50'}}>
                    {report.status}
                  </span>
                </div>
                <div>{report.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'form' && (
        <div style={styles.content}>
          <form style={styles.form}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>DNA Match (%)</label>
                <input type="number" style={styles.input} placeholder="Enter percentage" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Moisture Content (%)</label>
                <input type="number" style={styles.input} placeholder="Enter percentage" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Purity Level (%)</label>
                <input type="number" style={styles.input} placeholder="Enter percentage" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Heavy Metals (ppm)</label>
                <input type="number" style={styles.input} placeholder="Enter value" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Microbial Load</label>
                <input type="text" style={styles.input} placeholder="Enter value" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>pH Value</label>
                <input type="number" step="0.1" style={styles.input} placeholder="Enter pH" />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Vitamin Profile</label>
              <textarea style={{...styles.input, minHeight: '60px'}} placeholder="Enter vitamin details"></textarea>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Additional Notes</label>
              <textarea style={{...styles.input, minHeight: '80px'}} placeholder="Additional observations"></textarea>
            </div>
            <button type="submit" style={styles.submitBtn}>Submit Report to Blockchain</button>
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
  title: {
    fontSize: '2rem',
    color: '#1565c0',
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
  chartCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    marginBottom: '2rem',
  },
  chartTitle: {
    fontSize: '1.3rem',
    color: '#333',
    marginBottom: '1.5rem',
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
  },
  activeTab: {
    color: '#1565c0',
    borderBottom: '3px solid #1565c0',
  },
  content: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
    padding: '1rem',
    background: '#f5f5f5',
    fontWeight: '600',
    borderRadius: '6px 6px 0 0',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
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
    padding: '1rem',
    background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
    color: 'white',
    borderRadius: '6px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
}

export default LabDashboard
