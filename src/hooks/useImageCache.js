import { useState, useEffect } from 'react';
import { 
  cacheAllProductImages, 
  getCacheStats, 
  clearImageCache,
  getCachedImage 
} from '../utils/imageCache';

export const useImageCache = (products = []) => {
  const [caching, setCaching] = useState(false);
  const [cacheStats, setCacheStats] = useState(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  // Load cache stats on mount
  useEffect(() => {
    updateStats();
  }, []);

  // Auto-cache products when they change
  useEffect(() => {
    if (products.length > 0 && !caching) {
      autoCacheProducts();
    }
  }, [products]);

  const updateStats = () => {
    const stats = getCacheStats();
    setCacheStats(stats);
    return stats;
  };

  const autoCacheProducts = async () => {
    // Only cache if not already cached and has valid image URL
    const uncached = products.filter(p => p.image && p.image !== 'undefined' && !getCachedImage(p.id));
    
    if (uncached.length === 0) {
      return;
    }

    setCaching(true);
    setProgress({ current: 0, total: uncached.length });

    try {
      let cached = 0;
      for (const product of uncached) {
        // Cache in background, don't block UI
        setTimeout(async () => {
          try {
            const { cacheImage } = await import('../utils/imageCache');
            await cacheImage(product.image, product.id);
            cached++;
            setProgress({ current: cached, total: uncached.length });
          } catch (err) {
            console.warn('Failed to cache:', product.name);
          }
        }, cached * 200); // Stagger requests
      }
    } finally {
      setTimeout(() => {
        setCaching(false);
        updateStats();
      }, uncached.length * 200 + 1000);
    }
  };

  const cacheProducts = async (productsToCache = products) => {
    setCaching(true);
    setProgress({ current: 0, total: productsToCache.length });

    try {
      const result = await cacheAllProductImages(productsToCache);
      updateStats();
      return result;
    } finally {
      setCaching(false);
    }
  };

  const clearCache = () => {
    const cleared = clearImageCache();
    updateStats();
    return cleared;
  };

  const isCached = (productId) => {
    return getCachedImage(productId) !== null;
  };

  return {
    caching,
    cacheStats,
    progress,
    cacheProducts,
    clearCache,
    updateStats,
    isCached
  };
};
