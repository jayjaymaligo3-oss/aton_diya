import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Heart, Check, Star, Package, Truck, Shield, 
  MapPin, MessageSquare, CreditCard, Wallet, ArrowLeft, Users, MessageCircle 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import { extractIdFromSlug } from '../utils/slugify';

const ProductDetailsPage = () => {
  const { productSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract product ID from slug
  const productId = extractIdFromSlug(productSlug);
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [showAdded, setShowAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('cart');
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: user?.name || '',
    address: user?.address || '',
    zipCode: '',
    message: '',
    paymentMethod: 'cod'
  });

  // Fetch product if not passed via state
  useEffect(() => {
    const fetchProduct = async () => {
      if (!product && productId) {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:8000/api/products`);
          const data = await response.json();
          const foundProduct = data.data.find(p => p.id === parseInt(productId));
          
          if (foundProduct) {
            // Format product to match expected structure
            setProduct({
              ...foundProduct,
              price: parseFloat(foundProduct.price).toFixed(2),
              rating: 4.9, // Default rating
              badge: foundProduct.sales_count > 20 ? 'Best Seller' : null
            });
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchProduct();
  }, [productId, product]);

  const isLiked = product ? isInWishlist(product.id) : false;
  const shippingFee = 50;
  const subtotal = product ? parseFloat(String(product.price).replace(/,/g, '')) : 0;
  const total = subtotal + shippingFee;

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: 'Maria Santos',
      rating: 5,
      comment: 'Excellent quality! Very authentic and beautifully made. Highly recommended!',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      name: 'Juan Dela Cruz',
      rating: 5,
      comment: 'Amazing product! Worth every peso. Fast delivery too!',
      date: '2024-01-10',
      verified: true
    },
    {
      id: 3,
      name: 'Pedro Reyes',
      rating: 4,
      comment: 'Good quality product. Packaging could be better but overall satisfied.',
      date: '2024-01-05',
      verified: true
    }
  ];

  const totalBuyers = 127; // Sample data

  const handleAddToCart = () => {
    if (!user) {
      setToastMessage('Please login to add items to cart');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    
    addToCart(product);
    setShowAdded(true);
    setToastMessage(`${product.name} added to cart!`);
    setToastType('cart');
    setShowToast(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  const handleToggleWishlist = () => {
    if (!user) {
      setToastMessage('Please login to add items to wishlist');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    
    addToWishlist(product);
  };

  const handleBuyNow = () => {
    if (!user) {
      setToastMessage('Please login to purchase');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    
    // Navigate to checkout page with product
    navigate('/checkout', { state: { product } });
  };

  const handleCheckoutChange = (field, value) => {
    setCheckoutData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    const loadingBar = document.getElementById('loading-bar');
    if (loadingBar) {
      loadingBar.style.width = '0%';
      loadingBar.classList.remove('hidden');
      loadingBar.style.width = '50%';
    }

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

    if (loadingBar) {
      setTimeout(() => {
        loadingBar.classList.add('hidden');
        loadingBar.style.width = '0%';
      }, 300);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-white pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dawn-orange"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-soft-white pt-24 flex items-center justify-center">
        <p className="text-earth-brown">Product not found</p>
      </div>
    );
  }

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

      <div className="min-h-screen bg-soft-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-earth-brown hover:text-dawn-orange transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Products</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
              />
              {product.badge && (
                <div className="absolute top-4 right-4 bg-dawn-orange text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {product.badge}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-playfair font-bold text-forest-green mb-4">
                  {product.name}
                </h1>

                {/* Rating & Buyers */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-warm-gold text-warm-gold'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-earth-brown font-semibold">
                      {product.rating} / 5.0
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-earth-brown">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">{totalBuyers} buyers</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-5xl font-bold text-dawn-orange">
                    ₱{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through ml-3">
                      ₱{product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-earth-brown leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Vendor Info */}
              <div 
                onClick={() => {
                  const vendorName = typeof product.vendor === 'string' 
                    ? product.vendor 
                    : product.vendor?.name || product.shopName || 'vendor';
                  navigate(`/vendor/${encodeURIComponent(vendorName)}`, { state: { vendor: product.vendor } });
                }}
                className="p-4 bg-soft-white rounded-lg border border-coconut-tan cursor-pointer hover:border-dawn-orange transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-forest-green flex items-center justify-center text-white text-lg font-bold">
                    {(() => {
                      const vendorName = typeof product.vendor === 'string' 
                        ? product.vendor 
                        : product.vendor?.name || product.shopName || 'V';
                      return vendorName.charAt(0).toUpperCase();
                    })()}
                  </div>
                  <div>
                    <p className="text-sm text-earth-brown/70">Sold by</p>
                    <p className="font-semibold text-forest-green text-lg hover:text-dawn-orange transition-colors">
                      {typeof product.vendor === 'string' ? product.vendor : product.vendor?.name || product.shopName || 'Local Artisan'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-soft-white rounded-lg border border-coconut-tan">
                  <Package className="w-8 h-8 text-dawn-orange mx-auto mb-2" />
                  <p className="text-sm text-earth-brown font-semibold">Authentic</p>
                </div>
                <div className="text-center p-4 bg-soft-white rounded-lg border border-coconut-tan">
                  <Truck className="w-8 h-8 text-dawn-orange mx-auto mb-2" />
                  <p className="text-sm text-earth-brown font-semibold">Fast Delivery</p>
                </div>
                <div className="text-center p-4 bg-soft-white rounded-lg border border-coconut-tan">
                  <Shield className="w-8 h-8 text-dawn-orange mx-auto mb-2" />
                  <p className="text-sm text-earth-brown font-semibold">Guaranteed</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full btn-organic bg-forest-green text-white py-4 font-bold text-lg flex items-center justify-center gap-2 hover:bg-forest-green/90"
                >
                  <Package className="w-6 h-6" />
                  Buy Now
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={handleToggleWishlist}
                    className="flex-shrink-0 w-14 h-14 border-2 border-dawn-orange rounded-lg flex items-center justify-center hover:bg-dawn-orange/10 transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        isLiked ? 'fill-dawn-orange text-dawn-orange' : 'text-dawn-orange'
                      }`}
                    />
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-organic bg-dawn-orange text-white py-4 font-bold text-lg flex items-center justify-center gap-2"
                  >
                    {showAdded ? (
                      <>
                        <Check className="w-6 h-6" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <div className="basket-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-dawn-orange" />
                <h2 className="text-2xl font-playfair font-bold text-forest-green">
                  Customer Reviews
                </h2>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-soft-white rounded-lg border border-coconut-tan"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-forest-green">{review.name}</p>
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-warm-gold text-warm-gold'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-earth-brown/70">{review.date}</span>
                    </div>
                    <p className="text-earth-brown">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
