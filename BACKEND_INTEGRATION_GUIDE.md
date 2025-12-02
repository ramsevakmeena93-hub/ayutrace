# 🔗 Backend Integration Guide - AyuTrace

## Overview

This guide explains how to connect the BlockBuilder backend to your AyuTrace frontend.

## 📁 Files Created

### 1. API Service (`src/services/api.js`)
- Handles all HTTP requests to backend
- Authentication management
- CRUD operations for all stakeholders
- Product tracking and verification

### 2. Blockchain Service (`src/services/blockchain.js`)
- Smart contract interactions
- Blockchain block creation
- Supply chain recording
- QR code generation and verification

### 3. Environment Configuration
- `.env` - Your local configuration
- `.env.example` - Template for team members

## 🚀 Setup Instructions

### Step 1: Configure Environment Variables

1. Open `.env` file
2. Update the API URLs with your backend endpoints:

```env
# If backend is running locally
VITE_API_URL=http://localhost:3000/api
VITE_BLOCKCHAIN_API_URL=http://localhost:3001/api

# If backend is deployed
VITE_API_URL=https://your-backend.com/api
VITE_BLOCKCHAIN_API_URL=https://your-blockchain-api.com/api
```

3. Add your blockchain contract address:
```env
VITE_CONTRACT_ADDRESS=0xYourContractAddress
```

### Step 2: Install Dependencies

No additional dependencies needed! The services use native `fetch` API.

### Step 3: Update Dashboard Components

I'll show you how to integrate the API in each dashboard:

#### Farmer Dashboard Example:

```javascript
import api from '../services/api';
import blockchain from '../services/blockchain';

// In your component
const handleAddHarvest = async (harvestData) => {
  try {
    // 1. Save to database
    const dbResponse = await api.addHarvest(harvestData);
    
    // 2. Record on blockchain
    const blockchainResponse = await blockchain.recordHarvest({
      ...harvestData,
      farmerId: dbResponse.farmerId,
      batchId: dbResponse.batchId,
    });
    
    if (blockchainResponse.success) {
      alert('Harvest recorded successfully on blockchain!');
      // Update UI
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to record harvest');
  }
};
```

## 📊 API Methods Available

### Authentication
```javascript
// Login
await api.login('farmer', { email, password });

// Register
await api.register('farmer', { name, email, password, location });

// Logout
await api.logout();
```

### Farmer Operations
```javascript
// Add harvest
await api.addHarvest(harvestData);

// Get harvests
await api.getFarmerHarvests(farmerId);

// Update status
await api.updateHarvestStatus(harvestId, 'completed');
```

### Processor Operations
```javascript
// Add processing
await api.addProcessing(processingData);

// Get batches
await api.getProcessorBatches(processorId);

// Update status
await api.updateProcessingStatus(batchId, 'completed');
```

### Lab Operations
```javascript
// Add test result
await api.addTestResult(testData);

// Get tests
await api.getLabTests(labId);

// Update test status
await api.updateTestStatus(testId, 'completed', results);
```

### Manufacturer Operations
```javascript
// Add manufacturing
await api.addManufacturing(manufacturingData);

// Get products
await api.getManufacturerProducts(manufacturerId);

// Generate QR code
await api.generateQRCode(productId);
```

### Distributor Operations
```javascript
// Add distribution
await api.addDistribution(distributionData);

// Get shipments
await api.getDistributorShipments(distributorId);

// Update shipment status
await api.updateShipmentStatus(shipmentId, 'in-transit', location);
```

### Product Tracking
```javascript
// Get product journey
await api.getProductJourney(productId);

// Scan QR code
await api.scanQRCode(qrData);

// Verify product
await api.verifyProduct(productId);
```

## 🔐 Blockchain Methods

### Record Operations
```javascript
// Record harvest
await blockchain.recordHarvest(harvestData);

// Record processing
await blockchain.recordProcessing(processingData);

// Record testing
await blockchain.recordTesting(testData);

// Record manufacturing
await blockchain.recordManufacturing(manufacturingData);

// Record distribution
await blockchain.recordDistribution(distributionData);
```

### Verification
```javascript
// Get product journey
await blockchain.getProductJourney(productId);

// Verify chain integrity
await blockchain.verifyChainIntegrity();

// Scan and verify QR
await blockchain.scanAndVerify(qrData);
```

## 🔄 Integration Flow

### Complete Supply Chain Flow:

```
1. Farmer → Harvest
   ├─ Save to DB (api.addHarvest)
   └─ Record on Blockchain (blockchain.recordHarvest)

2. Processor → Processing
   ├─ Save to DB (api.addProcessing)
   └─ Record on Blockchain (blockchain.recordProcessing)

3. Lab → Testing
   ├─ Save to DB (api.addTestResult)
   └─ Record on Blockchain (blockchain.recordTesting)

4. Manufacturer → Manufacturing
   ├─ Save to DB (api.addManufacturing)
   ├─ Record on Blockchain (blockchain.recordManufacturing)
   └─ Generate QR Code (api.generateQRCode)

5. Distributor → Distribution
   ├─ Save to DB (api.addDistribution)
   └─ Record on Blockchain (blockchain.recordDistribution)

6. Consumer → Scan QR
   ├─ Scan QR Code (api.scanQRCode)
   ├─ Get Journey (blockchain.getProductJourney)
   └─ Display 3D Dashboard
```

## 🧪 Testing

### Test API Connection:

```javascript
// Test in browser console
import api from './src/services/api';

// Test connection
api.getSupplyChainMetrics()
  .then(data => console.log('API Connected:', data))
  .catch(err => console.error('API Error:', err));
```

### Test Blockchain Connection:

```javascript
import blockchain from './src/services/blockchain';

// Test blockchain
blockchain.verifyChainIntegrity()
  .then(result => console.log('Blockchain Status:', result))
  .catch(err => console.error('Blockchain Error:', err));
```

## 📝 Backend Requirements

Your backend should provide these endpoints:

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Farmer Endpoints
- `POST /api/farmer/harvest` - Add harvest
- `GET /api/farmer/harvests/:farmerId` - Get harvests
- `PUT /api/farmer/harvest/:harvestId/status` - Update status

### Processor Endpoints
- `POST /api/processor/process` - Add processing
- `GET /api/processor/batches/:processorId` - Get batches
- `PUT /api/processor/batch/:batchId/status` - Update status

### Lab Endpoints
- `POST /api/lab/test` - Add test
- `GET /api/lab/tests/:labId` - Get tests
- `PUT /api/lab/test/:testId/status` - Update status

### Manufacturer Endpoints
- `POST /api/manufacturer/manufacture` - Add manufacturing
- `GET /api/manufacturer/products/:manufacturerId` - Get products
- `GET /api/manufacturer/qr/:productId` - Generate QR code

### Distributor Endpoints
- `POST /api/distributor/distribute` - Add distribution
- `GET /api/distributor/shipments/:distributorId` - Get shipments
- `PUT /api/distributor/shipment/:shipmentId/status` - Update status

### Product Tracking Endpoints
- `GET /api/product/journey/:productId` - Get product journey
- `POST /api/product/scan` - Scan QR code
- `GET /api/product/verify/:productId` - Verify product

### Blockchain Endpoints
- `POST /api/blocks/create` - Create block
- `GET /api/blocks/chain` - Get blockchain
- `GET /api/blocks/:hash` - Get block by hash
- `GET /api/blocks/validate` - Validate chain

## 🔧 Troubleshooting

### CORS Issues
If you get CORS errors, your backend needs to allow requests from your frontend:

```javascript
// Backend CORS configuration
app.use(cors({
  origin: 'https://ramsevakmeena93-hub.github.io',
  credentials: true
}));
```

### Authentication Issues
Make sure your backend returns a JWT token on login:

```javascript
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "role": "farmer",
    "name": "John Doe"
  }
}
```

### Blockchain Connection Issues
Verify your blockchain API is running and accessible:

```bash
curl http://localhost:3001/api/blocks/chain
```

## 📦 Next Steps

1. ✅ Configure `.env` with your backend URLs
2. ✅ Update dashboard components to use API services
3. ✅ Test API connections
4. ✅ Test blockchain operations
5. ✅ Deploy backend if not already deployed
6. ✅ Update production environment variables

## 🚀 Deployment

### Frontend Environment Variables (GitHub Pages)

Add these secrets to your GitHub repository:
1. Go to Settings → Secrets and variables → Actions
2. Add:
   - `VITE_API_URL` - Your production API URL
   - `VITE_BLOCKCHAIN_API_URL` - Your blockchain API URL
   - `VITE_CONTRACT_ADDRESS` - Your contract address

### Update Deploy Workflow

The build process will automatically use environment variables from GitHub secrets.

## 📞 Support

If you need help:
1. Check backend logs for errors
2. Check browser console for frontend errors
3. Verify API endpoints are accessible
4. Test with Postman/curl first

---

**Your frontend is now ready to connect to the blockchain backend!** 🎉

Update the `.env` file with your backend URLs and start integrating!
