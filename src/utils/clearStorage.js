/**
 * Clear Storage Utility
 * Use this to refresh/clear localStorage data
 */

// Clear all global transaction data
export const clearAllGlobalData = () => {
  console.log('🗑️ Clearing all global data...');
  
  localStorage.removeItem('global_users');
  localStorage.removeItem('global_vendors');
  localStorage.removeItem('global_products');
  localStorage.removeItem('global_orders');
  localStorage.removeItem('global_notifications');
  localStorage.removeItem('transactions_initialized');
  localStorage.removeItem('lastSyncTime');
  
  console.log('✅ All global data cleared!');
  console.log('💡 Refresh the page to reinitialize sample data');
};

// Clear only orders
export const clearOrders = () => {
  localStorage.removeItem('global_orders');
  localStorage.removeItem('customerOrders');
  console.log('✅ Orders cleared!');
};

// Clear only products
export const clearProducts = () => {
  localStorage.removeItem('global_products');
  console.log('✅ Products cleared!');
};

// Clear only users
export const clearUsers = () => {
  localStorage.removeItem('global_users');
  console.log('✅ Users cleared!');
};

// Clear everything (including auth)
export const clearEverything = () => {
  console.log('🗑️ Clearing EVERYTHING...');
  localStorage.clear();
  console.log('✅ All localStorage cleared!');
  console.log('💡 You will need to login again');
};

// View all data
export const viewAllData = () => {
  console.log('📊 Current localStorage data:');
  console.log('Users:', JSON.parse(localStorage.getItem('global_users') || '[]'));
  console.log('Vendors:', JSON.parse(localStorage.getItem('global_vendors') || '[]'));
  console.log('Products:', JSON.parse(localStorage.getItem('global_products') || '[]'));
  console.log('Orders:', JSON.parse(localStorage.getItem('global_orders') || '[]'));
};

// Refresh data (clear and reinitialize)
export const refreshData = () => {
  clearAllGlobalData();
  console.log('🔄 Refreshing page to reinitialize data...');
  setTimeout(() => {
    window.location.reload();
  }, 500);
};

// Export for console use
if (typeof window !== 'undefined') {
  window.clearStorage = {
    clearAll: clearAllGlobalData,
    clearOrders,
    clearProducts,
    clearUsers,
    clearEverything,
    viewAll: viewAllData,
    refresh: refreshData
  };
  console.log('💡 Storage utilities loaded! Use: window.clearStorage');
}

export default {
  clearAllGlobalData,
  clearOrders,
  clearProducts,
  clearUsers,
  clearEverything,
  viewAllData,
  refreshData
};
