import React, { useState } from 'react'
import { Camera, QrCode, CheckCircle, MapPin, Calendar, Award, Leaf, Factory, FlaskConical, Truck, ArrowRight } from 'lucide-react'

const QRScanner = () => {
  const [scanned, setScanned] = useState(false)
  const [scanning, setScanning] = useState(false)

  const productData = {
    batchId: 'AYU-2025-001',
    herbName: 'Organic Ashwagandha',
    qualityScore: 98,
    authenticity: 'Verified',
    harvestDate: '2025-01-15',
    expiryDate: '2027-01-15',
    journey: [
      {
        stage: 'Farm',
        name: 'Green Valley Organic Farm',
        location: 'Rajasthan, India',
        date: '2025-01-15',
        icon: Leaf,
        color: '#8bc34a',
        status: 'Completed'
      },
      {
        stage: 'Manufacturing',
        name: 'AyurVeda Processing Unit',
        location: 'Gujarat, India', 
        date: '2025-01-20',
        icon: Factory,
        color: '#ff9800',
        status: 'Completed'
      },
      {
        stage: 'Testing',
        name: 'Quality Labs India',
        location: 'Mumbai, India',
        date: '2025-01-25',
        icon: FlaskConical,
        color: '#2196f3',
        status: 'Completed'
      },
      {
        stage: 'Distribution',
        name: 'AyuTrace Logistics',
        location: 'Delhi, India',
        date: '2025-01-30',
        icon: Truck,
        color: '#9c27b0',
        status: 'In Transit'
      }
    ]
  }

  const handleScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setScanned(true)
    }, 2000)
  }

  if (!scanned) {
    return (
      <div style={styles.scanContainer}>
        <div style={styles.scanCard}>
          <div style={styles.scanIcon}>
            <QrCode size={80} color="#2e7d32" />
          </div>
          <h2 style={styles.scanTitle}>Scan Product QR Code</h2>
          <p style={styles.scanSubtitle}>
            Point your camera at the QR code to verify product authenticity and trace its journey
          </p>
          
          {scanning ? (
            <div style={styles.scanningAnimation}>
              <div style={styles.scanner}></div>
              <p style={styles.scanningText}>Scanning...</p>
            </div>
          ) : (
            <button style={styles.scanButton} onClick={handleScan}>
              <Camera size={24} />
              Start Scanning
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.dashboard3D}>
        {/* Header Card */}
        <div style={styles.headerCard}>
          <div style={styles.productInfo}>
            <div style={styles.productIcon}>
              <Leaf size={32} color="white" />
            </div>
            <div>
              <h2 style={styles.productName}>{productData.herbName}</h2>
              <p style={styles.batchId}>Batch: {productData.batchId}</p>
            </div>
          </div>
          <div style={styles.scoreCard}>
            <Award size={28} color="#ffc107" />
            <div>
              <p style={styles.scoreLabel}>Quality Score</p>
              <p style={styles.scoreValue}>{productData.qualityScore}/100</p>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div style={styles.statusGrid}>
          <div style={styles.statusCard}>
            <CheckCircle size={24} color="#4caf50" />
            <div>
              <p style={styles.statusLabel}>Authenticity</p>
              <p style={styles.statusValue}>{productData.authenticity}</p>
            </div>
          </div>
          <div style={styles.statusCard}>
            <Calendar size={24} color="#2196f3" />
            <div>
              <p style={styles.statusLabel}>Harvest Date</p>
              <p style={styles.statusValue}>{productData.harvestDate}</p>
            </div>
          </div>
          <div style={styles.statusCard}>
            <Calendar size={24} color="#ff9800" />
            <div>
              <p style={styles.statusLabel}>Expiry Date</p>
              <p style={styles.statusValue}>{productData.expiryDate}</p>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div style={styles.journeyCard}>
          <h3 style={styles.journeyTitle}>Supply Chain Journey</h3>
          <div style={styles.timeline}>
            {productData.journey.map((step, index) => (
              <div key={index} style={styles.timelineItem}>
                <div style={{...styles.timelineIcon, background: step.color}}>
                  <step.icon size={20} color="white" />
                </div>
                <div style={styles.timelineContent}>
                  <div style={styles.timelineHeader}>
                    <h4 style={styles.stageName}>{step.stage}</h4>
                    <span style={{
                      ...styles.statusBadge,
                      background: step.status === 'Completed' ? '#4caf50' : '#ff9800'
                    }}>
                      {step.status}
                    </span>
                  </div>
                  <p style={styles.facilityName}>{step.name}</p>
                  <div style={styles.locationDate}>
                    <span><MapPin size={14} /> {step.location}</span>
                    <span><Calendar size={14} /> {step.date}</span>
                  </div>
                </div>
                {index < productData.journey.length - 1 && (
                  <ArrowRight size={20} color="#ccc" style={styles.arrow} />
                )}
              </div>
            ))}
          </div>
        </div>

        <button style={styles.scanAgainBtn} onClick={() => setScanned(false)}>
          Scan Another Product
        </button>
      </div>
    </div>
  )
}

const styles = {
  scanContainer: {
    minHeight: 'calc(100vh - 200px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
  },
  scanCard: {
    background: 'white',
    padding: '3rem 2rem',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  scanIcon: {
    marginBottom: '2rem',
  },
  scanTitle: {
    fontSize: '2rem',
    color: '#2e7d32',
    marginBottom: '1rem',
    fontWeight: '700',
  },
  scanSubtitle: {
    color: '#666',
    marginBottom: '2rem',
    fontSize: '1.1rem',
    lineHeight: '1.6',
  },
  scanButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '1.2rem 2.5rem',
    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
    color: 'white',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    margin: '0 auto',
    boxShadow: '0 8px 20px rgba(46, 125, 50, 0.3)',
  },
  scanningAnimation: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  scanner: {
    width: '200px',
    height: '200px',
    border: '3px solid #2e7d32',
    borderRadius: '12px',
    position: 'relative',
    overflow: 'hidden',
  },
  scanningText: {
    color: '#2e7d32',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  dashboardContainer: {
    minHeight: 'calc(100vh - 200px)',
    padding: '2rem',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  dashboard3D: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    perspective: '1000px',
  },
  headerCard: {
    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
    color: 'white',
    padding: '2rem',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 20px 40px rgba(46, 125, 50, 0.3)',
    transform: 'rotateX(5deg)',
    animation: 'float 3s ease-in-out infinite',
  },
  productInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  productIcon: {
    width: '60px',
    height: '60px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productName: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  batchId: {
    opacity: 0.9,
    fontSize: '1rem',
  },
  scoreCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    background: 'rgba(255,255,255,0.2)',
    padding: '1rem 1.5rem',
    borderRadius: '15px',
  },
  scoreLabel: {
    fontSize: '0.9rem',
    opacity: 0.9,
  },
  scoreValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
  },
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  statusCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    transform: 'translateZ(20px)',
    transition: 'transform 0.3s ease',
  },
  statusLabel: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '0.3rem',
  },
  statusValue: {
    color: '#333',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  journeyCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    transform: 'rotateX(-2deg)',
  },
  journeyTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '2rem',
    fontWeight: '700',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '12px',
    position: 'relative',
  },
  timelineIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  timelineContent: {
    flex: 1,
  },
  timelineHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },
  stageName: {
    fontSize: '1.2rem',
    color: '#333',
    fontWeight: '600',
  },
  statusBadge: {
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  facilityName: {
    color: '#666',
    marginBottom: '0.5rem',
  },
  locationDate: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.9rem',
    color: '#888',
  },
  arrow: {
    position: 'absolute',
    right: '1rem',
  },
  scanAgainBtn: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
    color: 'white',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    alignSelf: 'center',
    boxShadow: '0 8px 20px rgba(46, 125, 50, 0.3)',
  },
}

export default QRScanner