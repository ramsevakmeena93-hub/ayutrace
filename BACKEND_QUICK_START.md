# 🚀 Backend Integration - Quick Start

## ⚡ 5-Minute Setup

### Step 1: Configure Backend URL (1 minute)

Open `.env` file and update:

```env
VITE_API_URL=http://your-backend-url.com/api
VITE_BLOCKCHAIN_API_URL=http://your-blockchain-api.com/api
```

### Step 2: Test Connection (2 minutes)

Open browser console and test:

```javascript
// Test API
fetch('http://your-backend-url.com/api/health')
  .then(r => r.json())
  .then(d => console.log('API Status:', d));

// Test Blockchain API
fetch('http://your-blockchain-api.com/api/blocks/chain')
  .then(r => r.json())
  .then(d => console.log('Blockchain Status:', d));
```

### Step 3: Use in Components (2 minutes)

```javascript
import api from './services/api';
import blockchain from './services/blockchain';

// In your component
const handleSubmit = async (data) => {
  // Save to database
  const result = await api.addHarvest(data);
  
  // Record on blockchain
  await blockchain.recordHarvest(result);
  
  alert('Success!');
};
```

## 📁 Files Created

✅ `src/services/api.js` - API service
✅ `src/services/blockchain.js` - Blockchain service
✅ `src/services/exampleIntegration.js` - Integration examples
✅ `.env` - Environment configuration
✅ `.env.example` - Environment template

## 🔗 Integration Points

### Farmer Dashboard
```javascript
import { FarmerIntegrationExample } from './services/exampleIntegration';

// Add harvest
const result = await FarmerIntegrationExample.addHarvest(formData);
```

### Processor Dashboard
```javascript
import { ProcessorIntegrationExample } from './services/exampleIntegration';

// Add processing
const result = await ProcessorIntegrationExample.addProcessing(formData, previousHash);
```

### Lab Dashboard
```javascript
import { LabIntegrationExample } from './services/exampleIntegration';

// Add test
const result = await LabIntegrationExample.addTestResult(formData, previousHash);
```

### Manufacturer Dashboard
```javascript
import { ManufacturerIntegrationExample } from './services/exampleIntegration';

// Add manufacturing + Generate QR
const result = await ManufacturerIntegrationExample.addManufacturing(formData, previousHash);
```

### Distributor Dashboard
```javascript
import { DistributorIntegrationExample } from './services/exampleIntegration';

// Add distribution
const result = await DistributorIntegrationExample.addDistribution(formData, previousHash);
```

### QR Scanner
```javascript
import { QRScannerIntegrationExample } from './services/exampleIntegration';

// Scan QR
const result = await QRScannerIntegrationExample.scanQRCode(qrData);
```

## 🧪 Quick Test

Run this in your browser console after starting the app:

```javascript
// Import services
import api from './src/services/api';

// Test API connection
api.getSupplyChainMetrics()
  .then(data => console.log('✅ API Connected:', data))
  .catch(err => console.error('❌ API Error:', err));
```

## 📊 Backend Endpoints Needed

Your backend should have these endpoints:

```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/farmer/harvest
GET    /api/farmer/harvests/:id
POST   /api/processor/process
GET    /api/processor/batches/:id
POST   /api/lab/test
GET    /api/lab/tests/:id
POST   /api/manufacturer/manufacture
GET    /api/manufacturer/products/:id
GET    /api/manufacturer/qr/:productId
POST   /api/distributor/distribute
GET    /api/distributor/shipments/:id
GET    /api/product/journey/:productId
POST   /api/product/scan
POST   /api/blocks/create
GET    /api/blocks/chain
GET    /api/blocks/validate
```

## 🔧 Troubleshooting

### CORS Error?
Add CORS headers to your backend:
```javascript
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
```

### 401 Unauthorized?
Check if token is being sent:
```javascript
console.log('Token:', localStorage.getItem('authToken'));
```

### Connection Refused?
Verify backend is running:
```bash
curl http://localhost:3000/api/health
```

## 📚 Full Documentation

See `BACKEND_INTEGRATION_GUIDE.md` for complete documentation.

## ✅ Checklist

- [ ] Updated `.env` with backend URLs
- [ ] Backend is running and accessible
- [ ] Tested API connection
- [ ] Tested blockchain connection
- [ ] Integrated into at least one dashboard
- [ ] Tested end-to-end flow

---

**Ready to integrate!** Update your `.env` file and start using the services in your components! 🎉
