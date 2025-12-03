// Image Cache System for Offline Support
// Stores images as base64 in localStorage

const IMAGE_CACHE_PREFIX = 'img_cache_';
const CACHE_EXPIRY_DAYS = 7;

// Convert image URL to base64
export const urlToBase64 = async (url) => {
  // Validate URL
  if (!url || url === 'undefined' || url === 'null') {
    console.warn('Invalid URL provided to urlToBase64:', url);
    return null;
  }
  
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

// Save image to cache
export const cacheImage = async (url, productId) => {
  // Validate inputs
  if (!url || !productId || url === 'undefined' || url === 'null') {
    return null;
  }
  
  try {
    const base64 = await urlToBase64(url);
    if (base64) {
      const cacheData = {
        data: base64,
        timestamp: Date.now(),
        url: url
      };
      localStorage.setItem(`${IMAGE_CACHE_PREFIX}${productId}`, JSON.stringify(cacheData));
      return base64;
    }
  } catch (error) {
    console.error('Error caching image:', error);
  }
  return null;
};

// Get cached image
export const getCachedImage = (productId) => {
  try {
    const cached = localStorage.getItem(`${IMAGE_CACHE_PREFIX}${productId}`);
    if (cached) {
      const cacheData = JSON.parse(cached);
      
      // Check if cache is expired
      const daysSinceCache = (Date.now() - cacheData.timestamp) / (1000 * 60 * 60 * 24);
      if (daysSinceCache < CACHE_EXPIRY_DAYS) {
        return cacheData.data;
      } else {
        // Remove expired cache
        localStorage.removeItem(`${IMAGE_CACHE_PREFIX}${productId}`);
      }
    }
  } catch (error) {
    console.error('Error getting cached image:', error);
  }
  return null;
};

// Cache all product images
export const cacheAllProductImages = async (products) => {
  console.log('🖼️ Starting to cache product images...');
  let cached = 0;
  let failed = 0;
  
  for (const product of products) {
    try {
      const existing = getCachedImage(product.id);
      if (!existing) {
        const result = await cacheImage(product.image, product.id);
        if (result) {
          cached++;
          console.log(`✅ Cached: ${product.name}`);
        } else {
          failed++;
        }
        // Small delay to avoid overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      failed++;
      console.error(`❌ Failed to cache ${product.name}:`, error);
    }
  }
  
  console.log(`✅ Image caching complete! Cached: ${cached}, Failed: ${failed}`);
  return { cached, failed };
};

// Clear all cached images
export const clearImageCache = () => {
  const keys = Object.keys(localStorage);
  let cleared = 0;
  
  keys.forEach(key => {
    if (key.startsWith(IMAGE_CACHE_PREFIX)) {
      localStorage.removeItem(key);
      cleared++;
    }
  });
  
  console.log(`🗑️ Cleared ${cleared} cached images`);
  return cleared;
};

// Get cache statistics
export const getCacheStats = () => {
  const keys = Object.keys(localStorage);
  const cacheKeys = keys.filter(key => key.startsWith(IMAGE_CACHE_PREFIX));
  
  let totalSize = 0;
  const images = [];
  
  cacheKeys.forEach(key => {
    const data = localStorage.getItem(key);
    if (data) {
      totalSize += data.length;
      try {
        const parsed = JSON.parse(data);
        images.push({
          id: key.replace(IMAGE_CACHE_PREFIX, ''),
          size: data.length,
          timestamp: parsed.timestamp,
          url: parsed.url
        });
      } catch (e) {
        // Invalid cache entry
      }
    }
  });
  
  return {
    count: cacheKeys.length,
    totalSize: totalSize,
    totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
    images: images
  };
};

// Check if image is cached
export const isImageCached = (productId) => {
  return getCachedImage(productId) !== null;
};

// Preload and cache images for a list of products
export const preloadProductImages = async (products, onProgress) => {
  const total = products.length;
  let completed = 0;
  
  for (const product of products) {
    const cached = getCachedImage(product.id);
    if (!cached) {
      await cacheImage(product.image, product.id);
    }
    completed++;
    if (onProgress) {
      onProgress(completed, total);
    }
  }
};

// Get image with fallback to cache
export const getImageWithCache = async (url, productId, fallbackUrl) => {
  // Try to get from cache first
  const cached = getCachedImage(productId);
  if (cached) {
    return cached;
  }
  
  // Try to load from URL
  try {
    const base64 = await urlToBase64(url);
    if (base64) {
      // Cache it for next time
      cacheImage(url, productId);
      return base64;
    }
  } catch (error) {
    console.error('Error loading image:', error);
  }
  
  // Return fallback URL if everything fails
  return fallbackUrl || url;
};
