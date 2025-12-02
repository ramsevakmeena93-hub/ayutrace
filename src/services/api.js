// API Service for AyuTrace Backend Integration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const BLOCKCHAIN_API_URL = import.meta.env.VITE_BLOCKCHAIN_API_URL || 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.blockchainURL = BLOCKCHAIN_API_URL;
  }

  // Generic request handler
  async request(url, options = {}) {
    const token = localStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Authentication
  async login(role, credentials) {
    return this.request(`${this.baseURL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ role, ...credentials }),
    });
  }

  async register(role, userData) {
    return this.request(`${this.baseURL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ role, ...userData }),
    });
  }

  async logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    return { success: true };
  }

  // Blockchain Operations
  async createBlock(data) {
    return this.request(`${this.blockchainURL}/blocks/create`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBlockchain() {
    return this.request(`${this.blockchainURL}/blocks/chain`);
  }

  async getBlockByHash(hash) {
    return this.request(`${this.blockchainURL}/blocks/${hash}`);
  }

  async validateChain() {
    return this.request(`${this.blockchainURL}/blocks/validate`);
  }

  // Farmer Operations
  async addHarvest(harvestData) {
    return this.request(`${this.baseURL}/farmer/harvest`, {
      method: 'POST',
      body: JSON.stringify(harvestData),
    });
  }

  async getFarmerHarvests(farmerId) {
    return this.request(`${this.baseURL}/farmer/harvests/${farmerId}`);
  }

  async updateHarvestStatus(harvestId, status) {
    return this.request(`${this.baseURL}/farmer/harvest/${harvestId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Processor Operations
  async addProcessing(processingData) {
    return this.request(`${this.baseURL}/processor/process`, {
      method: 'POST',
      body: JSON.stringify(processingData),
    });
  }

  async getProcessorBatches(processorId) {
    return this.request(`${this.baseURL}/processor/batches/${processorId}`);
  }

  async updateProcessingStatus(batchId, status) {
    return this.request(`${this.baseURL}/processor/batch/${batchId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Lab Operations
  async addTestResult(testData) {
    return this.request(`${this.baseURL}/lab/test`, {
      method: 'POST',
      body: JSON.stringify(testData),
    });
  }

  async getLabTests(labId) {
    return this.request(`${this.baseURL}/lab/tests/${labId}`);
  }

  async updateTestStatus(testId, status, results) {
    return this.request(`${this.baseURL}/lab/test/${testId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, results }),
    });
  }

  // Manufacturer Operations
  async addManufacturing(manufacturingData) {
    return this.request(`${this.baseURL}/manufacturer/manufacture`, {
      method: 'POST',
      body: JSON.stringify(manufacturingData),
    });
  }

  async getManufacturerProducts(manufacturerId) {
    return this.request(`${this.baseURL}/manufacturer/products/${manufacturerId}`);
  }

  async generateQRCode(productId) {
    return this.request(`${this.baseURL}/manufacturer/qr/${productId}`);
  }

  // Distributor Operations
  async addDistribution(distributionData) {
    return this.request(`${this.baseURL}/distributor/distribute`, {
      method: 'POST',
      body: JSON.stringify(distributionData),
    });
  }

  async getDistributorShipments(distributorId) {
    return this.request(`${this.baseURL}/distributor/shipments/${distributorId}`);
  }

  async updateShipmentStatus(shipmentId, status, location) {
    return this.request(`${this.baseURL}/distributor/shipment/${shipmentId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, location }),
    });
  }

  // Product Tracking
  async getProductJourney(productId) {
    return this.request(`${this.baseURL}/product/journey/${productId}`);
  }

  async scanQRCode(qrData) {
    return this.request(`${this.baseURL}/product/scan`, {
      method: 'POST',
      body: JSON.stringify({ qrData }),
    });
  }

  async verifyProduct(productId) {
    return this.request(`${this.baseURL}/product/verify/${productId}`);
  }

  // Analytics
  async getDashboardStats(role, userId) {
    return this.request(`${this.baseURL}/analytics/dashboard/${role}/${userId}`);
  }

  async getSupplyChainMetrics() {
    return this.request(`${this.baseURL}/analytics/supply-chain`);
  }
}

export default new ApiService();
