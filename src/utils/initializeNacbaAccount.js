// Initialize NACBA test account with sample data
export const initializeNacbaAccount = () => {
  const nacbaAccount = {
    id: 919,
    name: 'NACBA Vendor',
    email: 'nacba@gmail.com',
    password: 'nacba123456789',
    role: 'vendor',
    vendor_status: 'approved',
    status: 'active',
    business_name: 'NACBA Indigenous Crafts',
    business_description: 'Quality handmade indigenous products from local artisans in Oriental Mindoro',
    category: 'Handicrafts',
    phone: '+63 917 123 4567',
    address: 'Bulalacao, Oriental Mindoro',
    orders: 12,
    createdAt: new Date('2024-11-15').toISOString()
  };

  // Add to registered users
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const existingIndex = registeredUsers.findIndex(u => u.email === 'nacba@gmail.com');
  
  if (existingIndex >= 0) {
    registeredUsers[existingIndex] = nacbaAccount;
  } else {
    registeredUsers.push(nacbaAccount);
  }
  
  localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

  // Add to global users
  const globalUsers = JSON.parse(localStorage.getItem('global_users') || '[]');
  const globalIndex = globalUsers.findIndex(u => u.email === 'nacba@gmail.com');
  
  if (globalIndex >= 0) {
    globalUsers[globalIndex] = { ...globalUsers[globalIndex], ...nacbaAccount };
  } else {
    globalUsers.push(nacbaAccount);
  }
  
  localStorage.setItem('global_users', JSON.stringify(globalUsers));

  // Initialize sample products for NACBA vendor
  const sampleProducts = [
    {
      id: 1001,
      name: 'Handwoven Banig Mat',
      price: 850,
      stock: 25,
      sales: 45,
      status: 'active',
      category: 'Handicrafts',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop',
      description: 'Traditional handwoven sleeping mat made from natural pandan leaves',
      createdAt: new Date('2024-11-15').toISOString()
    },
    {
      id: 1002,
      name: 'Bamboo Basket Set',
      price: 650,
      stock: 18,
      sales: 32,
      status: 'active',
      category: 'Home Decor',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
      description: 'Set of 3 handcrafted bamboo baskets for storage and decoration',
      createdAt: new Date('2024-11-16').toISOString()
    },
    {
      id: 1003,
      name: 'Coconut Shell Bowl',
      price: 380,
      stock: 30,
      sales: 28,
      status: 'active',
      category: 'Home Decor',
      image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc768?w=400&h=400&fit=crop',
      description: 'Eco-friendly bowl made from polished coconut shells',
      createdAt: new Date('2024-11-17').toISOString()
    },
    {
      id: 1004,
      name: 'Organic Wild Honey',
      price: 450,
      stock: 15,
      sales: 52,
      status: 'active',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=400&h=400&fit=crop',
      description: 'Pure wild honey harvested from local forests',
      createdAt: new Date('2024-11-18').toISOString()
    },
    {
      id: 1005,
      name: 'Rattan Handbag',
      price: 720,
      stock: 12,
      sales: 18,
      status: 'active',
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
      description: 'Stylish handwoven rattan bag perfect for any occasion',
      createdAt: new Date('2024-11-19').toISOString()
    }
  ];

  localStorage.setItem('vendor_products_919', JSON.stringify(sampleProducts));

  // Initialize sample orders for NACBA vendor
  const sampleOrders = [
    {
      id: 'ORD-NACBA-001',
      customer: 'Maria Santos',
      product: 'Handwoven Banig Mat',
      quantity: 2,
      total: 1700,
      status: 'delivered',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      dateTime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'ORD-NACBA-002',
      customer: 'Juan Dela Cruz',
      product: 'Bamboo Basket Set',
      quantity: 1,
      total: 650,
      status: 'shipped',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      dateTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'ORD-NACBA-003',
      customer: 'Ana Reyes',
      product: 'Organic Wild Honey',
      quantity: 3,
      total: 1350,
      status: 'processing',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      dateTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'ORD-NACBA-004',
      customer: 'Pedro Garcia',
      product: 'Rattan Handbag',
      quantity: 1,
      total: 720,
      status: 'pending',
      date: new Date().toLocaleDateString(),
      dateTime: new Date().toISOString()
    }
  ];

  localStorage.setItem('vendor_orders_919', JSON.stringify(sampleOrders));

  // Initialize vendor profile
  const vendorProfile = {
    businessName: 'NACBA Indigenous Crafts',
    description: 'Quality handmade indigenous products from local artisans in Oriental Mindoro',
    category: 'Handicrafts',
    phone: '+63 917 123 4567',
    address: 'Bulalacao, Oriental Mindoro',
    image: null
  };

  localStorage.setItem('vendor_profile_919', JSON.stringify(vendorProfile));

  console.log('✅ NACBA test account initialized with sample data');
};

// Auto-initialize on first load
if (typeof window !== 'undefined') {
  // Check if already initialized
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const nacbaExists = registeredUsers.find(u => u.email === 'nacba@gmail.com');
  
  if (!nacbaExists) {
    initializeNacbaAccount();
  }
}
