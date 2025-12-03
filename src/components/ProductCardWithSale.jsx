import { motion } from 'framer-motion';
import { ShoppingCart, Heart, TrendingDown } from 'lucide-react';
import { getSalePrice, formatPrice, getCurrentSale } from '../utils/salesCalendar';

const ProductCardWithSale = ({ product, onAddToCart, onAddToWishlist }) => {
  const saleInfo = getSalePrice(product);
  const currentSale = getCurrentSale();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="basket-card overflow-hidden group relative"
    >
      {/* Sale Badge */}
      {saleInfo.hasDiscount && (
        <div className="absolute top-3 left-3 z-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className={`${currentSale.color} text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg flex items-center gap-1`}
          >
            <TrendingDown className="w-4 h-4" />
            {saleInfo.discountPercent}% OFF
          </motion.div>
        </div>
      )}

      {/* Sale Name Badge */}
      {saleInfo.hasDiscount && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg shadow-lg text-xs font-semibold text-gray-800 flex items-center gap-1">
            <span>{saleInfo.saleEmoji}</span>
            <span>{saleInfo.saleName}</span>
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-coconut-tan/20">
        <img
          src={product.image || 'https://via.placeholder.com/400x300?text=Product'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAddToCart(product)}
            className="bg-white text-forest-green p-3 rounded-full shadow-lg hover:bg-dawn-orange hover:text-white transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAddToWishlist(product)}
            className="bg-white text-forest-green p-3 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors"
          >
            <Heart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-forest-green mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {product.category && (
          <p className="text-xs text-gray-500 mb-2">{product.category}</p>
        )}

        {/* Price Section */}
        <div className="space-y-1">
          {saleInfo.hasDiscount ? (
            <>
              {/* Original Price (crossed out) */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through text-sm">
                  {formatPrice(saleInfo.originalPrice)}
                </span>
                <span className="text-xs text-red-600 font-semibold">
                  Save {formatPrice(saleInfo.savings)}
                </span>
              </div>
              
              {/* Sale Price */}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-red-600">
                  {formatPrice(saleInfo.finalPrice)}
                </span>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                  -{saleInfo.discountPercent}%
                </span>
              </div>
            </>
          ) : (
            <span className="text-2xl font-bold text-dawn-orange">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Stock Info */}
        {product.stock !== undefined && (
          <div className="mt-3">
            {product.stock > 0 ? (
              <span className="text-xs text-green-600 font-semibold">
                {product.stock} in stock
              </span>
            ) : (
              <span className="text-xs text-red-600 font-semibold">
                Out of stock
              </span>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className={`w-full mt-4 py-2 rounded-lg font-semibold transition-colors ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-dawn-orange text-white hover:bg-dawn-orange/90'
          }`}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCardWithSale;
