import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X, LogIn } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CartDebugger = () => {
  const { cart, getCartTotal, getCartCount, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Cart Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          if (!user) {
            navigate('/login');
          } else {
            navigate('/cart');
          }
        }}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-dawn-orange to-warm-gold rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all"
        title={!user ? 'Login to view cart' : 'View cart'}
      >
        {!user ? (
          <LogIn className="w-7 h-7 text-white" />
        ) : (
          <>
            <ShoppingCart className="w-7 h-7 text-white" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 px-2 flex items-center justify-center shadow-lg border-2 border-white">
                {getCartCount()}
              </span>
            )}
          </>
        )}
      </motion.button>

      {/* Cart Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60]"
            />

            {/* Cart Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-soft-white shadow-2xl z-[70] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-forest-green text-white p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-playfair font-bold">Your Cart</h2>
                  <p className="text-coconut-tan text-sm">{getCartCount()} items</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-dawn-orange transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="p-6">
                {!user ? (
                  <div className="text-center py-12">
                    <LogIn className="w-16 h-16 text-earth-brown/30 mx-auto mb-4" />
                    <p className="text-earth-brown text-lg mb-2">Please login first</p>
                    <p className="text-earth-brown/60 text-sm mb-6">
                      You need to login to view your cart
                    </p>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate('/login');
                      }}
                      className="btn-organic bg-dawn-orange text-white px-6 py-3"
                    >
                      Login Now
                    </button>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-earth-brown/30 mx-auto mb-4" />
                    <p className="text-earth-brown text-lg">Your cart is empty</p>
                    <p className="text-earth-brown/60 text-sm mt-2">
                      Add some products to get started!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="basket-card p-4 flex gap-4"
                        >
                          <img
                            src={item.image || 'https://via.placeholder.com/100'}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-forest-green mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-earth-brown mb-2">
                              Qty: {item.quantity}
                            </p>
                            <p className="text-dawn-orange font-bold">
                              ₱{item.price}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="border-t-2 border-coconut-tan pt-4">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-semibold text-forest-green">
                          Total:
                        </span>
                        <span className="text-2xl font-bold text-dawn-orange">
                          ₱{getCartTotal().toFixed(2)}
                        </span>
                      </div>
                      <button className="w-full btn-organic bg-dawn-orange text-white py-4 text-lg font-semibold">
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDebugger;
