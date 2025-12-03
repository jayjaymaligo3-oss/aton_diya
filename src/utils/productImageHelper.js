// Helper functions for product image management

/**
 * Check if localStorage has products with images
 */
export const checkProductImages = (userId) => {
  const key = `vendor_products_${userId}`;
  const data = localStorage.getItem(key);
  
  if (!data) {
    console.log('No products found in localStorage');
    return { hasProducts: false, productsWithImages: 0, totalProducts: 0 };
  }
  
  try {
    const products = JSON.parse(data);
    const productsWithImages = products.filter(p => p.image && p.image.length > 0).length;
    
    console.log(`Total products: ${products.length}`);
    console.log(`Products with images: ${productsWithImages}`);
    
    return {
      hasProducts: true,
      productsWithImages,
      totalProducts: products.length,
      products
    };
  } catch (error) {
    console.error('Error parsing products:', error);
    return { hasProducts: false, productsWithImages: 0, totalProducts: 0 };
  }
};

/**
 * Add default images to products that don't have one
 */
export const ensureProductImages = (userId) => {
  const key = `vendor_products_${userId}`;
  const data = localStorage.getItem(key);
  
  if (!data) return false;
  
  try {
    const products = JSON.parse(data);
    const defaultImages = [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop'
    ];
    
    const updatedProducts = products.map((p, index) => ({
      ...p,
      image: p.image || defaultImages[index % defaultImages.length]
    }));
    
    localStorage.setItem(key, JSON.stringify(updatedProducts));
    console.log('✅ Product images updated');
    return true;
  } catch (error) {
    console.error('Error updating product images:', error);
    return false;
  }
};

/**
 * Initialize sample products with images
 */
export const initializeSampleProducts = (userId) => {
  const key = `vendor_products_${userId}`;
  
  const sampleProducts = [
    { 
      id: Date.now() + 1, 
      name: 'Handwoven Banig Mat', 
      price: 850, 
      stock: 15, 
      sales: 45, 
      status: 'active', 
      category: 'Handicrafts', 
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop',
      description: 'Traditional handwoven mat made from natural materials'
    },
    { 
      id: Date.now() + 2, 
      name: 'Coconut Shell Crafts', 
      price: 450, 
      stock: 8, 
      sales: 32, 
      status: 'active', 
      category: 'Home Decor', 
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop',
      description: 'Eco-friendly crafts made from coconut shells'
    },
    { 
      id: Date.now() + 3, 
      name: 'Bamboo Baskets', 
      price: 650, 
      stock: 12, 
      sales: 28, 
      status: 'active', 
      category: 'Handicrafts', 
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=400&fit=crop',
      description: 'Handcrafted bamboo baskets for storage'
    },
    { 
      id: Date.now() + 4, 
      name: 'Abaca Table Runner', 
      price: 550, 
      stock: 20, 
      sales: 18, 
      status: 'active', 
      category: 'Textiles', 
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop',
      description: 'Beautiful table runner made from abaca fiber'
    }
  ];
  
  localStorage.setItem(key, JSON.stringify(sampleProducts));
  console.log('✅ Sample products initialized with images');
  return sampleProducts;
};

/**
 * Clear all product data (for testing)
 */
export const clearProductData = (userId) => {
  const key = `vendor_products_${userId}`;
  localStorage.removeItem(key);
  console.log('🗑️ Product data cleared');
};

/**
 * Export products to JSON file
 */
export const exportProducts = (userId) => {
  const key = `vendor_products_${userId}`;
  const data = localStorage.getItem(key);
  
  if (!data) {
    console.log('No products to export');
    return;
  }
  
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `products_${userId}_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  console.log('✅ Products exported');
};

// Make functions available globally for debugging
if (typeof window !== 'undefined') {
  window.productImageHelper = {
    check: checkProductImages,
    ensure: ensureProductImages,
    init: initializeSampleProducts,
    clear: clearProductData,
    export: exportProducts
  };
  
  console.log('🔧 Product Image Helper loaded. Use window.productImageHelper in console');
}
