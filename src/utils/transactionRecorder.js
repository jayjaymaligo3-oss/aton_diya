/**
 * Transaction Recorder - Records all transactions to localStorage and database
 * Ensures all user actions are tracked and synced across the platform
 */

import api from '../services/api';

// Record Order Transaction
export const recordOrderTransaction = async (order, userId, userRole = 'customer') => {
  try {
    console.log('📝 Recording order transaction:', order.id);
    
    // 1. Save to localStorage (global_orders)
    const globalOrders = JSON.parse(localStorage.getItem('global_orders') || '[]');
    const existingIndex = globalOrders.findIndex(o => o.id === order.id);
    
    const orderData = {
      id: order.id,
      userId: userId,
      userRole: userRole,
      customerName: order.shippingInfo?.fullName || order.customer || 'Unknown',
      customer: order.shippingInfo?.fullName || order.customer || 'Unknown',
      date: order.date || new Date().toLocaleDateString(),
      dateTime: order.dateTime || new Date().toISOString(),
      items: Array.isArray(order.products) ? order.products.length : (order.items || 0),
      products: order.products || [],
      subtotal: order.subtotal || order.total,
      shippingFee: order.shippingFee || '50.00',
      total: order.total,
      status: order.status || 'Pending',
      paymentMethod: order.paymentMethod || 'cod',
      shippingInfo: order.shippingInfo || {},
      createdAt: order.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    if (existingIndex >= 0) {
      globalOrders[existingIndex] = orderData;
    } else {
      globalOrders.unshift(orderData);
    }
    
    localStorage.setItem('global_orders', JSON.stringify(globalOrders));
    console.log('✅ Order saved to localStorage');
    
    // 2. Update user order count
    updateUserOrderCount(userId);
    
    // 3. Sync to database
    try {
      await api.post('/admin/orders/sync', { order: orderData });
      console.log('✅ Order synced to database');
    } catch (error) {
      console.warn('⚠️ Failed to sync order to database:', error.message);
    }
    
    return orderData;
  } catch (error) {
    console.error('❌ Error recording order transaction:', error);
    throw error;
  }
};

// Update User Order Count
const updateUserOrderCount = (userId) => {
  try {
    const globalUsers = JSON.parse(localStorage.getItem('global_users') || '[]');
    const globalOrders = JSON.parse(localStorage.getItem('global_orders') || '[]');
    
    const userIndex = globalUsers.findIndex(u => u.id === userId);
    if (userIndex >= 0) {
      const userOrders = globalOrders.filter(o => o.userId === userId);
      globalUsers[userIndex].orders = userOrders.length;
      localStorage.setItem('global_users', JSON.stringify(globalUsers));
      console.log('✅ User order count updated:', userOrders.length);
    }
  } catch (error) {
    console.error('❌ Error updating user order count:', error);
  }
};

// Record Product Transaction (Add/Update/Delete)
export const recordProductTransaction = async (product, vendorId, action = 'add') => {
  try {
    console.log(`📝 Recording product ${action}:`, product.name);
    
    const globalProducts = JSON.parse(localStorage.getItem('global_products') || '[]');
    
    if (action === 'delete') {
      const filtered = globalProducts.filter(p => p.id !== product.id);
      localStorage.setItem('global_products', JSON.stringify(filtered));
    } else {
      const productData = {
        ...product,
        vendorId: vendorId,
        updatedAt: new Date().toISOString()
      };
      
      const existingIndex = globalProducts.findIndex(p => p.id === product.id);
      if (existingIndex >= 0) {
        globalProducts[existingIndex] = productData;
      } else {
        globalProducts.push(productData);
      }
      
      localStorage.setItem('global_products', JSON.stringify(globalProducts));
    }
    
    console.log(`✅ Product ${action} recorded to localStorage`);
    
    // Sync to database
    try {
      await api.post('/admin/products/sync', { 
        product: action === 'delete' ? { id: product.id, action: 'delete' } : product,
        vendorId,
        action
      });
      console.log('✅ Product synced to database');
    } catch (error) {
      console.warn('⚠️ Failed to sync product to database:', error.message);
    }
  } catch (error) {
    console.error('❌ Error recording product transaction:', error);
  }
};

// Record Vendor Transaction
export const recordVendorTransaction = async (vendor, action = 'add') => {
  try {
    console.log(`📝 Recording vendor ${action}:`, vendor.businessName);
    
    const globalVendors = JSON.parse(localStorage.getItem('global_vendors') || '[]');
    
    const vendorData = {
      id: vendor.id,
      userId: vendor.userId,
      businessName: vendor.businessName || vendor.business_name,
      businessDescription: vendor.businessDescription || vendor.business_description,
      category: vendor.category,
      phone: vendor.phone,
      address: vendor.address,
      status: vendor.status || 'pending',
      createdAt: vendor.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const existingIndex = globalVendors.findIndex(v => v.userId === vendor.userId);
    if (existingIndex >= 0) {
      globalVendors[existingIndex] = vendorData;
    } else {
      globalVendors.push(vendorData);
    }
    
    localStorage.setItem('global_vendors', JSON.stringify(globalVendors));
    console.log('✅ Vendor recorded to localStorage');
    
    // Sync to database
    try {
      await api.post('/admin/vendors/sync', { vendor: vendorData, action });
      console.log('✅ Vendor synced to database');
    } catch (error) {
      console.warn('⚠️ Failed to sync vendor to database:', error.message);
    }
  } catch (error) {
    console.error('❌ Error recording vendor transaction:', error);
  }
};

// Get All Transactions Summary
export const getTransactionsSummary = () => {
  try {
    const globalUsers = JSON.parse(localStorage.getItem('global_users') || '[]');
    const globalVendors = JSON.parse(localStorage.getItem('global_vendors') || '[]');
    const globalOrders = JSON.parse(localStorage.getItem('global_orders') || '[]');
    const globalProducts = JSON.parse(localStorage.getItem('global_products') || '[]');
    
    const totalRevenue = globalOrders.reduce((sum, order) => {
      const total = parseFloat(order.total?.toString().replace(/,/g, '') || 0);
      return sum + total;
    }, 0);
    
    return {
      totalUsers: globalUsers.length,
      totalVendors: globalVendors.length,
      totalOrders: globalOrders.length,
      totalProducts: globalProducts.length,
      totalRevenue: totalRevenue,
      activeVendors: globalVendors.filter(v => v.status === 'active').length,
      pendingOrders: globalOrders.filter(o => o.status === 'Pending').length,
      deliveredOrders: globalOrders.filter(o => o.status === 'Delivered').length
    };
  } catch (error) {
    console.error('❌ Error getting transactions summary:', error);
    return null;
  }
};

// Sync All Data to Database
export const syncAllDataToDatabase = async () => {
  try {
    console.log('🔄 Syncing all data to database...');
    
    const globalUsers = JSON.parse(localStorage.getItem('global_users') || '[]');
    const globalVendors = JSON.parse(localStorage.getItem('global_vendors') || '[]');
    const globalOrders = JSON.parse(localStorage.getItem('global_orders') || '[]');
    const globalProducts = JSON.parse(localStorage.getItem('global_products') || '[]');
    
    await api.post('/admin/sync-all', {
      users: globalUsers,
      vendors: globalVendors,
      orders: globalOrders,
      products: globalProducts
    });
    
    console.log('✅ All data synced to database successfully');
    return true;
  } catch (error) {
    console.error('❌ Error syncing all data:', error);
    return false;
  }
};

export default {
  recordOrderTransaction,
  recordProductTransaction,
  recordVendorTransaction,
  getTransactionsSummary,
  syncAllDataToDatabase
};
