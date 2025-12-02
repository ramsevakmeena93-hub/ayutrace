// Blockchain Service for Smart Contract Interaction
import api from './api';

class BlockchainService {
  constructor() {
    this.contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    this.networkId = import.meta.env.VITE_NETWORK_ID || '1';
  }

  // Create a new block in the blockchain
  async createSupplyChainBlock(data) {
    const blockData = {
      timestamp: Date.now(),
      data: {
        type: data.type, // 'harvest', 'processing', 'testing', 'manufacturing', 'distribution'
        stakeholder: data.stakeholder,
        location: data.location,
        details: data.details,
        previousHash: data.previousHash || null,
      },
    };

    try {
      const response = await api.createBlock(blockData);
      return {
        success: true,
        blockHash: response.hash,
        blockNumber: response.index,
        transactionId: response.transactionId,
      };
    } catch (error) {
      console.error('Blockchain Error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Record harvest on blockchain
  async recordHarvest(harvestData) {
    return this.createSupplyChainBlock({
      type: 'harvest',
      stakeholder: {
        id: harvestData.farmerId,
        name: harvestData.farmerName,
        role: 'farmer',
      },
      location: harvestData.location,
      details: {
        herbName: harvestData.herbName,
        quantity: harvestData.quantity,
        harvestDate: harvestData.harvestDate,
        organicCertified: harvestData.organicCertified,
        batchId: harvestData.batchId,
      },
    });
  }

  // Record processing on blockchain
  async recordProcessing(processingData) {
    return this.createSupplyChainBlock({
      type: 'processing',
      stakeholder: {
        id: processingData.processorId,
        name: processingData.processorName,
        role: 'processor',
      },
      location: processingData.location,
      details: {
        batchId: processingData.batchId,
        processType: processingData.processType,
        processDate: processingData.processDate,
        outputQuantity: processingData.outputQuantity,
        qualityGrade: processingData.qualityGrade,
      },
      previousHash: processingData.previousBlockHash,
    });
  }

  // Record lab testing on blockchain
  async recordTesting(testData) {
    return this.createSupplyChainBlock({
      type: 'testing',
      stakeholder: {
        id: testData.labId,
        name: testData.labName,
        role: 'lab',
      },
      location: testData.location,
      details: {
        batchId: testData.batchId,
        testDate: testData.testDate,
        testType: testData.testType,
        results: testData.results,
        qualityScore: testData.qualityScore,
        certified: testData.certified,
        certificateNumber: testData.certificateNumber,
      },
      previousHash: testData.previousBlockHash,
    });
  }

  // Record manufacturing on blockchain
  async recordManufacturing(manufacturingData) {
    return this.createSupplyChainBlock({
      type: 'manufacturing',
      stakeholder: {
        id: manufacturingData.manufacturerId,
        name: manufacturingData.manufacturerName,
        role: 'manufacturer',
      },
      location: manufacturingData.location,
      details: {
        productId: manufacturingData.productId,
        productName: manufacturingData.productName,
        batchId: manufacturingData.batchId,
        manufactureDate: manufacturingData.manufactureDate,
        expiryDate: manufacturingData.expiryDate,
        ingredients: manufacturingData.ingredients,
        packagingType: manufacturingData.packagingType,
      },
      previousHash: manufacturingData.previousBlockHash,
    });
  }

  // Record distribution on blockchain
  async recordDistribution(distributionData) {
    return this.createSupplyChainBlock({
      type: 'distribution',
      stakeholder: {
        id: distributionData.distributorId,
        name: distributionData.distributorName,
        role: 'distributor',
      },
      location: distributionData.location,
      details: {
        productId: distributionData.productId,
        shipmentId: distributionData.shipmentId,
        shipmentDate: distributionData.shipmentDate,
        destination: distributionData.destination,
        quantity: distributionData.quantity,
        transportMode: distributionData.transportMode,
        estimatedDelivery: distributionData.estimatedDelivery,
      },
      previousHash: distributionData.previousBlockHash,
    });
  }

  // Get complete product journey from blockchain
  async getProductJourney(productId) {
    try {
      const journey = await api.getProductJourney(productId);
      return {
        success: true,
        journey: journey.blocks || [],
        verified: journey.verified,
      };
    } catch (error) {
      console.error('Error fetching product journey:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Verify blockchain integrity
  async verifyChainIntegrity() {
    try {
      const result = await api.validateChain();
      return {
        success: true,
        valid: result.valid,
        message: result.message,
      };
    } catch (error) {
      console.error('Chain validation error:', error);
      return {
        success: false,
        valid: false,
        error: error.message,
      };
    }
  }

  // Generate QR code for product
  async generateProductQR(productData) {
    try {
      const qrData = await api.generateQRCode(productData.productId);
      return {
        success: true,
        qrCode: qrData.qrCode,
        qrUrl: qrData.url,
        productId: productData.productId,
      };
    } catch (error) {
      console.error('QR generation error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Scan and verify QR code
  async scanAndVerify(qrData) {
    try {
      const result = await api.scanQRCode(qrData);
      return {
        success: true,
        product: result.product,
        journey: result.journey,
        verified: result.verified,
      };
    } catch (error) {
      console.error('QR scan error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export default new BlockchainService();
