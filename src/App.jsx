import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import FarmerLogin from './pages/Farmer/FarmerLogin'
import FarmerDashboard from './pages/Farmer/FarmerDashboard'
import ProcessorLogin from './pages/Processor/ProcessorLogin'
import ProcessorDashboard from './pages/Processor/ProcessorDashboard'
import ManufacturerLogin from './pages/Manufacturer/ManufacturerLogin'
import ManufacturerDashboard from './pages/Manufacturer/ManufacturerDashboard'
import LabLogin from './pages/Lab/LabLogin'
import LabDashboard from './pages/Lab/LabDashboard'
import DistributorLogin from './pages/Distributor/DistributorLogin'
import DistributorDashboard from './pages/Distributor/DistributorDashboard'
import QRScanner from './pages/QRScanner'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <Router basename="/ayutrace">
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/farmer/login" element={<FarmerLogin />} />
            <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
            <Route path="/processor/login" element={<ProcessorLogin />} />
            <Route path="/processor/dashboard" element={<ProcessorDashboard />} />
            <Route path="/manufacturer/login" element={<ManufacturerLogin />} />
            <Route path="/manufacturer/dashboard" element={<ManufacturerDashboard />} />
            <Route path="/lab/login" element={<LabLogin />} />
            <Route path="/lab/dashboard" element={<LabDashboard />} />
            <Route path="/distributor/login" element={<DistributorLogin />} />
            <Route path="/distributor/dashboard" element={<DistributorDashboard />} />
            <Route path="/scan" element={<QRScanner />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
