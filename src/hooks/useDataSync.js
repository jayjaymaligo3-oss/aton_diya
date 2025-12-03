import { useState, useEffect, useCallback } from 'react';
import dataService from '../services/dataService';
import { useAuth } from '../context/AuthContext';

/**
 * Custom hook for syncing data from database
 * Automatically fetches data based on user role
 */
export const useDataSync = (autoSync = true) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);

  /**
   * Sync all data based on user role
   */
  const syncData = useCallback(async () => {
    if (!user) {
      console.log('⏭️ Skipping data sync - no user logged in');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`🔄 Syncing data for ${user.role}...`);
      const success = await dataService.syncAllData(user.role);
      
      if (success) {
        setLastSync(new Date());
        console.log('✅ Data sync completed');
      } else {
        throw new Error('Data sync failed');
      }
    } catch (err) {
      console.error('❌ Data sync error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Auto-sync on mount and when user changes
   */
  useEffect(() => {
    if (autoSync && user) {
      syncData();
    }
  }, [autoSync, user, syncData]);

  return {
    loading,
    error,
    lastSync,
    syncData,
    clearCache: dataService.clearCache.bind(dataService)
  };
};

/**
 * Hook for fetching products
 */
export const useProducts = (autoFetch = true) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      const data = await dataService.fetchProducts(forceRefresh);
      setProducts(data);
    } catch (err) {
      console.error('❌ Failed to fetch products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch, fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts
  };
};

/**
 * Hook for fetching users (admin only)
 */
export const useUsers = (autoFetch = true) => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async (forceRefresh = false) => {
    if (user?.role !== 'admin') {
      console.warn('⚠️ Only admins can fetch users');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await dataService.fetchUsers(forceRefresh);
      setUsers(data);
    } catch (err) {
      console.error('❌ Failed to fetch users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (autoFetch && user?.role === 'admin') {
      fetchUsers();
    }
  }, [autoFetch, user, fetchUsers]);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers
  };
};

/**
 * Hook for fetching orders
 */
export const useOrders = (autoFetch = true) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async (forceRefresh = false) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      let data;
      if (user.role === 'admin') {
        data = await dataService.fetchAllOrders(forceRefresh);
      } else if (user.role === 'vendor') {
        data = await dataService.fetchVendorOrders();
      } else if (user.role === 'customer') {
        data = await dataService.fetchCustomerOrders();
      }
      setOrders(data || []);
    } catch (err) {
      console.error('❌ Failed to fetch orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (autoFetch && user) {
      fetchOrders();
    }
  }, [autoFetch, user, fetchOrders]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders
  };
};

/**
 * Hook for fetching vendors (admin only)
 */
export const useVendors = (autoFetch = true) => {
  const { user } = useAuth();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVendors = useCallback(async (forceRefresh = false) => {
    if (user?.role !== 'admin') {
      console.warn('⚠️ Only admins can fetch vendors');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await dataService.fetchVendors(forceRefresh);
      setVendors(data);
    } catch (err) {
      console.error('❌ Failed to fetch vendors:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (autoFetch && user?.role === 'admin') {
      fetchVendors();
    }
  }, [autoFetch, user, fetchVendors]);

  return {
    vendors,
    loading,
    error,
    refetch: fetchVendors
  };
};
