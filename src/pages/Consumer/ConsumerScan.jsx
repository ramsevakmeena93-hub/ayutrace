import React, { useState } from 'react'
import { Camera, QrCode, CheckCircle, MapPin, Calendar, Award } from 'lucide-react'

const ConsumerScan = () => {
  const [scanned, setScanned] = useState(false)

  const productJourney = {
    batchId: 'BATCH001',
    herb: 'Ashwagandha',
    qualityScore: 98,
    farmer: {
      name: 'Rajesh Kumar',
      location: 'Jaipur, Rajasthan',
      date: '2025-11-15',
    },
    processor: {
      name: 'Green Processing Center',
      location: 'Delhi',
      date: '2025-11-18',
    },
    lab: {
      name: 'AyurLab Testing',
      purity: '98%',
      dnaMatch: '99.5%',
      date: '2025-11-22',
    },
    distributor: {
      name: 'AyuDistribute Pvt Ltd',
      location: 'Mumbai',
      date: '2025-11-25',
    },
  }

  const handleScan = () => {
    setScanned(true)
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Scan Product QR Code</h1>
        <p style={styles.subtitle}>Verify authenticity and trace your herb's journey</p>
      </div>

      {!scanned ? (
        <div style={styles.scanCard}>
          <div style={styles.scanIcon}>
            <QrCode size={80} color="#f44336" />
          </div>
          <h3 style={styles.scanTitle}>Scan QR Code</h3>
          <p style={styles.scanText}>
            Point your camera at the QR code on the product packaging
          </p>
          <button style={styles.scanBtn} onClick={handleScan}>
            <Camera size={20} />
            Open Camera
          </button>
        </div>
      ) : (
        <div style={styles.journeyContainer}>
          <div style={styles.verificationCard}>
            <CheckCircle size={48} color="#4caf50" />
            <h2 style={styles.verifiedTitle}>Verified Authentic</h2>
            <p style={styles.batchId}>Batch ID: {productJourney.batchId}</p>
            <div style={styles.scoreCard}>
              <Award size={32} color="#ffc107" />
              <div>
                <p style={styles.scoreLabel}>Quality Score</p>
                <p style={styles.scoreValue}>{productJourney.qualityScore}/100</p>
              </div>
            </div>
          </div>

          <div style={styles.journeyCard}>
            <h3 style={styles.journeyTitle}>Product Journey</h3>
            
            <div style={styles.timeline}>
              <div style={styles.timelineItem}>
                <div style={{...styles.timelineDot, background: '#8bc34a'}}></div>
                <div style={styles.timelineContent}>
                  <h4 style={styles.stageTitle}>Farmer</h4>
                  <p style={styles.stageName}>{productJourney.farmer.name}</p>
                  <div style={styles.stageInfo}>
                    <MapPin size={16} />
                    <span>{productJourney.farmer.location}</span>
                  </div>
                  <div style={styles.stageInfo}>
                    <Calendar size={16} />
                    <span>{productJourney.farmer.date}</span>
                  </div>
                </div>
              </div>

              <div style={styles.timelineItem}>
                <div style={{...styles.timelineDot, background: '#ff9800'}}></div>
                <div style={styles.timelineContent}>
                  <h4 style={styles.stageTitle}>Processing</h4>
                  <p style={styles.stageName}>{productJourney.processor.name}</p>
                  <div style={styles.stageInfo}>
                    <MapPin size={16} />
                    <span>{productJourney.processor.location}</span>
                  </div>
                  <div style={styles.stageInfo}>
                    <Calendar size={16} />
                    <span>{productJourney.processor.date}</span>
                  </div>
                </div>
              </div>

              <div style={styles.timelineItem}>
                <div style={{...styles.timelineDot, background: '#2196f3'}}></div>
                <div style={styles.timelineContent}>
                  <h4 style={styles.stageTitle}>Laboratory Testing</h4>
                  <p style={styles.stageName}>{productJourney.lab.name}</p>
                  <div style={styles.testResults}>
                    <span>Purity: {productJourney.lab.purity}</span>
                    <span>DNA Match: {productJourney.lab.dnaMatch}</span>
                  </div>
                  <div style={styles.stageInfo}>
                    <Calendar size={16} />
                    <span>{productJourney.lab.date}</span>
                  </div>
                </div>
              </div>

              <div style={styles.timelineItem}>
                <div style={{...styles.timelineDot, background: '#9c27b0'}}></div>
                <div style={styles.timelineContent}>
                  <h4 style={styles.stageTitle}>Distribution</h4>
                  <p style={styles.stageName}>{productJourney.distributor.name}</p>
                  <div style={styles.stageInfo}>
                    <MapPin size={16} />
                    <span>{productJourney.distributor.location}</span>
                  </div>
                  <div style={styles.stageInfo}>
                    <Calendar size={16} />
                    <span>{productJourney.distributor.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button style={styles.scanAgainBtn} onClick={() => setScanned(false)}>
            Scan Another Product
          </button>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 1rem',
    minHeight: 'calc(100vh - 200px)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2rem',
    color: '#d32f2f',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1rem',
  },
  scanCard: {
    background: 'white',
    padding: '3rem 2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  scanIcon: {
    marginBottom: '1.5rem',
  },
  scanTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '1rem',
  },
  scanText: {
    color: '#666',
    marginBottom: '2rem',
    fontSize: '1rem',
  },
  scanBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
    color: 'white',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  journeyContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  verificationCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  verifiedTitle: {
    fontSize: '1.8rem',
    color: '#4caf50',
    margin: '1rem 0 0.5rem',
  },
  batchId: {
    color: '#666',
    fontSize: '1rem',
    marginBottom: '1.5rem',
  },
  scoreCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#fff8e1',
    borderRadius: '8px',
  },
  scoreLabel: {
    color: '#666',
    fontSize: '0.9rem',
  },
  scoreValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#f57f17',
  },
  journeyCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  journeyTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '2rem',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  timelineItem: {
    display: 'flex',
    gap: '1.5rem',
    position: 'relative',
  },
  timelineDot: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    marginTop: '0.3rem',
    flexShrink: 0,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: '1rem',
    borderLeft: '2px solid #e0e0e0',
    paddingLeft: '1.5rem',
    marginLeft: '-1.5rem',
  },
  stageTitle: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  stageName: {
    color: '#666',
    marginBottom: '0.8rem',
  },
  stageInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#888',
    fontSize: '0.9rem',
    marginBottom: '0.3rem',
  },
  testResults: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '0.8rem',
    flexWrap: 'wrap',
  },
  scanAgainBtn: {
    padding: '1rem',
    background: '#f44336',
    color: 'white',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
}

export default ConsumerScan
