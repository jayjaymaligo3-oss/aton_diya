import { getAllProducts } from './productData';

// Initialize sample data for testing the connected dashboards
export const initializeSampleData = () => {
  // Check if data already exists
  const existingProducts = localStorage.getItem('global_products');
  if (existingProducts) {
    console.log('Sample data already initialized');
    return;
  }

  // Sample Users
  const sampleUsers = [
    {
      id: 1,
      name: 'Juan Dela Cruz',
      email: 'juan@example.com',
      role: 'customer',
      phone: '09171234567',
      address: 'Manila, Philippines',
      createdAt: new Date('2024-01-15').toISOString()
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@example.com',
      role: 'customer',
      phone: '09181234567',
      address: 'Quezon City, Philippines',
      createdAt: new Date('2024-02-20').toISOString()
    },
    {
      id: 3,
      name: 'Jayson Williams',
      email: 'jayson@vendor.com',
      role: 'vendor',
      phone: '09191234567',
      businessName: 'Native Crafts PH',
      businessDescription: 'Authentic Filipino handicrafts',
      address: 'Cebu City, Philippines',
      createdAt: new Date('2024-01-10').toISOString()
    }
  ];

  // Sample Vendors
  const sampleVendors = [
    {
      id: 3,
      userId: 3,
      businessName: 'Native Crafts PH',
      businessDescription: 'Authentic Filipino handicrafts and indigenous products',
      category: 'Handicrafts',
      phone: '09191234567',
      address: 'Cebu City, Philippines',
      status: 'approved',
      createdAt: new Date('2024-01-10').toISOString(),
      approvedAt: new Date('2024-01-12').toISOString()
    }
  ];

  // Sample Products - Using enhanced product data with fallback images
  const sampleProducts = getAllProducts();

  // Sample Orders
  const sampleOrders = [
    {
      id: 1001,
      customerId: 1,
      customerName: 'Juan Dela Cruz',
      vendorId: 3,
      vendorName: 'Native Crafts PH',
      productId: 1,
      product: 'Handwoven Banig Mat',
      quantity: 2,
      price: 850,
      total: 1700,
      status: 'pending',
      date: new Date('2024-11-25').toISOString(),
      createdAt: new Date('2024-11-25').toISOString()
    },
    {
      id: 1002,
      customerId: 2,
      customerName: 'Maria Santos',
      vendorId: 3,
      vendorName: 'Native Crafts PH',
      productId: 2,
      product: 'Coconut Shell Crafts',
      quantity: 3,
      price: 450,
      total: 1350,
      status: 'processing',
      date: new Date('2024-11-24').toISOString(),
      createdAt: new Date('2024-11-24').toISOString()
    },
    {
      id: 1003,
      customerId: 1,
      customerName: 'Juan Dela Cruz',
      vendorId: 3,
      vendorName: 'Native Crafts PH',
      productId: 3,
      product: 'Bamboo Baskets',
      quantity: 1,
      price: 650,
      total: 650,
      status: 'shipped',
      date: new Date('2024-11-23').toISOString(),
      createdAt: new Date('2024-11-23').toISOString()
    },
    {
      id: 1004,
      customerId: 2,
      customerName: 'Maria Santos',
      vendorId: 3,
      vendorName: 'Native Crafts PH',
      productId: 4,
      product: 'Abaca Table Runner',
      quantity: 2,
      price: 550,
      total: 1100,
      status: 'delivered',
      date: new Date('2024-11-20').toISOString(),
      createdAt: new Date('2024-11-20').toISOString(),
      deliveredAt: new Date('2024-11-22').toISOString()
    }
  ];

  // Sample Notifications
  const sampleNotifications = [
    {
      id: 1,
      type: 'order',
      message: 'New order #1001 received',
      userId: 3,
      role: 'vendor',
      data: sampleOrders[0],
      priority: 'high',
      read: false,
      timestamp: new Date('2024-11-25T10:30:00').toISOString()
    },
    {
      id: 2,
      type: 'order',
      message: 'Your order #1003 has been shipped',
      userId: 1,
      role: 'customer',
      data: sampleOrders[2],
      read: false,
      timestamp: new Date('2024-11-23T14:20:00').toISOString()
    },
    {
      id: 3,
      type: 'product',
      message: 'Product "Bamboo Baskets" is running low on stock',
      userId: 3,
      role: 'vendor',
      data: sampleProducts[2],
      read: false,
      timestamp: new Date('2024-11-24T09:15:00').toISOString()
    },
    {
      id: 4,
      type: 'order',
      message: 'New order #1001 placed',
      role: 'admin',
      data: sampleOrders[0],
      read: false,
      timestamp: new Date('2024-11-25T10:30:00').toISOString()
    },
    {
      id: 5,
      type: 'vendor',
      message: 'New vendor application: Native Crafts PH',
      role: 'admin',
      data: sampleVendors[0],
      priority: 'high',
      read: true,
      timestamp: new Date('2024-01-10T08:00:00').toISOString()
    }
  ];

  // Save to localStorage
  localStorage.setItem('global_users', JSON.stringify(sampleUsers));
  localStorage.setItem('global_vendors', JSON.stringify(sampleVendors));
  localStorage.setItem('global_products', JSON.stringify(sampleProducts));
  localStorage.setItem('global_orders', JSON.stringify(sampleOrders));
  localStorage.setItem('global_notifications', JSON.stringify(sampleNotifications));

  console.log('✅ Sample data initialized successfully!');
  console.log('📦 Products:', sampleProducts.length);
  console.log('📋 Orders:', sampleOrders.length);
  console.log('👥 Users:', sampleUsers.length);
  console.log('🏪 Vendors:', sampleVendors.length);
  console.log('🔔 Notifications:', sampleNotifications.length);
};

// Clear all data (for testing)
export const clearAllData = () => {
  localStorage.removeItem('global_users');
  localStorage.removeItem('global_vendors');
  localStorage.removeItem('global_products');
  localStorage.removeItem('global_orders');
  localStorage.removeItem('global_notifications');
  console.log('🗑️ All sample data cleared');
};
