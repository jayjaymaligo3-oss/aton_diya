// Enhanced Product Data with Local Fallback Images
// Using placeholder images that work offline

export const productCategories = [
  'Handicrafts',
  'Textiles',
  'Home Decor',
  'Kitchenware',
  'Accessories',
  'Furniture',
  'Art & Paintings',
  'Jewelry',
  'Bags & Baskets',
  'Traditional Wear'
];

// Generate unique image for each product using Picsum Photos
export const getProductImage = (id, seed) => {
  // Using Picsum Photos with unique seed for each product
  return `https://picsum.photos/seed/${seed || id}/400/400`;
};

// Fallback placeholder image generator
export const getPlaceholderImage = (category, id) => {
  const colors = {
    'Handicrafts': '8B4513',
    'Textiles': 'DC143C',
    'Home Decor': 'FF8C00',
    'Kitchenware': '4682B4',
    'Accessories': 'DA70D6',
    'Furniture': '8B4513',
    'Art & Paintings': 'FF1493',
    'Jewelry': 'FFD700',
    'Bags & Baskets': '228B22',
    'Traditional Wear': '9370DB'
  };
  
  const color = colors[category] || '808080';
  return `https://via.placeholder.com/400x400/${color}/FFFFFF?text=${encodeURIComponent(category)}`;
};

// Vendor/Shop names
export const vendors = {
  1: 'Lancelot Crafts',
  2: 'Maria\'s Handmade',
  3: 'Indigenous Crafts Store',
  4: 'Bulalacao Artisans',
  5: 'Local Weavers Collective'
};

export const enhancedProducts = [
  // Handicrafts
  {
    id: 1,
    vendorId: 3,
    vendor: vendors[3],
    shopName: vendors[3],
    name: 'Handwoven Banig Mat',
    description: 'Traditional handwoven mat made from natural pandan leaves. Perfect for home decoration or as a sleeping mat. Eco-friendly and durable.',
    price: 850,
    stock: 15,
    sales: 45,
    status: 'active',
    category: 'Handicrafts',
    image: getProductImage(1, 'banig-mat-101'),
    fallbackImage: getPlaceholderImage('Handicrafts', 1),
    featured: true,
    rating: 4.8,
    reviews: 23,
    createdAt: new Date('2024-02-01').toISOString()
  },
  {
    id: 2,
    vendorId: 3,
    vendor: vendors[3],
    shopName: vendors[3],
    name: 'Coconut Shell Bowl Set',
    description: 'Eco-friendly bowl set made from natural coconut shells. Set of 4 bowls perfect for serving salads, snacks, or decorative purposes.',
    price: 450,
    stock: 25,
    sales: 32,
    status: 'active',
    category: 'Kitchenware',
    image: getProductImage(2, 'coconut-bowl-202'),
    fallbackImage: getPlaceholderImage('Kitchenware', 2),
    featured: true,
    rating: 4.6,
    reviews: 18,
    createdAt: new Date('2024-02-05').toISOString()
  },
  {
    id: 3,
    vendorId: 1,
    vendor: vendors[1],
    shopName: vendors[1],
    name: 'Bamboo Storage Basket',
    description: 'Handcrafted bamboo basket with lid. Perfect for storing fruits, vegetables, or household items. Natural and sustainable.',
    price: 650,
    stock: 12,
    sales: 28,
    status: 'active',
    category: 'Bags & Baskets',
    image: getProductImage(3, 'bamboo-basket-303'),
    fallbackImage: getPlaceholderImage('Bags & Baskets', 3),
    rating: 4.7,
    reviews: 15,
    createdAt: new Date('2024-02-10').toISOString()
  },
  {
    id: 4,
    vendorId: 2,
    vendor: vendors[2],
    shopName: vendors[2],
    name: 'Abaca Table Runner',
    description: 'Beautiful table runner made from abaca fiber. Adds natural elegance to your dining table. Hand-woven by local artisans.',
    price: 550,
    stock: 20,
    sales: 18,
    status: 'active',
    category: 'Textiles',
    image: getProductImage(4, 'table-runner-404'),
    fallbackImage: getPlaceholderImage('Textiles', 4),
    featured: true,
    rating: 4.9,
    reviews: 12,
    createdAt: new Date('2024-02-15').toISOString()
  },
  
  // New Products
  {
    id: 5,
    vendorId: 4,
    vendor: vendors[4],
    shopName: vendors[4],
    name: 'Rattan Wall Mirror',
    description: 'Stylish wall mirror with natural rattan frame. Adds bohemian charm to any room. Handcrafted with attention to detail.',
    price: 1200,
    stock: 8,
    sales: 15,
    status: 'active',
    category: 'Home Decor',
    image: getProductImage(5, 'rattan-mirror-505'),
    fallbackImage: getPlaceholderImage('Home Decor', 5),
    featured: true,
    rating: 4.8,
    reviews: 9,
    createdAt: new Date('2024-03-01').toISOString()
  },
  {
    id: 6,
    vendorId: 3,
    name: 'Capiz Shell Wind Chime',
    description: 'Beautiful wind chime made from natural capiz shells. Creates soothing sounds and adds visual appeal to your garden or patio.',
    price: 380,
    stock: 30,
    sales: 42,
    status: 'active',
    category: 'Home Decor',
    image: getProductImage(6, 'wind-chime-606'),
    fallbackImage: getPlaceholderImage('Home Decor', 6),
    rating: 4.5,
    reviews: 21,
    createdAt: new Date('2024-03-05').toISOString()
  },
  {
    id: 7,
    vendorId: 3,
    name: 'Wooden Salad Bowl',
    description: 'Large wooden salad bowl carved from a single piece of acacia wood. Food-safe finish, perfect for serving salads and fruits.',
    price: 890,
    stock: 10,
    sales: 24,
    status: 'active',
    category: 'Kitchenware',
    image: getProductImage(7, 'wooden-bowl-707'),
    fallbackImage: getPlaceholderImage('Kitchenware', 7),
    rating: 4.7,
    reviews: 14,
    createdAt: new Date('2024-03-10').toISOString()
  },
  {
    id: 8,
    vendorId: 3,
    name: 'Handwoven Tote Bag',
    description: 'Eco-friendly tote bag made from natural abaca fiber. Spacious and durable, perfect for shopping or beach trips.',
    price: 420,
    stock: 18,
    sales: 36,
    status: 'active',
    category: 'Bags & Baskets',
    image: getProductImage(8, 'tote-bag-808'),
    fallbackImage: getPlaceholderImage('Bags & Baskets', 8),
    featured: true,
    rating: 4.6,
    reviews: 19,
    createdAt: new Date('2024-03-15').toISOString()
  },
  {
    id: 9,
    vendorId: 3,
    name: 'Bamboo Cutlery Set',
    description: 'Eco-friendly bamboo cutlery set with carrying case. Includes fork, spoon, knife, chopsticks, and straw. Perfect for travel.',
    price: 280,
    stock: 40,
    sales: 58,
    status: 'active',
    category: 'Kitchenware',
    image: getProductImage(9, 'bamboo-cutlery-909'),
    fallbackImage: getPlaceholderImage('Kitchenware', 9),
    featured: true,
    rating: 4.9,
    reviews: 31,
    createdAt: new Date('2024-03-20').toISOString()
  },
  {
    id: 10,
    vendorId: 3,
    name: 'Woven Placemats Set',
    description: 'Set of 6 handwoven placemats made from natural water hyacinth. Heat-resistant and easy to clean. Adds rustic charm to dining.',
    price: 520,
    stock: 22,
    sales: 27,
    status: 'active',
    category: 'Textiles',
    image: getProductImage(10, 'placemats-1010'),
    fallbackImage: getPlaceholderImage('Textiles', 10),
    rating: 4.7,
    reviews: 16,
    createdAt: new Date('2024-03-25').toISOString()
  },
  {
    id: 11,
    vendorId: 3,
    name: 'Shell Necklace',
    description: 'Elegant necklace made from natural shells and beads. Handcrafted by local artisans. Perfect for beach-themed outfits.',
    price: 320,
    stock: 35,
    sales: 44,
    status: 'active',
    category: 'Jewelry',
    image: getProductImage(11, 'shell-necklace-1111'),
    fallbackImage: getPlaceholderImage('Jewelry', 11),
    rating: 4.5,
    reviews: 22,
    createdAt: new Date('2024-04-01').toISOString()
  },
  {
    id: 12,
    vendorId: 3,
    name: 'Rattan Pendant Lamp',
    description: 'Beautiful pendant lamp with natural rattan shade. Creates warm ambient lighting. Perfect for living rooms or dining areas.',
    price: 1450,
    stock: 6,
    sales: 11,
    status: 'active',
    category: 'Home Decor',
    image: getProductImage(12, 'pendant-lamp-1212'),
    fallbackImage: getPlaceholderImage('Home Decor', 12),
    featured: true,
    rating: 4.9,
    reviews: 8,
    createdAt: new Date('2024-04-05').toISOString()
  },
  {
    id: 13,
    vendorId: 3,
    name: 'Bamboo Serving Tray',
    description: 'Elegant bamboo serving tray with handles. Perfect for breakfast in bed or serving drinks. Natural finish with smooth edges.',
    price: 580,
    stock: 14,
    sales: 19,
    status: 'active',
    category: 'Kitchenware',
    image: getProductImage(13, 'serving-tray-1313'),
    fallbackImage: getPlaceholderImage('Kitchenware', 13),
    rating: 4.6,
    reviews: 11,
    createdAt: new Date('2024-04-10').toISOString()
  },
  {
    id: 14,
    vendorId: 3,
    name: 'Woven Wall Hanging',
    description: 'Macrame wall hanging made from natural cotton rope. Bohemian style decoration perfect for bedrooms or living spaces.',
    price: 720,
    stock: 9,
    sales: 16,
    status: 'active',
    category: 'Art & Paintings',
    image: getProductImage(14, 'wall-hanging-1414'),
    fallbackImage: getPlaceholderImage('Art & Paintings', 14),
    rating: 4.8,
    reviews: 10,
    createdAt: new Date('2024-04-15').toISOString()
  },
  {
    id: 15,
    vendorId: 3,
    name: 'Coconut Shell Planter',
    description: 'Hanging planter made from coconut shell. Perfect for small succulents or air plants. Includes jute rope for hanging.',
    price: 180,
    stock: 50,
    sales: 67,
    status: 'active',
    category: 'Home Decor',
    image: getProductImage(15, 'coconut-planter-1515'),
    fallbackImage: getPlaceholderImage('Home Decor', 15),
    featured: true,
    rating: 4.7,
    reviews: 34,
    createdAt: new Date('2024-04-20').toISOString()
  },
  {
    id: 16,
    vendorId: 3,
    name: 'Bamboo Laptop Stand',
    description: 'Ergonomic laptop stand made from sustainable bamboo. Adjustable height, improves posture. Perfect for work from home setup.',
    price: 950,
    stock: 12,
    sales: 22,
    status: 'active',
    category: 'Furniture',
    image: getProductImage(16, 'laptop-stand-1616'),
    fallbackImage: getPlaceholderImage('Furniture', 16),
    rating: 4.8,
    reviews: 13,
    createdAt: new Date('2024-04-25').toISOString()
  },
  {
    id: 17,
    vendorId: 3,
    name: 'Woven Coasters Set',
    description: 'Set of 8 handwoven coasters made from water hyacinth. Protects surfaces from heat and moisture. Natural and eco-friendly.',
    price: 220,
    stock: 45,
    sales: 53,
    status: 'active',
    category: 'Kitchenware',
    image: getProductImage(17, 'coasters-1717'),
    fallbackImage: getPlaceholderImage('Kitchenware', 17),
    rating: 4.6,
    reviews: 27,
    createdAt: new Date('2024-05-01').toISOString()
  },
  {
    id: 18,
    vendorId: 3,
    name: 'Rattan Storage Basket',
    description: 'Large rattan storage basket with handles. Perfect for organizing toys, blankets, or laundry. Sturdy and stylish.',
    price: 780,
    stock: 11,
    sales: 18,
    status: 'active',
    category: 'Bags & Baskets',
    image: getProductImage(18, 'storage-basket-1818'),
    fallbackImage: getPlaceholderImage('Bags & Baskets', 18),
    rating: 4.7,
    reviews: 12,
    createdAt: new Date('2024-05-05').toISOString()
  },
  {
    id: 19,
    vendorId: 3,
    name: 'Bamboo Phone Stand',
    description: 'Minimalist phone stand made from bamboo. Holds phone at perfect viewing angle. Compatible with all smartphone sizes.',
    price: 150,
    stock: 60,
    sales: 78,
    status: 'active',
    category: 'Accessories',
    image: getProductImage(19, 'phone-stand-1919'),
    fallbackImage: getPlaceholderImage('Accessories', 19),
    featured: true,
    rating: 4.5,
    reviews: 41,
    createdAt: new Date('2024-05-10').toISOString()
  },
  {
    id: 20,
    vendorId: 3,
    name: 'Handwoven Table Mat',
    description: 'Individual table mat handwoven from natural fibers. Heat-resistant and durable. Set of 4 pieces. Perfect for daily use.',
    price: 380,
    stock: 28,
    sales: 31,
    status: 'active',
    category: 'Textiles',
    image: getProductImage(20, 'table-mat-2020'),
    fallbackImage: getPlaceholderImage('Textiles', 20),
    rating: 4.6,
    reviews: 18,
    createdAt: new Date('2024-05-15').toISOString()
  }
];

// Helper function to get product with fallback image and vendor info
export const getProductWithImage = (product) => {
  const vendorName = vendors[product.vendorId] || 'Local Artisan';
  return {
    ...product,
    image: product.fallbackImage, // Use fallback by default for offline support
    vendor: product.vendor || vendorName,
    shopName: product.shopName || vendorName
  };
};

// Get all products with fallback images
export const getAllProducts = () => {
  return enhancedProducts.map(getProductWithImage);
};

// Get featured products
export const getFeaturedProducts = () => {
  return enhancedProducts
    .filter(p => p.featured)
    .map(getProductWithImage);
};

// Get products by category
export const getProductsByCategory = (category) => {
  return enhancedProducts
    .filter(p => p.category === category)
    .map(getProductWithImage);
};

// Get product by ID
export const getProductById = (id) => {
  const product = enhancedProducts.find(p => p.id === id);
  return product ? getProductWithImage(product) : null;
};
