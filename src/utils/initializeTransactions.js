/**
 * Initialize Transactions - Populate sample data for testing
 * Run this once to populate all dashboards with sample data
 */

export const initializeAllTransactions = (force = false) => {
  console.log('🚀 Initializing all transactions...');
  
  // Check if already initialized
  const initialized = localStorage.getItem('transactions_initialized');
  if (initialized && !force) {
    console.log('✅ Transactions already initialized');
    console.log('📊 Current data:', {
      users: JSON.parse(localStorage.getItem('global_users') || '[]').length,
      vendors: JSON.parse(localStorage.getItem('global_vendors') || '[]').length,
      orders: JSON.parse(localStorage.getItem('global_orders') || '[]').length,
      products: JSON.parse(localStorage.getItem('global_products') || '[]').length
    });
    return;
  }
  
  if (force) {
    console.log('🔄 Force reinitializing...');
  }

  // Sample Users (15 users)
  const sampleUsers = [
    {
      id: 1,
      name: 'Juan Dela Cruz',
      email: 'juan@customer.com',
      role: 'customer',
      status: 'active',
      orders: 3,
      createdAt: '2024-11-01T10:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@vendor.com',
      role: 'vendor',
      status: 'active',
      orders: 0,
      business_name: 'Local Crafts',
      business_description: 'Authentic handmade crafts',
      createdAt: '2024-11-05T10:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Admin User',
      email: 'admin@atondiya.com',
      role: 'admin',
      status: 'active',
      orders: 0,
      createdAt: '2024-10-01T10:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 4,
      name: 'Pedro Garcia',
      email: 'pedro@customer.com',
      role: 'customer',
      status: 'active',
      orders: 5,
      createdAt: '2024-11-10T10:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 5,
      name: 'Ana Reyes',
      email: 'ana@vendor.com',
      role: 'vendor',
      status: 'active',
      orders: 0,
      business_name: 'Artisan Goods',
      business_description: 'Quality indigenous products',
      createdAt: '2024-11-12T10:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 6,
      name: 'Carlos Mendoza',
      email: 'carlos@customer.com',
      role: 'customer',
      status: 'active',
      orders: 2,
      createdAt: '2024-11-15T10:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 7,
      name: 'Rosa Fernandez',
      email: 'rosa@customer.com',
      role: 'customer',
      status: 'active',
      orders: 4,
      createdAt: '2024-11-18T10:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 8,
      name: 'Miguel Torres',
      email: 'miguel@vendor.com',
      role: 'vendor',
      status: 'active',
      orders: 0,
      business_name: 'Native Treasures',
      business_description: 'Traditional Filipino crafts',
      createdAt: '2024-11-20T10:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 9,
      name: 'Elena Cruz',
      email: 'elena@customer.com',
      role: 'customer',
      status: 'active',
      orders: 1,
      createdAt: '2024-11-22T10:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 10,
      name: 'Roberto Aquino',
      email: 'roberto@customer.com',
      role: 'customer',
      status: 'active',
      orders: 6,
      createdAt: '2024-11-23T10:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 11,
      name: 'Linda Ramos',
      email: 'linda@vendor.com',
      role: 'vendor',
      status: 'active',
      orders: 0,
      business_name: 'Mindoro Handicrafts',
      business_description: 'Handwoven products from Mindoro',
      createdAt: '2024-11-24T10:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 12,
      name: 'Jose Bautista',
      email: 'jose@customer.com',
      role: 'customer',
      status: 'active',
      orders: 3,
      createdAt: '2024-11-25T10:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 13,
      name: 'Carmen Lopez',
      email: 'carmen@customer.com',
      role: 'customer',
      status: 'active',
      orders: 2,
      createdAt: '2024-11-26T10:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 14,
      name: 'Diego Morales',
      email: 'diego@vendor.com',
      role: 'vendor',
      status: 'active',
      orders: 0,
      business_name: 'Eco Crafts PH',
      business_description: 'Sustainable eco-friendly products',
      createdAt: '2024-11-27T10:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 15,
      name: 'Sofia Villanueva',
      email: 'sofia@customer.com',
      role: 'customer',
      status: 'active',
      orders: 4,
      createdAt: '2024-11-28T10:00:00Z',
      lastLogin: new Date().toISOString()
    }
  ];

  // Sample Vendors (5 vendors)
  const sampleVendors = [
    {
      id: 1,
      userId: 2,
      businessName: 'Local Crafts',
      businessDescription: 'Authentic handmade crafts from Mindoro',
      category: 'Handicrafts',
      phone: '09123456789',
      address: 'Bulalacao, Oriental Mindoro',
      status: 'active',
      createdAt: '2024-11-05T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      userId: 5,
      businessName: 'Artisan Goods',
      businessDescription: 'Quality indigenous products',
      category: 'Home Decor',
      phone: '09187654321',
      address: 'Bulalacao, Oriental Mindoro',
      status: 'active',
      createdAt: '2024-11-12T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 3,
      userId: 8,
      businessName: 'Native Treasures',
      businessDescription: 'Traditional Filipino crafts and textiles',
      category: 'Handicrafts',
      phone: '09198765432',
      address: 'Bulalacao, Oriental Mindoro',
      status: 'active',
      createdAt: '2024-11-20T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 4,
      userId: 11,
      businessName: 'Mindoro Handicrafts',
      businessDescription: 'Handwoven products from Mindoro',
      category: 'Textiles',
      phone: '09176543210',
      address: 'Bulalacao, Oriental Mindoro',
      status: 'active',
      createdAt: '2024-11-24T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 5,
      userId: 14,
      businessName: 'Eco Crafts PH',
      businessDescription: 'Sustainable eco-friendly products',
      category: 'Eco Products',
      phone: '09165432109',
      address: 'Bulalacao, Oriental Mindoro',
      status: 'active',
      createdAt: '2024-11-27T10:00:00Z',
      updatedAt: new Date().toISOString()
    }
  ];

  // Sample Products (15 products)
  const sampleProducts = [
    {
      id: 1,
      vendorId: 2,
      name: 'Handwoven Banig Mat',
      price: 850,
      stock: 15,
      sales: 45,
      status: 'active',
      category: 'Handicrafts',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop',
      description: 'Traditional handwoven mat made from natural materials',
      createdAt: '2024-11-05T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      vendorId: 2,
      name: 'Coconut Shell Crafts',
      price: 450,
      stock: 8,
      sales: 32,
      status: 'active',
      category: 'Home Decor',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop',
      description: 'Eco-friendly crafts made from coconut shells',
      createdAt: '2024-11-06T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 3,
      vendorId: 5,
      name: 'Bamboo Baskets',
      price: 650,
      stock: 12,
      sales: 28,
      status: 'active',
      category: 'Handicrafts',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=400&fit=crop',
      description: 'Handcrafted bamboo baskets for storage',
      createdAt: '2024-11-12T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 4,
      vendorId: 5,
      name: 'Organic Wild Honey',
      price: 350,
      stock: 20,
      sales: 56,
      status: 'active',
      category: 'Food Products',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=400&h=400&fit=crop',
      description: 'Pure wild honey from local forests',
      createdAt: '2024-11-13T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 5,
      vendorId: 8,
      name: 'Woven Rattan Furniture',
      price: 2500,
      stock: 5,
      sales: 12,
      status: 'active',
      category: 'Furniture',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
      description: 'Handcrafted rattan chair',
      createdAt: '2024-11-20T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 6,
      vendorId: 8,
      name: 'Traditional Buri Hat',
      price: 280,
      stock: 25,
      sales: 38,
      status: 'active',
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
      description: 'Handwoven buri hat for sun protection',
      createdAt: '2024-11-21T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 7,
      vendorId: 11,
      name: 'Abaca Woven Bag',
      price: 580,
      stock: 18,
      sales: 42,
      status: 'active',
      category: 'Bags',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
      description: 'Eco-friendly abaca fiber bag',
      createdAt: '2024-11-24T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 8,
      vendorId: 11,
      name: 'Handwoven Table Runner',
      price: 420,
      stock: 14,
      sales: 26,
      status: 'active',
      category: 'Home Decor',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop',
      description: 'Beautiful handwoven table runner',
      createdAt: '2024-11-25T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 9,
      vendorId: 14,
      name: 'Bamboo Utensil Set',
      price: 320,
      stock: 30,
      sales: 64,
      status: 'active',
      category: 'Kitchenware',
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop',
      description: 'Eco-friendly bamboo utensils',
      createdAt: '2024-11-27T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 10,
      vendorId: 14,
      name: 'Coconut Bowl Set',
      price: 450,
      stock: 22,
      sales: 35,
      status: 'active',
      category: 'Kitchenware',
      image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc768?w=400&h=400&fit=crop',
      description: 'Natural coconut shell bowls',
      createdAt: '2024-11-28T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 11,
      vendorId: 2,
      name: 'Woven Wall Decor',
      price: 680,
      stock: 10,
      sales: 18,
      status: 'active',
      category: 'Home Decor',
      image: 'https://images.unsplash.com/photo-1600857544200-b9f666a5e2d2?w=400&h=400&fit=crop',
      description: 'Handwoven wall hanging decoration',
      createdAt: '2024-11-07T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 12,
      vendorId: 5,
      name: 'Native Coffee Beans',
      price: 380,
      stock: 40,
      sales: 72,
      status: 'active',
      category: 'Food Products',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
      description: 'Locally grown arabica coffee beans',
      createdAt: '2024-11-14T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 13,
      vendorId: 8,
      name: 'Handmade Pottery Set',
      price: 950,
      stock: 8,
      sales: 15,
      status: 'active',
      category: 'Kitchenware',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop',
      description: 'Traditional clay pottery set',
      createdAt: '2024-11-22T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 14,
      vendorId: 11,
      name: 'Woven Placemats Set',
      price: 340,
      stock: 28,
      sales: 48,
      status: 'active',
      category: 'Home Decor',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
      description: 'Set of 6 handwoven placemats',
      createdAt: '2024-11-26T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 15,
      vendorId: 14,
      name: 'Eco-Friendly Soap Set',
      price: 280,
      stock: 35,
      sales: 58,
      status: 'active',
      category: 'Personal Care',
      image: 'https://images.unsplash.com/photo-1600857544200-b9f666a5e2d2?w=400&h=400&fit=crop',
      description: 'Natural handmade soap bars',
      createdAt: '2024-11-29T10:00:00Z',
      updatedAt: new Date().toISOString()
    }
  ];

  // Sample Orders (12 orders)
  const sampleOrders = [
    {
      id: 'ORD-1701234567890',
      userId: 1,
      userRole: 'customer',
      customerName: 'Juan Dela Cruz',
      customer: 'Juan Dela Cruz',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      dateTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      items: 2,
      products: [
        { id: 1, name: 'Handwoven Banig Mat', price: '850.00', quantity: 1 },
        { id: 2, name: 'Coconut Shell Crafts', price: '450.00', quantity: 1 }
      ],
      subtotal: '1300.00',
      shippingFee: '50.00',
      total: '1350.00',
      status: 'Delivered',
      paymentMethod: 'cod',
      shippingInfo: {
        fullName: 'Juan Dela Cruz',
        phone: '09123456789',
        address: 'Bulalacao, Oriental Mindoro',
        city: 'Bulalacao',
        province: 'Oriental Mindoro'
      },
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'ORD-1701234567891',
      userId: 4,
      userRole: 'customer',
      customerName: 'Pedro Garcia',
      customer: 'Pedro Garcia',
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      dateTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      items: 1,
      products: [
        { id: 3, name: 'Bamboo Baskets', price: '650.00', quantity: 1 }
      ],
      subtotal: '650.00',
      shippingFee: '50.00',
      total: '700.00',
      status: 'Delivered',
      paymentMethod: 'gcash',
      shippingInfo: {
        fullName: 'Pedro Garcia',
        phone: '09187654321',
        address: 'Bulalacao, Oriental Mindoro',
        city: 'Bulalacao',
        province: 'Oriental Mindoro'
      },
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'ORD-1701234567892',
      userId: 6,
      userRole: 'customer',
      customerName: 'Carlos Mendoza',
      customer: 'Carlos Mendoza',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      dateTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      items: 2,
      products: [
        { id: 4, name: 'Organic Wild Honey', price: '350.00', quantity: 2 },
        { id: 12, name: 'Native Coffee Beans', price: '380.00', quantity: 1 }
      ],
      subtotal: '1080.00',
      shippingFee: '50.00',
      total: '1130.00',
      status: 'Delivered',
      paymentMethod: 'cod',
      shippingInfo: {
        fullName: 'Carlos Mendoza',
        phone: '09123456780',
        address: 'Bulalacao, Oriental Mindoro',
        city: 'Bulalacao',
        province: 'Oriental Mindoro'
      },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'ORD-1701234567893',
      userId: 7,
      userRole: 'customer',
      customerName: 'Rosa Fernandez',
      customer: 'Rosa Fernandez',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      dateTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      items: 3,
      products: [
        { id: 7, name: 'Abaca Woven Bag', price: '580.00', quantity: 1 },
        { id: 8, name: 'Handwoven Table Runner', price: '420.00', quantity: 1 },
        { id: 14, name: 'Woven Placemats Set', price: '340.00', quantity: 1 }
      ],
      subtotal: '1340.00',
      shippingFee: '50.00',
      total: '1390.00',
      status: 'Shipped',
      paymentMethod: 'gcash',
      shippingInfo: {
        fullName: 'Rosa Fernandez',
        phone: '09123456781',
        address: 'Bulalacao, Oriental Mindoro',
        city: 'Bulalacao',
        province: 'Oriental Mindoro'
      },
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'ORD-1701234567894',
      userId: 9,
      userRole: 'customer',
      customerName: 'Elena Cruz',
      customer: 'Elena Cruz',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      dateTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      items: 2,
      products: [
        { id: 9, name: 'Bamboo Utensil Set', price: '320.00', quantity: 2 },
        { id: 10, name: 'Coconut Bowl Set', price: '450.00', quantity: 1 }
      ],
      subtotal: '1090.00',
      shippingFee: '50.00',
      total: '1140.00',
      status: 'Shipped',
      paymentMethod: 'cod',
      shippingInfo: {
        fullName: 'Elena Cruz',
        phone: '09123456782',
        address: 'Bulalacao, Oriental Mindoro',
        city: 'Bulalacao',
        province: 'Oriental Mindoro'
      },
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'ORD-1701234567895',
      userId: 10,
      userRole: 'customer',
      customerName: 'Roberto Aquino',
      customer: 'Roberto Aquino',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      dateTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      items: 1,
      products: [
        { id: 5, name: 'Woven Rattan Furniture', price: '2500.00', quantity: 1 }
      ],
      subtotal: '2500.00',
      shippingFee: '100.00',
      total: '2600.00',
      status: 'Processing',
      paymentMethod: 'gcash',
      shippingInfo: {
        fullName: 'Roberto Aquino',
        phone: '09123456783',
        address: 'Bulalacao, Oriental Mindoro',
        city: 'Bulalacao',
        province: 'Oriental Mindoro'
      },
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'ORD-1701234567896',
      userId: 12,
      userRole: 'customer',
      customerName: 'Jose Bautista',
      customer: 'Jose Bautista',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      dateTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      items: 3,
      products: [
        { id: 1, name: 'Handwoven Banig Mat', price: '850.00', quantity: 1 },
        { id: 6, name: 'Traditional Buri Hat', price: '280.00', quantity: 2 }
      ],
      subtotal: '1410.00',
      shippingFee: '50.00',
      total: '1460.00',
      status: 'Processing',
      paymentMethod: 'cod',
      shippingInfo: {
        fullName: 'Jose Bautista',
        phone: '09123456784',
        address: 'Bulalacao, Oriental Mindoro',
        city: 'Bulalacao',
        province: 'Oriental Mindoro'
      },
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'ORD-1701234567897',
      userId: 13,
      userRole: 'customer',
      customerName: 'Carmen Lopez',
      customer: 'Carmen Lopez',
      date: new Date().toLocaleDateString(),
      dateTime: new Date().toISOString(),
      items: 2,
      products: [
        { id: 11, name: 'Woven Wall Decor', price: '680.00', quantity: 1 },
        { id: 15, name: 'Eco-Friendly Soap Set', price: '280.00', quantity: 2 }
      ],
      subtotal: '1240.00',
      shippingFee: '50.00',
      total: '1290.00',
      status: 'Pending',
      paymentMethod: 'gcash',
      shippingInfo: {
        fullName: 'Carmen Lopez',
        phone: '09123456785',
        address: 'Bulalacao, Oriental Mindoro',
        city: 'Bulalacao',
        province: 'Oriental Mindoro'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'ORD-1701234567898',
      userId: 15,
      userRole: 'customer',
      customerName: 'Sofia Villanueva',
      customer: 'Sofia Villanueva',
      date: new Date().toLocaleDateString(),
      dateTime: new Date().toISOString(),
      items: 2,
      products: [
        { id: 13, name: 'Handmade Pottery Set', price: '950.00', quantity: 1 },
        { id: 10, name: 'Coconut Bowl Set', price: '450.00', quantity: 1 }
      ],
      subtotal: '1400.00',
      shippingFee: '50.00',
      total: '1450.00',
      status: 'Pending',
      paymentMethod: 'cod',
      shippingInfo: {
        fullName: 'Sofia Villanueva',
        phone: '09123456786',
        address: 'Bulalacao, Oriental Mindoro',
        city: 'Bulalacao',
        province: 'Oriental Mindoro'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'ORD-1701234567899',
      userId: 1,
      userRole: 'customer',
      customerName: 'Juan Dela Cruz',
      customer: 'Juan Dela Cruz',
      date: new Date().toLocaleDateString(),
      dateTime: new Date().toISOString(),
      items: 1,
      products: [
        { id: 12, name: 'Native Coffee Beans', price: '380.00', quantity: 3 }
      ],
      subtotal: '1140.00',
      shippingFee: '50.00',
      total: '1190.00',
      status: 'Pending',
      paymentMethod: 'cod',
      shippingInfo: {
        fullName: 'Juan Dela Cruz',
        phone: '09123456789',
        address: 'Bulalacao, Oriental Mindoro',
        city: 'Bulalacao',
        province: 'Oriental Mindoro'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'ORD-1701234567900',
      userId: 4,
      userRole: 'customer',
      customerName: 'Pedro Garcia',
      customer: 'Pedro Garcia',
      date: new Date().toLocaleDateString(),
      dateTime: new Date().toISOString(),
      items: 2,
      products: [
        { id: 7, name: 'Abaca Woven Bag', price: '580.00', quantity: 1 },
        { id: 9, name: 'Bamboo Utensil Set', price: '320.00', quantity: 1 }
      ],
      subtotal: '900.00',
      shippingFee: '50.00',
      total: '950.00',
      status: 'Pending',
      paymentMethod: 'gcash',
      shippingInfo: {
        fullName: 'Pedro Garcia',
        phone: '09187654321',
        address: 'Bulalacao, Oriental Mindoro',
        city: 'Bulalacao',
        province: 'Oriental Mindoro'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'ORD-1701234567901',
      userId: 10,
      userRole: 'customer',
      customerName: 'Roberto Aquino',
      customer: 'Roberto Aquino',
      date: new Date().toLocaleDateString(),
      dateTime: new Date().toISOString(),
      items: 3,
      products: [
        { id: 2, name: 'Coconut Shell Crafts', price: '450.00', quantity: 2 },
        { id: 6, name: 'Traditional Buri Hat', price: '280.00', quantity: 1 },
        { id: 15, name: 'Eco-Friendly Soap Set', price: '280.00', quantity: 1 }
      ],
      subtotal: '1460.00',
      shippingFee: '50.00',
      total: '1510.00',
      status: 'Pending',
      paymentMethod: 'cod',
      shippingInfo: {
        fullName: 'Roberto Aquino',
        phone: '09123456783',
        address: 'Bulalacao, Oriental Mindoro',
        city: 'Bulalacao',
        province: 'Oriental Mindoro'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // Save to localStorage
  localStorage.setItem('global_users', JSON.stringify(sampleUsers));
  localStorage.setItem('global_vendors', JSON.stringify(sampleVendors));
  localStorage.setItem('global_products', JSON.stringify(sampleProducts));
  localStorage.setItem('global_orders', JSON.stringify(sampleOrders));
  localStorage.setItem('transactions_initialized', 'true');
  localStorage.setItem('lastSyncTime', new Date().toISOString());

  console.log('✅ Sample data initialized:');
  console.log(`   - ${sampleUsers.length} users`);
  console.log(`   - ${sampleVendors.length} vendors`);
  console.log(`   - ${sampleProducts.length} products`);
  console.log(`   - ${sampleOrders.length} orders`);
  console.log('🎉 All dashboards are now populated with data!');

  return {
    users: sampleUsers.length,
    vendors: sampleVendors.length,
    products: sampleProducts.length,
    orders: sampleOrders.length
  };
};

// Clear all transaction data (for testing)
export const clearAllTransactions = () => {
  localStorage.removeItem('global_users');
  localStorage.removeItem('global_vendors');
  localStorage.removeItem('global_products');
  localStorage.removeItem('global_orders');
  localStorage.removeItem('transactions_initialized');
  localStorage.removeItem('lastSyncTime');
  console.log('🗑️ All transaction data cleared');
};

// Get current transaction stats
export const getTransactionStats = () => {
  const users = JSON.parse(localStorage.getItem('global_users') || '[]');
  const vendors = JSON.parse(localStorage.getItem('global_vendors') || '[]');
  const products = JSON.parse(localStorage.getItem('global_products') || '[]');
  const orders = JSON.parse(localStorage.getItem('global_orders') || '[]');
  
  const totalRevenue = orders.reduce((sum, order) => {
    return sum + parseFloat(order.total.replace(/,/g, ''));
  }, 0);

  return {
    users: users.length,
    vendors: vendors.length,
    products: products.length,
    orders: orders.length,
    revenue: totalRevenue,
    initialized: localStorage.getItem('transactions_initialized') === 'true'
  };
};

export default {
  initializeAllTransactions,
  clearAllTransactions,
  getTransactionStats
};
