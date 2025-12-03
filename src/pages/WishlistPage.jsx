import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const WishlistPage = () => {
  const { user } = useAuth();
  const { wishlist, addToCart, removeFromWishlist } = useCart();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-soft-white pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="basket-card p-8 text-center">
            <Heart className="w-16 h-16 text-earth-brown/30 mx-auto mb-4" />
            <h2 className="text-2xl font-playfair font-bold text-forest-green mb-4">
              Please Login
            </h2>
            <p className="text-earth-brown mb-6">
              You need to login to view your wishlist
            </p>
            <Link
              to="/login"
              className="btn-organic bg-dawn-orange text-white px-6 py-3 inline-block"
            >
              Login Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-soft-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-earth-brown hover:text-forest-green mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-4xl font-playfair font-bold text-forest-green">
            My Wishlist
          </h1>
          <p className="text-earth-brown mt-2">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {/* Wishlist Items */}
        {wishlist.length === 0 ? (
          <div className="basket-card p-12 text-center">
            <Heart className="w-16 h-16 text-earth-brown/30 mx-auto mb-4" />
            <h2 className="text-2xl font-playfair font-bold text-forest-green mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-earth-brown mb-6">
              Save items you love to buy them later
            </p>
            <Link
              to="/products"
              className="btn-organic bg-dawn-orange text-white px-6 py-3 inline-block"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="basket-card p-4 group"
              >
                {/* Product Image */}
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={item.image || 'https://via.placeholder.com/300'}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-forest-green line-clamp-2 min-h-[3rem]">
                    {item.name}
                  </h3>
                  
                  {item.vendor && (
                    <p className="text-sm text-earth-brown">
                      by {item.vendor}
                    </p>
                  )}

                  {item.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-warm-gold">★</span>
                      <span className="text-sm font-semibold text-earth-brown">
                        {item.rating}
                      </span>
                    </div>
                  )}

                  <p className="text-2xl font-bold text-dawn-orange">
                    ₱{item.price}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 btn-organic bg-dawn-orange text-white py-2 text-sm flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        {wishlist.length > 0 && (
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/products"
              className="btn-organic border-2 border-dawn-orange text-dawn-orange px-6 py-3"
            >
              Continue Shopping
            </Link>
            <Link
              to="/cart"
              className="btn-organic bg-dawn-orange text-white px-6 py-3"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
