# AyuTrace - Blockchain Traceability for Ayurvedic Herbs

A comprehensive React-based frontend application for tracking Ayurvedic herbs through the entire supply chain using blockchain technology.

## Features

### Multi-Stakeholder Platform
- **Farmers**: Register herbs, track processing status, blockchain verification
- **Processors**: Manage processing operations, update blockchain records
- **Testing Labs**: Conduct quality tests, generate reports, upload to blockchain
- **Distributors**: Manage inventory, generate QR codes, track distribution
- **Consumers**: Scan QR codes, view complete product journey, verify authenticity

### Key Capabilities
- Blockchain-powered traceability
- Real-time supply chain tracking
- AI-based herb authenticity scoring
- QR code generation and scanning
- Interactive dashboards with charts
- Complete product journey visualization
- Quality test reports and certifications

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack
- React 18
- React Router DOM
- Recharts (for data visualization)
- Lucide React (icons)
- Vite (build tool)

## Project Structure
```
src/
├── components/
│   ├── Header.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Farmer/
│   │   ├── FarmerLogin.jsx
│   │   └── FarmerDashboard.jsx
│   ├── Processor/
│   │   ├── ProcessorLogin.jsx
│   │   └── ProcessorDashboard.jsx
│   ├── Lab/
│   │   ├── LabLogin.jsx
│   │   └── LabDashboard.jsx
│   ├── Distributor/
│   │   ├── DistributorLogin.jsx
│   │   └── DistributorDashboard.jsx
│   └── Consumer/
│       └── ConsumerScan.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Usage

1. Navigate to the home page to select your stakeholder role
2. Login with credentials (demo mode - any credentials work)
3. Access role-specific dashboard with relevant features
4. Consumers can scan QR codes to view product journey

## License
Copyright © 2025 AyuTrace – All Rights Reserved.
