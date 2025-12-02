import React, { useState, useRef, useEffect } from 'react'
import { Camera, QrCode, CheckCircle, MapPin, Calendar, Award, Leaf, Factory, FlaskConical, Truck, ArrowRight, X } from 'lucide-react'

const QRScanner = () => {
  const [scanned, setScanned] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [showManualInput, setShowManualInput] = useState(false)
  const [qrInput, setQrInput] = useState('')
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

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
        stage: 'Processing',
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
        stage: 'Manufacturing',
        name: 'AyurVeda Products Ltd',
        location: 'Maharashtra, India', 
        date: '2025-01-25',
        icon: Factory,
        color: '#ff9800',
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

  const startCamera = async () => {
    try {
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported on this device')
      }

      setScanning(true)
      
      // Try with back camera first
      let constraints = {
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      }

      let stream
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints)
      } catch (backCameraError) {
        console.log('Back camera failed, trying front camera:', backCameraError)
        // Fallback to front camera
        constraints = {
          video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        }
        stream = await navigator.mediaDevices.getUserMedia(constraints)
      }
      
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setCameraActive(true)
        
        // Wait for video to load
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
        }
        
        // Simulate QR detection after 4 seconds
        setTimeout(() => {
          stopCamera()
          setScanning(false)
          setScanned(true)
        }, 4000)
      }
    } catch (error) {
      console.error('Camera error:', error)
      setScanning(false)
      
      let errorMessage = 'Camera access failed. '
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please allow camera permission and try again.'
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera found on this device.'
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'Camera not supported on this browser.'
      } else {
        errorMessage += 'Please check camera permissions in browser settings.'
      }
      
      alert(errorMessage)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setCameraActive(false)
    setScanning(false)
  }

  const handleScan = () => {
    startCamera()
  }

  const handleManualInput = (e) => {
    e.preventDefault()
    if (qrInput.trim()) {
      setScanned(true)
      setShowManualInput(false)
    }
  }

  useEffect(() => {
    return () => {
      stopCamera() // Cleanup on component unmount
    }
  }, [])

  if (!scanned) {
    return (
      <div style={styles.scanContainer}>
        <div style={styles.scanCard}>
          {cameraActive ? (
            <div style={styles.cameraContainer}>
              <div style={styles.cameraHeader}>
                <h3 style={styles.cameraTitle}>Point camera at QR code</h3>
                <button style={styles.closeBtn} onClick={stopCamera}>
                  <X size={24} />
                </button>
              </div>
              <div style={styles.videoContainer}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={styles.video}
                />
                <div style={styles.scanOverlay}>
                  <div style={styles.scanFrame}></div>
                </div>
                {scanning && (
                  <div style={styles.scanningIndicator}>
                    <div style={styles.scanLine}></div>
                    <p style={styles.scanningText}>Scanning for QR code...</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div style={styles.scanIcon}>
                <QrCode size={80} color="#2e7d32" />
              </div>
              <h2 style={styles.scanTitle}>Scan Product QR Code</h2>
              <p style={styles.scanSubtitle}>
                Point your camera at the QR code to verify product authenticity and trace its journey
              </p>
              <div style={styles.buttonGroup}>
                <button style={styles.scanButton} onClick={handleScan}>
                  <Camera size={24} />
                  Start Camera
                </button>
                <button style={styles.manualButton} onClick={() => setShowManualInput(true)}>
                  <QrCode size={24} />
                  Enter QR Code
                </button>
                <button style={styles.demoButton} onClick={() => setScanned(true)}>
                  Try Demo
                </button>
              </div>
              
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
            </>
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
  cameraContainer: {
    width: '100%',
    maxWidth: '500px',
  },
  cameraHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    padding: '0 1rem',
  },
  cameraTitle: {
    color: '#2e7d32',
    fontSize: '1.2rem',
    fontWeight: '600',
  },
  closeBtn: {
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  videoContainer: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#000',
  },
  video: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
  },
  scanOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanFrame: {
    width: '200px',
    height: '200px',
    border: '3px solid #2e7d32',
    borderRadius: '12px',
    position: 'relative',
  },
  scanningIndicator: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
  },
  scanLine: {
    width: '200px',
    height: '3px',
    background: 'linear-gradient(90deg, transparent, #2e7d32, transparent)',
    marginBottom: '10px',
    animation: 'scanMove 2s linear infinite',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
  },
  manualButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '1rem 2rem',
    background: 'transparent',
    color: '#2e7d32',
    border: '2px solid #2e7d32',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  manualForm: {
    marginTop: '2rem',
    padding: '2rem',
    background: '#f8f9fa',
    borderRadius: '12px',
    width: '100%',
  },
  manualTitle: {
    color: '#2e7d32',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  manualInput: {
    width: '100%',
    padding: '1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  manualButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  submitButton: {
    padding: '0.8rem 1.5rem',
    background: '#2e7d32',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '0.8rem 1.5rem',
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  demoButton: {
    padding: '0.8rem 2rem',
    background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
}

export default QRScanner