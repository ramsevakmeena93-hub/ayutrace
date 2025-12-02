import React, { useState, useRef, useEffect } from 'react'
import { Camera, QrCode, CheckCircle, MapPin, Calendar, Award, Leaf, Factory, FlaskConical, Truck, ArrowRight, X } from 'lucide-react'

const QRScanner = () => {
  const [scanned, setScanned] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [showManualInput, setShowManualInput] = useState(false)
  const [qrInput, setQrInput] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  const [permissionStatus, setPermissionStatus] = useState('unknown')
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const fileInputRef = useRef(null)

  const productData = {
    batchId: 'AYU-2025-001',
    herbName: 'Organic Ashwagandha',
    qualityScore: 98,
    authenticity: 'Verified',
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
        date: '2025-01-22',
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

  const requestCameraPermission = async () => {
    try {
      // First check if permissions API is available
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'camera' })
        if (permission.state === 'denied') {
          alert('Camera permission is denied. Please enable it in your browser settings.')
          return false
        }
      }
      return true
    } catch (error) {
      return true // Continue if permissions API not available
    }
  }

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported on this device')
      }

      // Check permissions first
      const hasPermission = await requestCameraPermission()
      if (!hasPermission) return

      setScanning(true)
      
      // Try different constraint combinations for better compatibility
      const constraintOptions = [
        {
          video: {
            width: { min: 320, ideal: 640, max: 1920 },
            height: { min: 240, ideal: 480, max: 1080 },
            facingMode: { exact: 'environment' }
          },
          audio: false
        },
        {
          video: {
            width: { min: 320, ideal: 640 },
            height: { min: 240, ideal: 480 },
            facingMode: 'environment'
          },
          audio: false
        },
        {
          video: {
            facingMode: 'user'
          },
          audio: false
        },
        {
          video: true,
          audio: false
        }
      ]

      let stream = null
      for (const constraints of constraintOptions) {
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints)
          break
        } catch (err) {
          continue
        }
      }

      if (!stream) {
        throw new Error('Unable to access camera with any configuration')
      }
      
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setCameraActive(true)
        
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(err => {
            console.error('Video play failed:', err)
          })
        }
        
        // Auto-scan after 5 seconds
        setTimeout(() => {
          stopCamera()
          setScanning(false)
          setScanned(true)
        }, 5000)
      }
    } catch (error) {
      setScanning(false)
      setCameraActive(false)
      
      let errorMessage = '📷 Camera Error: '
      
      switch (error.name) {
        case 'NotAllowedError':
          errorMessage += 'Permission denied. Please click "Allow" when prompted, or enable camera in browser settings.'
          break
        case 'NotFoundError':
          errorMessage += 'No camera found. Please check if your device has a camera.'
          break
        case 'NotSupportedError':
          errorMessage += 'Camera not supported in this browser. Try Chrome, Safari, or Edge.'
          break
        case 'NotReadableError':
          errorMessage += 'Camera is being used by another app. Please close other camera apps and try again.'
          break
        case 'OverconstrainedError':
          errorMessage += 'Camera constraints not supported. Trying with basic settings...'
          break
        default:
          errorMessage += `${error.message || 'Unknown error'}. Please try uploading an image instead.`
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target.result)
        // Simulate QR code detection from image
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

  useEffect(() => {
    // Check camera permission status on mount
    const checkPermissions = async () => {
      try {
        if ('permissions' in navigator) {
          const permission = await navigator.permissions.query({ name: 'camera' })
          setPermissionStatus(permission.state)
          
          permission.addEventListener('change', () => {
            setPermissionStatus(permission.state)
          })
        }
      } catch (error) {
        setPermissionStatus('unknown')
      }
    }
    
    checkPermissions()
    
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
              
              {permissionStatus !== 'unknown' && (
                <div style={{
                  ...styles.permissionStatus,
                  background: permissionStatus === 'granted' ? '#e8f5e9' : 
                             permissionStatus === 'denied' ? '#ffebee' : '#fff3e0',
                  color: permissionStatus === 'granted' ? '#2e7d32' : 
                         permissionStatus === 'denied' ? '#d32f2f' : '#f57c00'
                }}>
                  📷 Camera Permission: {
                    permissionStatus === 'granted' ? '✅ Granted' :
                    permissionStatus === 'denied' ? '❌ Denied' : '⏳ Prompt'
                  }
                </div>
              )}
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
                  <button style={styles.scanButton} onClick={handleScan}>
                    <Camera size={24} />
                    📷 Open Camera
                  </button>
                  
                  <button style={styles.uploadButton} onClick={triggerFileUpload}>
                    <QrCode size={24} />
                    📁 Upload QR Image
                  </button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={styles.hiddenInput}
                    capture="environment" // This enables camera capture on mobile
                  />
                  
                  <button style={styles.manualButton} onClick={() => setShowManualInput(true)}>
                    ⌨️ Enter QR Code
                  </button>
                  
                  <button style={styles.demoButton} onClick={() => setScanned(true)}>
                    🎮 Try Demo
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
    gap: '1.2rem',
    alignItems: 'center',
    width: '100%',
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
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '200px',
    justifyContent: 'center',
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
    minWidth: '200px',
  },

  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '1.2rem 2.5rem',
    background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
    color: 'white',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(255, 152, 0, 0.3)',
  },
  hiddenInput: {
    display: 'none',
  },
  imagePreview: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '2rem',
  },
  previewTitle: {
    color: '#2e7d32',
    fontSize: '1.3rem',
    fontWeight: '600',
  },
  previewImage: {
    maxWidth: '300px',
    maxHeight: '300px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  },
  analyzingIndicator: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e0e0e0',
    borderTop: '4px solid #2e7d32',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  permissionStatus: {
    padding: '0.8rem 1.2rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
}

export default QRScanner