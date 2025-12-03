import api from '../services/api';
import Swal from 'sweetalert2';

/**
 * Sync vendor data from backend to frontend
 */
export const syncVendorData = async (userId) => {
  try {
    console.log('🔄 Syncing vendor data from backend...');
    
    // Show loading
    Swal.fire({
      title: 'Loading...',
      text: 'Fetching your data from database',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Get CSRF cookie first
    const { getCsrfCookie } = await import('../services/api');
    await getCsrfCookie();

    // Fetch vendor dashboard data
    const response = await api.get('/vendor/dashboard');
    
    if (response.data) {
      const { products, orders, stats } = response.data;
      
      // Save products to localStorage
      if (products && products.length > 0) {
        localStorage.setItem(`vendor_products_${userId}`, JSON.stringify(products));
        console.log(`✅ Synced ${products.length} products`);
      }
      
      // Save orders to localStorage
      if (orders && orders.length > 0) {
        localStorage.setItem(`vendor_orders_${userId}`, JSON.stringify(orders));
        console.log(`✅ Synced ${orders.length} orders`);
      }
      
      Swal.fire({
        icon: 'success',
        title: 'Data Loaded!',
        html: `
          <div class="text-left">
            <p><strong>Products:</strong> ${products?.length || 0}</p>
            <p><strong>Orders:</strong> ${orders?.length || 0}</p>
            <p><strong>Total Sales:</strong> ₱${stats?.totalRevenue?.toLocaleString() || 0}</p>
          </div>
        `,
        timer: 2000,
        showConfirmButton: false
      });
      
      return { products, orders, stats };
    }
  } catch (error) {
    console.error('❌ Failed to sync vendor data:', error);
    
    // Check if it's a 401 Unauthorized error
    if (error.response?.status === 401) {
      Swal.fire({
        icon: 'warning',
        title: 'Session Expired',
        text: 'Please login again to sync data from database.',
        confirmButtonText: 'OK',
        footer: '<small>Using cached data for now</small>'
      });
    } else if (!error.response) {
      // Network error or backend is down
      Swal.fire({
        icon: 'info',
        title: 'Backend Not Available',
        text: 'Using cached data. Backend will sync automatically when available.',
        confirmButtonText: 'OK',
        timer: 3000
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Data',
        text: error.response?.data?.message || 'Please try again',
        confirmButtonText: 'OK'
      });
    }
    
    return null;
  }
};

/**
 * Fetch vendor products from backend
 */
export const fetchVendorProducts = async (userId) => {
  try {
    const response = await api.get('/vendor/products');
    
    if (response.data && response.data.products) {
      const products = response.data.products;
      localStorage.setItem(`vendor_products_${userId}`, JSON.stringify(products));
      console.log(`✅ Fetched ${products.length} products`);
      return products;
    }
  } catch (error) {
    console.error('❌ Failed to fetch products:', error);
    return null;
  }
};

/**
 * Fetch vendor orders from backend
 */
export const fetchVendorOrders = async (userId) => {
  try {
    const response = await api.get('/vendor/orders');
    
    if (response.data && response.data.orders) {
      const orders = response.data.orders;
      localStorage.setItem(`vendor_orders_${userId}`, JSON.stringify(orders));
      console.log(`✅ Fetched ${orders.length} orders`);
      return orders;
    }
  } catch (error) {
    console.error('❌ Failed to fetch orders:', error);
    return null;
  }
};

/**
 * Show success notification with SweetAlert2
 */
export const showSuccessNotification = (title, text) => {
  Swal.fire({
    icon: 'success',
    title,
    text,
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end'
  });
};

/**
 * Show error notification with SweetAlert2
 */
export const showErrorNotification = (title, text) => {
  Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonText: 'OK'
  });
};

/**
 * Show confirmation dialog
 */
export const showConfirmDialog = async (title, text) => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#E67E22',
    cancelButtonColor: '#95a5a6',
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel'
  });
  
  return result.isConfirmed;
};
