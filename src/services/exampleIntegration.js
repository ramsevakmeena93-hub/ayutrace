// Example Integration - How to use API and Blockchain services in your components

import api from './api';
import blockchain from './blockchain';

// ============================================
// FARMER DASHBOARD INTEGRATION EXAMPLE
// ============================================

export const FarmerIntegrationExample = {
  // Add new harvest with blockchain recording
  async addHarvest(formData) {
    try {
      // Step 1: Save to database
      const dbResponse = await api.addHarvest({
        farmerId: localStorage.getItem('userId'),
        farmerName: localStorage.getItem('userName'),
        herbName: formData.herbName,
        quantity: formData.quantity,
        location: formData.location,
        harvestDate: formData.harvestDate,
        organicCertified: formData.organicCertified,
      });

      // Step 2: Record on blockchain
      const blockchainResponse = await blockchain.recordHarvest({
        farmerId: dbResponse.farmerId,
        farmerName: dbResponse.farmerName,
        herbName: formData.herbName,
        quantity: formData.quantity,
        location: formData.location,
        harvestDate: formData.harvestDate,
        organicCertified: formData.organicCertified,
        batchId: dbResponse.batchId,
      });

      return {
        success: true,
        message: 'Harvest recorded successfully!',
        batchId: dbResponse.batchId,
        blockHash: blockchainResponse.blockHash,
      };
    } catch (error) {
      console.error('Error adding harvest:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Get farmer's harvests
  async getHarvests() {
    try {
      const farmerId = localStorage.getItem('userId');
      const harvests = await api.getFarmerHarvests(farmerId);
      return harvests;
    } catch (error) {
      console.error('Error fetching harvests:', error);
      return [];
    }
  },
};

// ============================================
// PROCESSOR DASHBOARD INTEGRATION EXAMPLE
// ============================================

export const ProcessorIntegrationExample = {
  // Add processing with blockchain recording
  async addProcessing(formData, previousBlockHash) {
    try {
      // Step 1: Save to database
      const dbResponse = await api.addProcessing({
        processorId: localStorage.getItem('userId'),
        processorName: localStorage.getItem('userName'),
        batchId: formData.batchId,
        processType: formData.processType,
        processDate: formData.processDate,
        outputQuantity: formData.outputQuantity,
        qualityGrade: formData.qualityGrade,
        location: formData.location,
      });

      // Step 2: Record on blockchain
      const blockchainResponse = await blockchain.recordProcessing({
        processorId: dbResponse.processorId,
        processorName: dbResponse.processorName,
        batchId: formData.batchId,
        processType: formData.processType,
        processDate: formData.processDate,
        outputQuantity: formData.outputQuantity,
        qualityGrade: formData.qualityGrade,
        location: formData.location,
        previousBlockHash: previousBlockHash,
      });

      return {
        success: true,
        message: 'Processing recorded successfully!',
        blockHash: blockchainResponse.blockHash,
      };
    } catch (error) {
      console.error('Error adding processing:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  },
};

// ============================================
// LAB DASHBOARD INTEGRATION EXAMPLE
// ============================================

export const LabIntegrationExample = {
  // Add test result with blockchain recording
  async addTestResult(formData, previousBlockHash) {
    try {
      // Step 1: Save to database
      const dbResponse = await api.addTestResult({
        labId: localStorage.getItem('userId'),
        labName: localStorage.getItem('userName'),
        batchId: formData.batchId,
        testDate: formData.testDate,
        testType: formData.testType,
        results: formData.results,
        qualityScore: formData.qualityScore,
        certified: formData.certified,
        certificateNumber: formData.certificateNumber,
        location: formData.location,
      });

      // Step 2: Record on blockchain
      const blockchainResponse = await blockchain.recordTesting({
        labId: dbResponse.labId,
        labName: dbResponse.labName,
        batchId: formData.batchId,
        testDate: formData.testDate,
        testType: formData.testType,
        results: formData.results,
        qualityScore: formData.qualityScore,
        certified: formData.certified,
        certificateNumber: formData.certificateNumber,
        location: formData.location,
        previousBlockHash: previousBlockHash,
      });

      return {
        success: true,
        message: 'Test result recorded successfully!',
        blockHash: blockchainResponse.blockHash,
      };
    } catch (error) {
      console.error('Error adding test result:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  },
};

// ============================================
// MANUFACTURER DASHBOARD INTEGRATION EXAMPLE
// ============================================

export const ManufacturerIntegrationExample = {
  // Add manufacturing with blockchain recording and QR generation
  async addManufacturing(formData, previousBlockHash) {
    try {
      // Step 1: Save to database
      const dbResponse = await api.addManufacturing({
        manufacturerId: localStorage.getItem('userId'),
        manufacturerName: localStorage.getItem('userName'),
        productName: formData.productName,
        batchId: formData.batchId,
        manufactureDate: formData.manufactureDate,
        expiryDate: formData.expiryDate,
        ingredients: formData.ingredients,
        packagingType: formData.packagingType,
        location: formData.location,
      });

      // Step 2: Record on blockchain
      const blockchainResponse = await blockchain.recordManufacturing({
        manufacturerId: dbResponse.manufacturerId,
        manufacturerName: dbResponse.manufacturerName,
        productId: dbResponse.productId,
        productName: formData.productName,
        batchId: formData.batchId,
        manufactureDate: formData.manufactureDate,
        expiryDate: formData.expiryDate,
        ingredients: formData.ingredients,
        packagingType: formData.packagingType,
        location: formData.location,
        previousBlockHash: previousBlockHash,
      });

      // Step 3: Generate QR code
      const qrResponse = await blockchain.generateProductQR({
        productId: dbResponse.productId,
      });

      return {
        success: true,
        message: 'Product manufactured and QR code generated!',
        productId: dbResponse.productId,
        blockHash: blockchainResponse.blockHash,
        qrCode: qrResponse.qrCode,
        qrUrl: qrResponse.qrUrl,
      };
    } catch (error) {
      console.error('Error adding manufacturing:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  },
};

// ============================================
// DISTRIBUTOR DASHBOARD INTEGRATION EXAMPLE
// ============================================

export const DistributorIntegrationExample = {
  // Add distribution with blockchain recording
  async addDistribution(formData, previousBlockHash) {
    try {
      // Step 1: Save to database
      const dbResponse = await api.addDistribution({
        distributorId: localStorage.getItem('userId'),
        distributorName: localStorage.getItem('userName'),
        productId: formData.productId,
        shipmentDate: formData.shipmentDate,
        destination: formData.destination,
        quantity: formData.quantity,
        transportMode: formData.transportMode,
        estimatedDelivery: formData.estimatedDelivery,
        location: formData.location,
      });

      // Step 2: Record on blockchain
      const blockchainResponse = await blockchain.recordDistribution({
        distributorId: dbResponse.distributorId,
        distributorName: dbResponse.distributorName,
        productId: formData.productId,
        shipmentId: dbResponse.shipmentId,
        shipmentDate: formData.shipmentDate,
        destination: formData.destination,
        quantity: formData.quantity,
        transportMode: formData.transportMode,
        estimatedDelivery: formData.estimatedDelivery,
        location: formData.location,
        previousBlockHash: previousBlockHash,
      });

      return {
        success: true,
        message: 'Distribution recorded successfully!',
        shipmentId: dbResponse.shipmentId,
        blockHash: blockchainResponse.blockHash,
      };
    } catch (error) {
      console.error('Error adding distribution:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  },
};

// ============================================
// QR SCANNER INTEGRATION EXAMPLE
// ============================================

export const QRScannerIntegrationExample = {
  // Scan QR code and get product journey
  async scanQRCode(qrData) {
    try {
      // Step 1: Scan and verify QR code
      const scanResult = await blockchain.scanAndVerify(qrData);

      if (!scanResult.success) {
        return {
          success: false,
          message: 'Invalid QR code',
        };
      }

      // Step 2: Get complete product journey
      const journeyResult = await blockchain.getProductJourney(
        scanResult.product.productId
      );

      return {
        success: true,
        product: scanResult.product,
        journey: journeyResult.journey,
        verified: journeyResult.verified,
      };
    } catch (error) {
      console.error('Error scanning QR code:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  },
};

// ============================================
// AUTHENTICATION INTEGRATION EXAMPLE
// ============================================

export const AuthIntegrationExample = {
  // Login
  async login(role, email, password) {
    try {
      const response = await api.login(role, { email, password });

      if (response.success) {
        // Store auth data
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userRole', response.user.role);
        localStorage.setItem('userId', response.user.id);
        localStorage.setItem('userName', response.user.name);

        return {
          success: true,
          user: response.user,
        };
      }

      return {
        success: false,
        message: response.message,
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Register
  async register(role, userData) {
    try {
      const response = await api.register(role, userData);

      if (response.success) {
        return {
          success: true,
          message: 'Registration successful! Please login.',
        };
      }

      return {
        success: false,
        message: response.message,
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Logout
  async logout() {
    await api.logout();
    return { success: true };
  },
};
