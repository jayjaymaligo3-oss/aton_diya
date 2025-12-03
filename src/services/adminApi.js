import api from './api';

const adminApi = {
  // Dashboard
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  // Users
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  toggleUserStatus: async (userId) => {
    const response = await api.post(`/admin/users/${userId}/toggle-status`);
    return response.data;
  },

  // Vendors
  getVendors: async (params = {}) => {
    const response = await api.get('/admin/vendors', { params });
    return response.data;
  },

  getPendingVendors: async () => {
    const response = await api.get('/admin/vendors/pending');
    return response.data;
  },

  approveVendor: async (userId) => {
    const response = await api.post(`/admin/vendors/${userId}/approve`);
    return response.data;
  },

  rejectVendor: async (userId, reason) => {
    const response = await api.post(`/admin/vendors/${userId}/reject`, { reason });
    return response.data;
  },

  // Orders
  getOrders: async (params = {}) => {
    const response = await api.get('/admin/orders', { params });
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/admin/orders/${orderId}/status`, { status });
    return response.data;
  },

  // Products
  getProducts: async () => {
    const response = await api.get('/admin/products');
    return response.data;
  },

  // Analytics
  getAnalytics: async (period = 30) => {
    const response = await api.get('/admin/analytics', { params: { period } });
    return response.data;
  },
};

export default adminApi;
