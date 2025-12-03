import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { user } = useAuth();
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const navigate = useNavigate();
  const shippingFee = 50;
  const totalWithShipping = getCartTotal() + shippingFee;

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-soft-white pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="basket-card p-8 text-center">
            <ShoppingBag className="w-16 h-16 text-earth-brown/30 mx-auto mb-4" />
            <h2 className="text-2xl font-playfair font-bold text-forest-green mb-4">
              Please Login
            </h2>
            <p className="text-earth-brown mb-6">
              You need to login to view your cart
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
            Shopping Cart
          </h1>
          <p className="text-earth-brown mt-2">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cart.length === 0 ? (
              <div className="basket-card p-12 text-center">
                <ShoppingBag className="w-16 h-16 text-earth-brown/30 mx-auto mb-4" />
                <h2 className="text-2xl font-playfair font-bold text-forest-green mb-2">
                  Your cart is empty
                </h2>
                <p className="text-earth-brown mb-6">
                  Add some products to get started
                </p>
                <Link
                  to="/products"
                  className="btn-organic bg-dawn-orange text-white px-6 py-3 inline-block"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="basket-card p-6"
                  >
                    <div className="flex gap-6">
                      <img
                        src={item.image || 'https://via.placeholder.com/150'}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-forest-green mb-2">
                          {item.name}
                        </h3>
                        <p className="text-earth-brown text-sm mb-3">
                          {item.vendor || 'Local Artisan'}
                        </p>
                        <p className="text-2xl font-bold text-dawn-orange mb-4">
                          ₱{item.price}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 rounded-full border-2 border-dawn-orange text-dawn-orange flex items-center justify-center hover:bg-dawn-orange hover:text-white transition-colors"
                            >
                              <Minus className="w-5 h-5" />
                            </button>
                            <span className="w-16 text-center font-bold text-lg">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 rounded-full border-2 border-dawn-orange text-dawn-orange flex items-center justify-center hover:bg-dawn-orange hover:text-white transition-colors"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="lg:col-span-1">
              <div className="basket-card p-6 sticky top-24">
                <h2 className="text-2xl font-playfair font-bold text-forest-green mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-earth-brown">
                    <span>Subtotal ({getCartCount()} items)</span>
                    <span>₱{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-earth-brown">
                    <span>Shipping Fee</span>
                    <span>₱{shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t-2 border-coconut-tan pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-forest-green">
                        Total
                      </span>
                      <span className="text-3xl font-bold text-dawn-orange">
                        ₱{totalWithShipping.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    // Navigate to checkout page
                    navigate('/checkout');
                  }}
                  className="w-full btn-organic bg-dawn-orange text-white py-4 text-lg font-semibold text-center block mb-3"
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/products"
                  className="w-full btn-organic border-2 border-dawn-orange text-dawn-orange py-3 text-center block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
