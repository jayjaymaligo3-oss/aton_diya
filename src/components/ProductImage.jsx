import { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { getCachedImage, cacheImage } from '../utils/imageCache';

const ProductImage = ({ 
  src, 
  alt, 
  fallback, 
  productId,
  className = '',
  containerClassName = '',
  showPlaceholder = true,
  enableCache = true
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    loadImage();
  }, [src, productId, enableCache]);

  const loadImage = async () => {
    if (!enableCache || !productId) {
      setImageSrc(src);
      return;
    }

    // Try to get from cache first
    const cached = getCachedImage(productId);
    if (cached) {
      setImageSrc(cached);
      setImageLoading(false);
      return;
    }

    // Use original source and cache it in background
    setImageSrc(src);
    
    // Cache image in background (don't wait)
    if (src && !src.startsWith('data:')) {
      cacheImage(src, productId).catch(err => {
        console.warn('Failed to cache image:', err);
      });
    }
  };

  const handleImageError = () => {
    // Try fallback
    if (fallback && imageSrc !== fallback) {
      setImageSrc(fallback);
    } else {
      setImageError(true);
    }
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Loading skeleton */}
      {imageLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}

      {/* Image */}
      {imageSrc && !imageError ? (
        <img
          src={imageSrc}
          alt={alt}
          className={`${className} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      ) : showPlaceholder ? (
        // Fallback placeholder
        <div className={`${className} bg-gradient-to-br from-forest-green/10 to-dawn-orange/10 flex items-center justify-center`}>
          <div className="text-center">
            <Package className="w-12 h-12 mx-auto text-forest-green/30 mb-2" />
            <p className="text-xs text-gray-400 font-medium">Product Image</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductImage;
