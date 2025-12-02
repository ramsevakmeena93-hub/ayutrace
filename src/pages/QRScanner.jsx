import React, { useState, useRef } from 'react'
import { Camera, QrCode, CheckCircle, MapPin, Calendar, Award, Leaf, Factory, FlaskConical, Truck, ArrowRight } from 'lucide-react'

const QRScanner = () => {
  const [scanned, setScanned] = useState(false)
  const [showManualInput, setShowManualInput] = useState(false)
  const [qrInput, setQrInput] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  const fileInputRef = useRef(null)
  const productData = {
    batchId: 'AYU-2025-001',
    herbName: 'Organic Ashwagandha',
    qualityScore: 98,
    authenticity: 'Verified ✓',
    harvestDate: '2025-01-15',
    expiryDate: '2027-01-15',
    journey: [
      {
        stage: 'Farmer',
        name: 'Green Valley Organic Farm',
        location: 'Rajasthan, India',
        date: '2025-01-15',
        icon: Leaf,
        color: '#8bc34a',
        status: 'Completed'
      },
      {
        stage: 'Processor',
        name: 'Herb Processing Center',
        location: 'Gujarat, India', 
        date: '2025-01-18',
        icon: Factory,
        color: '#ff5722',
        status: 'Completed'
      },
      {
        stage: 'Testing',
        name: 'Quality Labs India',
        location: 'Mumbai, India',
        date: '2025-01-20',
        icon: FlaskConical,
        color: '#2196f3',
        status: 'Completed'
      },
      {
        stage: 'Manufacturer',
        name: 'AyurVeda Products Ltd',
        location: 'Maharashtra, India', 
        date: '2025-01-25',
        icon: Factory,
        color: '#ff9800',
        status: 'Completed'
      },
      {
        stage: 'Distributor',
        name: 'AyuTrace Logistics',
        location: 'Delhi, India',
        date: '2025-01-30',
        icon: Truck,
        color: '#9c27b0',
        status: 'In Transit'
      }
    ]
  }

  const handleManualInput = (e) => {
    e.preventDefault()
    if (qrInput.trim()) {
      setScanned(true)
      setShowManualInput(false)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target.result)
        setTimeout(() => {
          setScanned(true)
          setUploadedImage(null)
        }, 2000)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please select a valid image file (JPG, PNG, etc.)')
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
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
            Upload QR code image or enter code manually to verify product authenticity
          </p>
          
          {uploadedImage ? (
            <div style={styles.imagePreview}>
              <h3 style={styles.previewTitle}>Analyzing QR Code...</h3>
              <img src={uploadedImage} alt="Uploaded QR" style={styles.previewImage} />
              <div style={styles.analyzingIndicator}>
                <div style={styles.spinner}></div>
                <p>Scanning image for QR code...</p>
              </div>
            </div>
          ) : (
            <div style={styles.buttonGroup}>
              <button style={styles.scanButton} onClick={() => setScanned(true)}>
                <QrCode size={24} />
                📱 Scan Product
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={styles.hiddenInput}
                capture="environment"
              />
              
              <button style={styles.uploadButton} onClick={triggerFileUpload}>
                <Camera size={24} />
                📁 Upload QR Image
              </button>
              
              <button style={styles.manualButton} onClick={() => setShowManualInput(true)}>
                <QrCode size={24} />
                ⌨️ Enter QR Code
              </button>
            </div>
          )}
          
          {showManualInput && (
            <form onSubmit={handleManualInput} style={styles.manualForm}>
              <h3 style={styles.manualTitle}>Enter QR Code Manually</h3>
              <input
                type="text"
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value)}
                placeholder="Paste or type QR code data"
                style={styles.manualInput}
                required
              />
              <div style={styles.manualButtons}>
                <button type="submit" style={styles.submitButton}>
                  Verify Product
                </button>
                <button type="button" onClick={() => setShowManualInput(false)} style={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </form>
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
      </div>
    </div>
  )
}

const styles = {
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
  scanContainer: {
    minHeight: 'calc(100vh - 200px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  scanCard: {
    background: 'white',
    padding: '3rem',
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
    color: '#333',
    marginBottom: '1rem',
    fontWeight: '700',
  },
  scanSubtitle: {
    color: '#666',
    marginBottom: '3rem',
    fontSize: '1.1rem',
    lineHeight: '1.6',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  scanButton: {
    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
    color: 'white',
    border: 'none',
    padding: '1.5rem 3rem',
    borderRadius: '15px',
    fontSize: '1.3rem',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(46, 125, 50, 0.4)',
    transform: 'translateY(0)',
    marginBottom: '1rem',
  },
  uploadButton: {
    background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 15px rgba(25, 118, 210, 0.3)',
  },
  manualButton: {
    background: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 15px rgba(123, 31, 162, 0.3)',
  },
  hiddenInput: {
    display: 'none',
  },
  manualForm: {
    marginTop: '2rem',
    padding: '2rem',
    background: '#f8f9fa',
    borderRadius: '12px',
  },
  manualTitle: {
    fontSize: '1.3rem',
    color: '#333',
    marginBottom: '1rem',
  },
  manualInput: {
    width: '100%',
    padding: '1rem',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  manualButtons: {
    display: 'flex',
    gap: '1rem',
  },
  submitButton: {
    background: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  cancelButton: {
    background: '#f44336',
    color: 'white',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  imagePreview: {
    marginTop: '2rem',
  },
  previewTitle: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  previewImage: {
    maxWidth: '200px',
    maxHeight: '200px',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  analyzingIndicator: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  spinner: {
    width: '30px',
    height: '30px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #4caf50',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
}

export default QRScanner