import api from './api';

/**
 * Data Service - Fetches all data from database
 * This service provides methods to fetch and sync data from the Laravel backend
 */

class DataService {
  constructor() {
    this.cache = {
      products: null,
      users: null,
      vendors: null,
      orders: null,
      lastFetch: {}
    };
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Check if cache is still valid
   */
  isCacheValid(key) {
    if (!this.cache[key] || !this.cache.lastFetch[key]) {
      return false;
    }
    const now = Date.now();
    return (now - this.cache.lastFetch[key]) < this.cacheTimeout;
  }

  /**
   * Fetch all products from database
   */
  async fetchProducts(forceRefresh = false) {
    try {
      if (!forceRefresh && this.isCacheValid('products')) {
        console.log('📦 Using cached products');
        return this.cache.products;
      }

      console.log('🔄 Fetching products from database...');
      const response = await api.get('/products');
      
      this.cache.products = response.data.data || response.data;
      this.cache.lastFetch.products = Date.now();
      
      console.log(`✅ Fetched ${this.cache.products.length} products from database`);
      return this.cache.products;
    } catch (error) {
      console.warn('⚠️ Failed to fetch products from database:', error.message);
      
      // Fallback to localStorage if database fails
      const localProducts = localStorage.getItem('products');
      if (localProducts) {
        console.log('📦 Using localStorage products as fallback');
        return JSON.parse(localProducts);
      }
      
      return [];
    }
  }

  /**
   * Fetch vendor's products
   */
  async fetchVendorProducts(forceRefresh = false) {
    try {
      console.log('🔄 Fetching vendor products from database...');
      const response = await api.get('/vendor/products');
      
      const products = response.data.data || response.data;
      console.log(`✅ Fetched ${products.length} vendor products`);
      return products;
    } catch (error) {
      console.warn('⚠️ Failed to fetch vendor products:', error.message);
      return [];
    }
  }

  /**
   * Fetch all users (admin only)
   */
  async fetchUsers(forceRefresh = false) {
    try {
      if (!forceRefresh && this.isCacheValid('users')) {
        console.log('📦 Using cached users');
        return this.cache.users;
      }

      console.log('🔄 Fetching users from database...');
      const response = await api.get('/admin/users');
      
      this.cache.users = response.data.data || response.data;
      this.cache.lastFetch.users = Date.now();
      
      console.log(`✅ Fetched ${this.cache.users.length} users from database`);
      
      // Sync to localStorage for compatibility
      localStorage.setItem('global_users', JSON.stringify(this.cache.users));
      
      return this.cache.users;
    } catch (error) {
      console.warn('⚠️ Failed to fetch users from database:', error.message);
      
      // Fallback to localStorage
      const localUsers = localStorage.getItem('global_users');
      if (localUsers) {
        console.log('📦 Using localStorage users as fallback');
        return JSON.parse(localUsers);
      }
      
      return [];
    }
  }

  /**
   * Fetch all vendors (admin only)
   */
  async fetchVendors(forceRefresh = false) {
    try {
      if (!forceRefresh && this.isCacheValid('vendors')) {
        console.log('📦 Using cached vendors');
        return this.cache.vendors;
      }

      console.log('🔄 Fetching vendors from database...');
      const response = await api.get('/admin/vendors');
      
      this.cache.vendors = response.data.data || response.data;
      this.cache.lastFetch.vendors = Date.now();
      
      console.log(`✅ Fetched ${this.cache.vendors.length} vendors from database`);
      return this.cache.vendors;
    } catch (error) {
      console.warn('⚠️ Failed to fetch vendors from database:', error.message);
      return [];
    }
  }

  /**
   * Fetch pending vendor applications (admin only)
   */
  async fetchPendingVendors() {
    try {
      console.log('🔄 Fetching pending vendors from database...');
      const response = await api.get('/admin/vendors/pending');
      
      const pendingVendors = response.data.data || response.data;
      console.log(`✅ Fetched ${pendingVendors.length} pending vendors`);
      return pendingVendors;
    } catch (error) {
      console.warn('⚠️ Failed to fetch pending vendors:', error.message);
      
      // Fallback to localStorage
      const localApplications = localStorage.getItem('vendorApplications');
      if (localApplications) {
        return JSON.parse(localApplications);
      }
      
      return [];
    }
  }

  /**
   * Fetch all orders (admin only)
   */
  async fetchAllOrders(forceRefresh = false) {
    try {
      if (!forceRefresh && this.isCacheValid('orders')) {
        console.log('📦 Using cached orders');
        return this.cache.orders;
      }

      console.log('🔄 Fetching all orders from database...');
      const response = await api.get('/admin/orders');
      
      this.cache.orders = response.data.data || response.data;
      this.cache.lastFetch.orders = Date.now();
      
      console.log(`✅ Fetched ${this.cache.orders.length} orders from database`);
      return this.cache.orders;
    } catch (error) {
      console.warn('⚠️ Failed to fetch orders from database:', error.message);
      
      // Fallback to localStorage
      const localOrders = localStorage.getItem('customerOrders');
      if (localOrders) {
        return JSON.parse(localOrders);
      }
      
      return [];
    }
  }

  /**
   * Fetch customer orders
   */
  async fetchCustomerOrders() {
    try {
      console.log('🔄 Fetching customer orders from database...');
      const response = await api.get('/customer/orders');
      
      const orders = response.data.data || response.data;
      console.log(`✅ Fetched ${orders.length} customer orders`);
      
      // Sync to localStorage for compatibility
      localStorage.setItem('customerOrders', JSON.stringify(orders));
      
      return orders;
    } catch (error) {
      console.warn('⚠️ Failed to fetch customer orders:', error.message);
      
      // Fallback to localStorage
      const localOrders = localStorage.getItem('customerOrders');
      if (localOrders) {
        return JSON.parse(localOrders);
      }
      
      return [];
    }
  }

  /**
   * Fetch vendor orders
   */
  async fetchVendorOrders() {
    try {
      console.log('🔄 Fetching vendor orders from database...');
      const response = await api.get('/vendor/orders');
      
      const orders = response.data.data || response.data;
      console.log(`✅ Fetched ${orders.length} vendor orders`);
      return orders;
    } catch (error) {
      console.warn('⚠️ Failed to fetch vendor orders:', error.message);
      return [];
    }
  }

  /**
   * Fetch dashboard analytics (admin only)
   */
  async fetchAnalytics() {
    try {
      console.log('🔄 Fetching analytics from database...');
      const response = await api.get('/admin/analytics');
      
      const analytics = response.data;
      console.log('✅ Fetched analytics from database');
      return analytics;
    } catch (error) {
      console.warn('⚠️ Failed to fetch analytics:', error.message);
      return null;
    }
  }

  /**
   * Fetch vendor dashboard data
   */
  async fetchVendorDashboard() {
    try {
      console.log('🔄 Fetching vendor dashboard from database...');
      const response = await api.get('/vendor/dashboard');
      
      const dashboard = response.data;
      console.log('✅ Fetched vendor dashboard data');
      return dashboard;
    } catch (error) {
      console.warn('⚠️ Failed to fetch vendor dashboard:', error.message);
      return null;
    }
  }

  /**
   * Fetch customer dashboard data
   */
  async fetchCustomerDashboard() {
    try {
      console.log('🔄 Fetching customer dashboard from database...');
      const response = await api.get('/customer/dashboard');
      
      const dashboard = response.data;
      console.log('✅ Fetched customer dashboard data');
      return dashboard;
    } catch (error) {
      console.warn('⚠️ Failed to fetch customer dashboard:', error.message);
      return null;
    }
  }

  /**
   * Clear all caches
   */
  clearCache() {
    this.cache = {
      products: null,
      users: null,
      vendors: null,
      orders: null,
      lastFetch: {}
    };
    console.log('🗑️ Cache cleared');
  }

  /**
   * Sync all data from database
   * Useful for initial load or refresh
   */
  async syncAllData(userRole) {
    console.log('🔄 Syncing all data from database...');
    
    try {
      // Fetch products (public)
      await this.fetchProducts(true);
      
      // Fetch role-specific data
      if (userRole === 'admin') {
        await Promise.all([
          this.fetchUsers(true),
          this.fetchVendors(true),
          this.fetchAllOrders(true),
          this.fetchAnalytics()
        ]);
      } else if (userRole === 'vendor') {
        await Promise.all([
          this.fetchVendorProducts(true),
          this.fetchVendorOrders(),
          this.fetchVendorDashboard()
        ]);
      } else if (userRole === 'customer') {
        await Promise.all([
          this.fetchCustomerOrders(),
          this.fetchCustomerDashboard()
        ]);
      }
      
      console.log('✅ All data synced successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to sync all data:', error);
      return false;
    }
  }
}

// Export singleton instance
const dataService = new DataService();
export default dataService;
