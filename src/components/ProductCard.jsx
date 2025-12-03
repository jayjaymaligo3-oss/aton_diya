import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Check, X, Star, Package, Truck, Shield, MapPin, MessageSquare, CreditCard, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Toast from './Toast';
import { createProductSlug, createVendorSlug } from '../utils/slugify';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAdded, setShowAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('cart');
  const [showModal, setShowModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: user?.name || '',
    address: user?.address || '',
    zipCode: '',
    message: '',
    paymentMethod: 'cod'
  });
  const isLiked = isInWishlist(product.id);

  const shippingFee = 50;
  const subtotal = parseFloat(product.price.replace(/,/g, ''));
  const total = subtotal + shippingFee;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    // Check if user is logged in
    if (!user) {
      setToastMessage('Please login to add items to cart');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => {
        navigate('/login', { state: { from: window.location.pathname } });
      }, 1500);
      return;
    }
    
    addToCart(product);
    setShowAdded(true);
    setToastMessage(`${product.name} added to cart!`);
    setToastType('cart');
    setShowToast(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    
    // Check if user is logged in
    if (!user) {
      setToastMessage('Please login to add items to wishlist');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => {
        navigate('/login', { state: { from: window.location.pathname } });
      }, 1500);
      return;
    }
    
    addToWishlist(product);
  };

  const handleCardClick = () => {
    const slug = createProductSlug(product.name, product.id);
    navigate(`/${slug}`, { state: { product } });
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    
    // Check if user is logged in
    if (!user) {
      setToastMessage('Please login to purchase');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => {
        navigate('/login', { state: { from: window.location.pathname } });
      }, 1500);
      return;
    }
    
    // Navigate to checkout page with product
    navigate('/checkout', { state: { product } });
  };

  const handleCheckoutChange = (field, value) => {
    setCheckoutData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    // Start loading bar
    const loadingBar = document.getElementById('loading-bar');
    if (loadingBar) {
      loadingBar.style.width = '0%';
      loadingBar.classList.remove('hidden');
      loadingBar.style.width = '50%';
    }

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      dateTime: new Date().toISOString(),
      product: product,
      quantity: 1,
      subtotal: subtotal.toFixed(2),
      shippingFee: shippingFee.toFixed(2),
      total: total.toFixed(2),
      status: 'Processing',
      shippingAddress: checkoutData.address,
      zipCode: checkoutData.zipCode,
      customerName: checkoutData.name,
      message: checkoutData.message,
      paymentMethod: checkoutData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'GCash'
    };
    orders.push(newOrder);
    localStorage.setItem('customerOrders', JSON.stringify(orders));

    if (loadingBar) loadingBar.style.width = '100%';

    setShowCheckout(false);
    setToastMessage('Order placed successfully!');
    setToastType('cart');
    setShowToast(true);

    // Complete loading bar
    if (loadingBar) {
      setTimeout(() => {
        loadingBar.classList.add('hidden');
        loadingBar.style.width = '0%';
      }, 300);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        onClick={handleCardClick}
        className="basket-card overflow-hidden group cursor-pointer"
      >
        {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/400x300?text=Product'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        


        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 right-4 bg-dawn-orange text-white px-3 py-1 rounded-full text-xs font-semibold">
            {product.badge}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-playfair font-semibold text-forest-green line-clamp-2 flex-1 drop-shadow-sm">
            {product.name || 'Product Name'}
          </h3>
        </div>
        
        <p className="text-sm text-earth-brown mb-3 line-clamp-2 font-medium">
          {product.description || 'Authentic indigenous product from Bulalacao'}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-dawn-orange drop-shadow-sm">
              ₱{product.price || '0.00'}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2 font-medium">
                ₱{product.originalPrice}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <span className="text-warm-gold text-lg">★</span>
            <span className="text-sm font-bold text-earth-brown">
              {product.rating || '5.0'}
            </span>
          </div>
        </div>

        {/* Vendor Info */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            const vendorSlug = createVendorSlug(product.vendor);
            navigate(`/vendor/${vendorSlug}`, { state: { vendor: product.vendor } });
          }}
          className="mt-3 pt-3 border-t border-coconut-tan/30 flex items-center gap-2 cursor-pointer -mx-2 px-2 py-1 rounded"
        >
          <div className="w-6 h-6 rounded-full bg-forest-green flex items-center justify-center text-white text-xs font-bold shadow-md">
            {product.vendor?.charAt(0) || 'V'}
          </div>
          <span className="text-xs text-earth-brown font-semibold">
            {product.vendor || 'Local Artisan'}
          </span>
        </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductCard;
