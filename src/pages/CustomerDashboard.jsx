import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ShoppingBag, Heart, MapPin, User, Package, Clock, Star, CreditCard, 
  LogOut, Settings, Bell, Search, TrendingUp, Award, Gift, Home, Trash2, Plus, Minus,
  Truck, CheckCircle, X, XCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import NotificationCenter from '../components/NotificationCenter';
import Pagination from '../components/Pagination';
import { usePagination } from '../hooks/usePagination';
import ImageCacheManager from '../components/ImageCacheManager';
import api from '../services/api';

// Customer Dashboard - Main Portal 
const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get active tab from URL, default to 'overview'
  const activeTab = searchParams.get('tab') || 'overview';
  
  // Function to change tab and update URL
  const setActiveTab = (tab) => {
    setSearchParams({ tab });
  };
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderSortBy, setOrderSortBy] = useState('date-desc'); // date-desc, date-asc, amount-desc, amount-asc, status
  const [orderFilterStatus, setOrderFilterStatus] = useState('all'); // all, pending, processing, shipped, delivered, cancelled
  const { user, logout } = useAuth();
  const { cart, wishlist, removeFromCart, updateQuantity, removeFromWishlist, addToCart, getCartTotal, getCartCount, clearCart } = useCart();
  
  // Redirect if user is not a customer
  useEffect(() => {
    if (user && user.role !== 'customer') {
      console.log('⚠️ Wrong dashboard! Redirecting to correct dashboard for role:', user.role);
      if (user.role === 'vendor') {
        navigate('/vendor/dashboard', { replace: true });
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      }
    }
  }, [user, navigate]);
  
  // Check if we should open checkout from cart page
  useEffect(() => {
    if (location.state?.openCheckout && cart.length > 0) {
      setActiveTab('cart');
      setTimeout(() => {
        handleCheckout();
      }, 100);
      // Clear the state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, cart.length]);
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: 'Bulalacao',
    province: 'Oriental Mindoro'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const shippingFee = 50;

  // Custom Product Request State
  const [showCustomProductModal, setShowCustomProductModal] = useState(false);
  const [customProductRequests, setCustomProductRequests] = useState([]);

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => orderFilterStatus === 'all' || order.status.toLowerCase() === orderFilterStatus)
    .sort((a, b) => {
      switch (orderSortBy) {
        case 'date-desc':
          return new Date(b.dateTime || b.date) - new Date(a.dateTime || a.date);
        case 'date-asc':
          return new Date(a.dateTime || a.date) - new Date(b.dateTime || b.date);
        case 'amount-desc':
          return parseFloat(b.total) - parseFloat(a.total);
        case 'amount-asc':
          return parseFloat(a.total) - parseFloat(b.total);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  // Pagination
  const ordersPagination = usePagination(filteredOrders, 5);
  const customRequestsPagination = usePagination(customProductRequests, 6);
  const [customProductForm, setCustomProductForm] = useState({
    productName: '',
    description: '',
    category: 'Handicrafts',
    preferredVendor: '',
    budget: '',
    quantity: 1,
    deadline: '',
    referenceImage: null
  });

  // Sample notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'order', message: 'Your order ORD-001 has been delivered', time: '2 hours ago', read: false },
    { id: 2, type: 'promo', message: 'New products from local artisans available!', time: '1 day ago', read: false },
    { id: 3, type: 'order', message: 'Your order ORD-002 is out for delivery', time: '2 days ago', read: true }
  ]);



  // Initialize profile data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        // Fetch products from public endpoint (no auth needed)
        const response = await fetch('http://localhost:8000/api/products?limit=8');
        const data = await response.json();
        setProducts(data.data || data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to empty array
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('customerOrders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      setOrders(parsedOrders);
    } else if (user?.email === 'customer@gmail.com') {
      // Only add sample orders for demo customer account
      const sampleOrders = [
        {
          id: 'ORD-001',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          dateTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          items: 2,
          products: [
            {
              id: 1,
              name: 'Handwoven Banig Mat',
              price: '850.00',
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400'
            },
            {
              id: 2,
              name: 'Coconut Shell Bowl Set',
              price: '450.00',
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc768?q=80&w=400'
            }
          ],
          subtotal: '1300.00',
          shippingFee: '50.00',
          total: '1350.00',
          status: 'Delivered',
          paymentMethod: 'cod',
          shippingInfo: {
            fullName: user?.name || 'Juan Dela Cruz',
            phone: user?.phone || '09123456789',
            address: user?.address || 'Bulalacao, Oriental Mindoro',
            city: 'Bulalacao',
            province: 'Oriental Mindoro'
          }
        },
        {
          id: 'ORD-002',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          dateTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          items: 1,
          products: [
            {
              id: 3,
              name: 'Bamboo Woven Basket',
              price: '650.00',
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=400'
            }
          ],
          subtotal: '650.00',
          shippingFee: '50.00',
          total: '700.00',
          status: 'Shipped',
          paymentMethod: 'gcash',
          shippingInfo: {
            fullName: user?.name || 'Juan Dela Cruz',
            phone: user?.phone || '09123456789',
            address: user?.address || 'Bulalacao, Oriental Mindoro',
            city: 'Bulalacao',
            province: 'Oriental Mindoro'
          }
        },
        {
          id: 'ORD-003',
          date: new Date().toLocaleDateString(),
          dateTime: new Date().toISOString(),
          items: 1,
          products: [
            {
              id: 4,
              name: 'Organic Wild Honey',
              price: '350.00',
              quantity: 2,
              image: 'https://images.unsplash.com/photo-1587049352846-4a222e784acc?q=80&w=400'
            }
          ],
          subtotal: '700.00',
          shippingFee: '50.00',
          total: '750.00',
          status: 'Processing',
          paymentMethod: 'cod',
          shippingInfo: {
            fullName: user?.name || 'Juan Dela Cruz',
            phone: user?.phone || '09123456789',
            address: user?.address || 'Bulalacao, Oriental Mindoro',
            city: 'Bulalacao',
            province: 'Oriental Mindoro'
          }
        }
      ];
      setOrders(sampleOrders);
      localStorage.setItem('customerOrders', JSON.stringify(sampleOrders));
    } else {
      // New customers start with empty orders
      setOrders([]);
    }
  }, [user]);

  // Save orders to localStorage
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('customerOrders', JSON.stringify(orders));
    }
  }, [orders]);

  // Initialize cart with sample products ONLY for demo customer
  useEffect(() => {
    const initializeData = () => {
      // Only add sample products for demo customer account
      if (user?.email === 'customer@gmail.com' && cart.length === 0) {
        const sampleCartProducts = [
          {
            id: 1,
            name: 'Handwoven Banig Mat',
            price: 850,
            image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400',
            vendor: 'Local Crafts',
            rating: '4.8',
            description: 'Traditional handwoven sleeping mat made from natural materials'
          },
          {
            id: 2,
            name: 'Bamboo Basket Set',
            price: 450,
            image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=400',
            vendor: 'Artisan Goods',
            rating: '4.9',
            description: 'Set of 3 handcrafted bamboo baskets for storage'
          },
          {
            id: 3,
            name: 'Native Wooden Bowl',
            price: 320,
            image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400',
            vendor: 'Native Products',
            rating: '4.7',
            description: 'Hand-carved wooden bowl from indigenous wood'
          }
        ];

        // Add each product to cart
        sampleCartProducts.forEach(product => {
          addToCart(product, 1);
        });
      }
    };

    // Run once when user is loaded
    if (user) {
      const timer = setTimeout(initializeData, 500);
      return () => clearTimeout(timer);
    }
  }, [user]); // Run when user changes

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  // Custom Product Request Handlers
  const handleCustomProductImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomProductForm({ ...customProductForm, referenceImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitCustomProduct = () => {
    if (!customProductForm.productName || !customProductForm.description || !customProductForm.budget) {
      alert('Please fill in all required fields');
      return;
    }

    const newRequest = {
      id: `REQ-${Date.now()}`,
      ...customProductForm,
      status: 'Pending Review',
      submittedDate: new Date().toLocaleDateString(),
      customerName: user?.name || 'Customer'
    };

    setCustomProductRequests(prev => [newRequest, ...prev]);
    localStorage.setItem('customProductRequests', JSON.stringify([newRequest, ...customProductRequests]));
    
    // Reset form
    setCustomProductForm({
      productName: '',
      description: '',
      category: 'Handicrafts',
      preferredVendor: '',
      budget: '',
      quantity: 1,
      deadline: '',
      referenceImage: null
    });
    
    setShowCustomProductModal(false);
    alert('Custom product request submitted successfully! Vendors will review your request.');
  };

  // Load custom product requests
  useEffect(() => {
    const saved = localStorage.getItem('customProductRequests');
    if (saved) {
      setCustomProductRequests(JSON.parse(saved));
    }
  }, []);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowCheckout(true);
    setCheckoutStep(1);
  };

  const handlePlaceOrder = async () => {
    // Create new order
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      dateTime: new Date().toISOString(),
      items: cart.length,
      products: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subtotal: getCartTotal().toFixed(2),
      shippingFee: shippingFee.toFixed(2),
      total: (getCartTotal() + shippingFee).toFixed(2),
      status: 'Pending',
      paymentMethod: paymentMethod,
      shippingInfo: { ...shippingInfo },
      trackingSteps: [
        { status: 'Pending', date: new Date().toISOString(), completed: true, message: 'Order placed successfully' }
      ]
    };

    // Add to orders
    setOrders(prev => [newOrder, ...prev]);
    
    // Record transaction to localStorage and database
    const { recordOrderTransaction } = await import('../utils/transactionRecorder');
    await recordOrderTransaction(newOrder, user?.id, 'customer');
    
    // Show success
    setCheckoutStep(4);
    
    // Clear cart and close modal after delay
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
      setCheckoutStep(1);
      setActiveTab('orders');
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'In Transit':
        return 'bg-blue-100 text-blue-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Shipped':
        return 'bg-purple-100 text-purple-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getEstimatedDelivery = (order) => {
    const orderDate = new Date(order.dateTime || order.date);
    const now = new Date();
    const daysPassed = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
    
    let estimatedDays = 5; // Default 5 days
    let daysRemaining = estimatedDays - daysPassed;
    
    if (order.status === 'Delivered') {
      return { text: 'Delivered', days: 0, hours: 0, color: 'text-green-600' };
    }
    
    if (order.status === 'Shipped') {
      estimatedDays = 2;
      daysRemaining = estimatedDays - daysPassed;
    } else if (order.status === 'Processing') {
      estimatedDays = 4;
      daysRemaining = estimatedDays - daysPassed;
    }
    
    if (daysRemaining < 0) daysRemaining = 0;
    const hoursRemaining = daysRemaining * 24;
    
    return {
      text: daysRemaining === 0 ? 'Arriving today' : `${daysRemaining} day${daysRemaining > 1 ? 's' : ''}`,
      days: daysRemaining,
      hours: hoursRemaining,
      color: daysRemaining <= 1 ? 'text-orange-600' : 'text-blue-600'
    };
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setShowTrackingModal(true);
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-dawn-orange">
                <img src="/logo.jpg" alt="Aton Diya" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="font-playfair font-bold text-lg text-forest-green">Aton Diya</h1>
                <p className="text-xs text-earth-brown">Customer Portal</p>
              </div>
            </Link>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              {/* Real-time Notifications */}
              <NotificationCenter />

              {/* Settings */}
              <div className="relative">
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-coconut-tan rounded-full transition-colors"
                >
                  <Settings className="w-5 h-5 text-earth-brown" />
                </button>
                
                {/* Settings Dropdown */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border-2 border-coconut-tan z-50"
                    >
                      <div className="p-4 border-b border-coconut-tan">
                        <h3 className="font-semibold text-forest-green">Settings</h3>
                      </div>
                      <div className="p-2">
                        {/* Profile Section in Settings */}
                        <div className="px-4 py-4 border-b border-coconut-tan bg-soft-white">
                          <div className="flex flex-col items-center text-center">
                            <div className="mb-3">
                              <div className="w-20 h-20 rounded-full bg-dawn-orange flex items-center justify-center text-white text-2xl font-bold">
                                {user?.name?.charAt(0) || 'J'}
                              </div>
                            </div>
                            <div>
                              <p className="font-bold text-forest-green text-base">{user?.name || 'Juan Dela Cruz'}</p>
                              <p className="text-xs text-earth-brown">{user?.email || 'email@example.com'}</p>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setIsEditingProfile(true);
                            setShowSettings(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-soft-white rounded-lg text-earth-brown"
                        >
                          <User className="w-4 h-4 inline mr-2" />
                          Edit Profile
                        </button>
                        <button
                          onClick={() => {
                            setShowSettings(false);
                            alert('Change password feature coming soon!');
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-soft-white rounded-lg text-earth-brown"
                        >
                          <Settings className="w-4 h-4 inline mr-2" />
                          Change Password
                        </button>
                        <button
                          onClick={() => {
                            setShowSettings(false);
                            alert('Privacy settings coming soon!');
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-soft-white rounded-lg text-earth-brown"
                        >
                          <Settings className="w-4 h-4 inline mr-2" />
                          Privacy Settings
                        </button>
                        <div className="border-t border-coconut-tan my-2"></div>
                        <button
                          onClick={() => {
                            setShowSettings(false);
                            handleLogout();
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-red-50 rounded-lg text-red-600"
                        >
                          <LogOut className="w-4 h-4 inline mr-2" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 btn-organic bg-dawn-orange text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className={`w-4 h-4 ${isLoggingOut ? 'animate-spin' : ''}`} />
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        {/* Main Layout with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 flex-shrink-0"
          >
            <div className="basket-card p-4 sticky top-0">
              {/* Welcome Section */}
              <div className="mb-4 pb-4 border-b border-coconut-tan/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-dawn-orange flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0) || 'J'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-forest-green">Welcome back!</p>
                    <p className="text-xs text-earth-brown">{user?.name || 'Juan'}</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xs font-bold text-earth-brown/60 mb-3 px-1 uppercase tracking-wider">Navigation</h3>
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: Home },
                  { id: 'orders', label: 'My Orders', icon: Package },
                  { id: 'custom', label: 'Custom Request', icon: Gift }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-dawn-orange text-white shadow-md'
                        : 'text-earth-brown hover:bg-light-cream'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Actions in Sidebar */}
              <div className="mt-4 pt-4 border-t border-coconut-tan/30">
                <h3 className="text-xs font-bold text-earth-brown/60 mb-3 px-1 uppercase tracking-wider">Quick Actions</h3>
                <div className="space-y-2">
                  <Link
                    to="/products"
                    className="w-full flex items-center gap-3 px-4 py-3 bg-dawn-orange text-white rounded-lg font-medium transition-all hover:bg-warm-gold"
                  >
                    <Search className="w-5 h-5" />
                    <span>Browse Products</span>
                  </Link>
                  <Link
                    to="/cart"
                    className="w-full flex items-center gap-3 px-4 py-3 bg-forest-green text-white rounded-lg font-medium transition-all hover:bg-forest-green/90"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>View Cart ({getCartCount()})</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    className="w-full flex items-center gap-3 px-4 py-3 bg-sea-blue text-white rounded-lg font-medium transition-all hover:bg-sea-blue/90"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Wishlist ({wishlist.length})</span>
                  </Link>
                </div>
              </div>

              {/* Stats in Sidebar */}
              <div className="mt-4 pt-4 border-t border-coconut-tan/30">
                <h3 className="text-xs font-bold text-earth-brown/60 mb-3 px-1 uppercase tracking-wider">Quick Stats</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-4 py-3 bg-soft-white rounded-lg">
                    <span className="text-sm text-earth-brown">Total Orders</span>
                    <span className="font-bold text-forest-green text-lg">{orders.length}</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-dawn-orange/10 to-warm-gold/10 rounded-lg border border-dawn-orange/20">
                    <span className="text-sm text-earth-brown font-medium">Member Status</span>
                    <span className="font-bold text-dawn-orange flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      Gold
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Products Grid */}
              <div className="basket-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-playfair font-bold text-forest-green">Available Products</h2>
                  <Link
                    to="/products"
                    className="text-sm text-dawn-orange font-semibold hover:underline flex items-center gap-1"
                  >
                    View All Products →
                  </Link>
                </div>
                
                {loadingProducts ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dawn-orange mx-auto"></div>
                    <p className="text-earth-brown mt-4">Loading products...</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-earth-brown/30 mx-auto mb-4" />
                    <p className="text-earth-brown mb-4">No products available</p>
                    <Link
                      to="/products"
                      className="btn-organic bg-dawn-orange text-white px-6 py-2 inline-block"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.slice(0, 8).map((product) => {
                      // Create slug from product name and ID
                      const slug = `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${product.id}`;
                      
                      return (
                      <Link
                        key={product.id}
                        to={`/${slug}`}
                        state={{ product }}
                        className="bg-white rounded-lg overflow-hidden border-2 border-coconut-tan hover:border-dawn-orange hover:shadow-lg transition-all group"
                      >
                        <div className="aspect-square overflow-hidden bg-soft-white">
                          <img
                            src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400'}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400';
                            }}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-forest-green mb-1 line-clamp-2 min-h-[2.5rem]">
                            {product.name}
                          </h3>
                          <p className="text-xs text-earth-brown mb-2 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-xl font-bold text-dawn-orange">
                              ₱{parseFloat(product.price).toFixed(2)}
                            </p>
                            {product.stock > 0 ? (
                              <span className="text-xs text-green-600 font-medium">
                                In Stock
                              </span>
                            ) : (
                              <span className="text-xs text-red-600 font-medium">
                                Out of Stock
                              </span>
                            )}
                          </div>
                          <button className="w-full mt-3 bg-dawn-orange text-white py-2 rounded-lg hover:bg-warm-gold transition-colors text-sm font-semibold">
                            View Details
                          </button>
                        </div>
                      </Link>
                    );
                    })}
                  </div>
                )}
              </div>

              {/* Recent Orders */}
              <div className="basket-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-playfair font-bold text-forest-green">Recent Orders</h2>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-sm text-dawn-orange font-semibold hover:underline"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-earth-brown/30 mx-auto mb-4" />
                      <p className="text-earth-brown mb-4">No orders yet</p>
                      <Link
                        to="/products"
                        className="btn-organic bg-dawn-orange text-white px-6 py-2 inline-block"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-soft-white rounded-lg border border-coconut-tan hover:border-dawn-orange transition-colors">
                        <div className="flex-1">
                          <p className="font-semibold text-forest-green">{order.id}</p>
                          <p className="text-sm text-earth-brown">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-dawn-orange">₱{order.total}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="basket-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-playfair font-bold text-forest-green">
                  My Orders ({orders.filter(o => orderFilterStatus === 'all' || o.status.toLowerCase() === orderFilterStatus).length})
                </h2>
              </div>

              {/* Filter Tabs */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { value: 'all', label: 'All Orders', count: orders.length },
                    { value: 'pending', label: 'Pending', count: orders.filter(o => o.status.toLowerCase() === 'pending').length },
                    { value: 'processing', label: 'Processing', count: orders.filter(o => o.status.toLowerCase() === 'processing').length },
                    { value: 'shipped', label: 'Shipped', count: orders.filter(o => o.status.toLowerCase() === 'shipped').length },
                    { value: 'delivered', label: 'Delivered', count: orders.filter(o => o.status.toLowerCase() === 'delivered').length },
                    { value: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status.toLowerCase() === 'cancelled').length },
                  ].map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setOrderFilterStatus(tab.value)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        orderFilterStatus === tab.value
                          ? 'bg-dawn-orange text-white shadow-md'
                          : 'bg-soft-white text-earth-brown hover:bg-light-cream border border-coconut-tan'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </div>

                {/* Sort by */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-earth-brown">Sort by:</label>
                  <select
                    value={orderSortBy}
                    onChange={(e) => setOrderSortBy(e.target.value)}
                    className="px-3 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none text-sm bg-white"
                  >
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="amount-desc">Highest Amount</option>
                    <option value="amount-asc">Lowest Amount</option>
                    <option value="status">Status</option>
                  </select>
                </div>
              </div>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-earth-brown/30 mx-auto mb-4" />
                  <p className="text-earth-brown text-lg mb-2">No orders yet</p>
                  <p className="text-earth-brown/60 mb-6">
                    Start shopping to see your orders here
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
                  {ordersPagination.paginatedItems.map((order) => (
                    <div key={order.id} className="border-2 border-coconut-tan rounded-lg p-6">
                      {/* Order Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-forest-green text-lg">{order.id}</h3>
                          <p className="text-sm text-earth-brown">{order.date}</p>
                          {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                            <p className={`text-sm font-semibold mt-1 ${getEstimatedDelivery(order).color}`}>
                              🚚 Estimated delivery: {getEstimatedDelivery(order).text}
                            </p>
                          )}
                        </div>
                        <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>

                      {/* Order Products */}
                      <div className="mb-4 space-y-2">
                        <p className="text-sm font-semibold text-earth-brown">Products:</p>
                        {order.products && Array.isArray(order.products) && order.products.map((product, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-soft-white p-2 rounded-lg">
                            <img
                              src={product?.image || 'https://via.placeholder.com/50'}
                              alt={product?.name || 'Product'}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-forest-green">{product?.name || 'Unknown Product'}</p>
                              <p className="text-xs text-earth-brown">Qty: {product?.quantity || 1} × ₱{product?.price || '0.00'}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-soft-white rounded-lg">
                        <div>
                          <p className="text-sm text-earth-brown">Items</p>
                          <p className="font-semibold text-forest-green">{Array.isArray(order.items) ? order.items.length : order.items} products</p>
                        </div>
                        <div>
                          <p className="text-sm text-earth-brown">Payment</p>
                          <p className="font-semibold text-forest-green">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'GCash'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-earth-brown">Subtotal</p>
                          <p className="font-semibold text-forest-green">₱{order.subtotal}</p>
                        </div>
                        <div>
                          <p className="text-sm text-earth-brown">Total</p>
                          <p className="font-bold text-dawn-orange text-lg">₱{order.total}</p>
                        </div>
                      </div>

                      {/* Tracking Timeline */}
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm font-semibold text-blue-800 mb-3">Order Tracking:</p>
                        <div className="space-y-3">
                          {['Pending', 'Processing', 'Shipped', 'Delivered'].map((status, idx) => {
                            const isCompleted = ['Delivered', 'Shipped', 'Processing'].includes(order.status) && 
                                              ['Pending', 'Processing', 'Shipped', 'Delivered'].indexOf(order.status) >= idx;
                            const isCurrent = order.status === status;
                            
                            return (
                              <div key={status} className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-300'
                                }`}>
                                  {isCompleted ? (
                                    <CheckCircle className="w-5 h-5 text-white" />
                                  ) : (
                                    <Clock className="w-5 h-5 text-white" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className={`font-semibold ${isCurrent ? 'text-blue-700' : 'text-gray-700'}`}>
                                    {status}
                                  </p>
                                  {isCurrent && (
                                    <p className="text-xs text-blue-600">Current status</p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Shipping Info */}
                      {order.shippingInfo && (
                        <div className="mb-4 p-4 bg-soft-white rounded-lg">
                          <p className="text-sm font-semibold text-earth-brown mb-2">Shipping Address:</p>
                          <p className="text-sm text-forest-green">{order.shippingInfo.fullName}</p>
                          <p className="text-sm text-forest-green">{order.shippingInfo.phone}</p>
                          <p className="text-sm text-forest-green">{order.shippingInfo.address}</p>
                          <p className="text-sm text-forest-green">{order.shippingInfo.city}, {order.shippingInfo.province}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        {/* Cancel Order - for Pending orders */}
                        {order.status === 'Pending' && (
                          <button
                            onClick={() => {
                              if (confirm('Cancel this order?')) {
                                setOrders(prev => prev.map(o => 
                                  o.id === order.id ? { ...o, status: 'Cancelled' } : o
                                ));
                              }
                            }}
                            className="btn-organic border-2 border-red-500 text-red-500 px-4 py-2 text-sm hover:bg-red-500 hover:text-white transition-colors"
                          >
                            Cancel Order
                          </button>
                        )}
                        
                        {/* Order Again - for Delivered orders */}
                        {order.status === 'Delivered' && (
                          <button 
                            onClick={() => {
                              // Add all products from this order to cart
                              if (order.products && order.products.length > 0) {
                                order.products.forEach(product => {
                                  // Convert order product format to cart product format
                                  const cartProduct = {
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.image,
                                    vendor: 'Local Vendor',
                                    rating: '4.8',
                                    description: product.description || 'Quality indigenous product'
                                  };
                                  addToCart(cartProduct, product.quantity || 1);
                                });
                                alert(`✅ ${order.products.length} item(s) added to cart!`);
                                // Switch to cart tab after a short delay
                                setTimeout(() => {
                                  setActiveTab('cart');
                                }, 800);
                              }
                            }}
                            className="btn-organic border-2 border-green-500 text-green-500 px-4 py-2 text-sm hover:bg-green-500 hover:text-white transition-colors"
                          >
                            🔄 Order Again
                          </button>
                        )}
                        
                        {/* Track Order - for Processing/Shipped orders */}
                        {(order.status === 'Processing' || order.status === 'Shipped') && (
                          <button
                            onClick={() => handleTrackOrder(order)}
                            className="btn-organic border-2 border-blue-500 text-blue-500 px-4 py-2 text-sm hover:bg-blue-500 hover:text-white transition-colors"
                          >
                            📦 Track Order
                          </button>
                        )}
                        
                        {/* Contact Support - for all orders */}
                        <button
                          onClick={() => {
                            alert(`Need help with order ${order.id}?\n\nContact us:\n📞 Phone: 0912-345-6789\n📧 Email: support@atondiya.com`);
                          }}
                          className="btn-organic border-2 border-earth-brown text-earth-brown px-4 py-2 text-sm hover:bg-earth-brown hover:text-white transition-colors"
                        >
                          💬 Contact Support
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Pagination */}
                  <Pagination
                    currentPage={ordersPagination.currentPage}
                    totalPages={ordersPagination.totalPages}
                    onPageChange={ordersPagination.goToPage}
                    itemsPerPage={ordersPagination.itemsPerPage}
                    totalItems={ordersPagination.totalItems}
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* Cart Tab - Removed */}
          {false && activeTab === 'cart' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="basket-card p-6"
            >
              <h2 className="text-2xl font-playfair font-bold text-forest-green mb-6">
                Shopping Cart ({cart.length} items)
              </h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-earth-brown/30 mx-auto mb-4" />
                  <p className="text-earth-brown text-lg mb-2">Your cart is empty</p>
                  <p className="text-earth-brown/60 mb-6">
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
                <div className="space-y-6">
                  {/* Cart Items */}
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 border-b border-coconut-tan pb-4">
                        <img
                          src={item.image || 'https://via.placeholder.com/100'}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-forest-green mb-2">{item.name}</h3>
                          <p className="text-dawn-orange font-bold text-lg mb-2">₱{item.price}</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border-2 border-dawn-orange text-dawn-orange flex items-center justify-center hover:bg-dawn-orange hover:text-white transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border-2 border-dawn-orange text-dawn-orange flex items-center justify-center hover:bg-dawn-orange hover:text-white transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 self-start"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t-2 border-coconut-tan pt-4">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-earth-brown">
                        <span>Subtotal:</span>
                        <span>₱{getCartTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-earth-brown">
                        <span>Shipping Fee:</span>
                        <span>₱50.00</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-coconut-tan">
                        <span className="text-xl font-semibold text-forest-green">Total:</span>
                        <span className="text-3xl font-bold text-dawn-orange">
                          ₱{(getCartTotal() + 50).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full btn-organic bg-dawn-orange text-white py-4 text-lg font-semibold"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Wishlist Tab - Removed */}
          {false && activeTab === 'wishlist' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="basket-card p-6"
            >
              <h2 className="text-2xl font-playfair font-bold text-forest-green mb-6">
                My Wishlist ({wishlist.length} items)
              </h2>
              
              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-earth-brown/30 mx-auto mb-4" />
                  <p className="text-earth-brown text-lg mb-2">No items in wishlist</p>
                  <p className="text-earth-brown/60 mb-6">
                    Add products to your wishlist to save them for later
                  </p>
                  <Link
                    to="/products"
                    className="btn-organic bg-dawn-orange text-white px-6 py-3 inline-block"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div key={item.id} className="basket-card p-4">
                      <img
                        src={item.image || 'https://via.placeholder.com/300'}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-forest-green mb-2">{item.name}</h3>
                      <p className="text-dawn-orange font-bold text-xl mb-4">₱{item.price}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            addToCart(item);
                            removeFromWishlist(item.id);
                          }}
                          className="flex-1 btn-organic bg-dawn-orange text-white py-2 text-sm"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="btn-organic border-2 border-red-500 text-red-500 px-4 py-2 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Custom Product Request Tab */}
          {activeTab === 'custom' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="basket-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-playfair font-bold text-forest-green">Custom Product Requests</h2>
                    <p className="text-earth-brown mt-1">Request custom-made products from our artisans</p>
                  </div>
                  <button
                    onClick={() => setShowCustomProductModal(true)}
                    className="btn-organic bg-dawn-orange text-white px-6 py-3 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    New Request
                  </button>
                </div>

                {customProductRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <Gift className="w-16 h-16 text-coconut-tan mx-auto mb-4" />
                    <p className="text-earth-brown text-lg mb-2">No custom requests yet</p>
                    <p className="text-gray-500 mb-6">Start by creating your first custom product request</p>
                    <button
                      onClick={() => setShowCustomProductModal(true)}
                      className="btn-organic bg-dawn-orange text-white px-8 py-3"
                    >
                      Create Request
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customRequestsPagination.paginatedItems.map((request) => (
                      <div key={request.id} className="border-2 border-coconut-tan rounded-lg p-6 hover:border-dawn-orange transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold text-forest-green">{request.productName}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                request.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-700' :
                                request.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                request.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {request.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">Request ID: {request.id}</p>
                            <p className="text-sm text-gray-500">Submitted: {request.submittedDate}</p>
                          </div>
                          {request.referenceImage && (
                            <img 
                              src={request.referenceImage} 
                              alt="Reference" 
                              className="w-24 h-24 object-cover rounded-lg border-2 border-coconut-tan"
                            />
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Category</p>
                            <p className="font-semibold text-earth-brown">{request.category}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Preferred Vendor</p>
                            <p className="font-semibold text-forest-green">{request.preferredVendor || 'Any'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Budget</p>
                            <p className="font-semibold text-dawn-orange">₱{request.budget}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Quantity</p>
                            <p className="font-semibold text-earth-brown">{request.quantity} pcs</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Deadline</p>
                            <p className="font-semibold text-earth-brown">{request.deadline || 'Flexible'}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-1">Description</p>
                          <p className="text-earth-brown">{request.description}</p>
                        </div>

                        <div className="flex gap-2">
                          <button className="btn-organic border-2 border-dawn-orange text-dawn-orange px-4 py-2 text-sm">
                            View Details
                          </button>
                          {request.status === 'Pending Review' && (
                            <button className="btn-organic border-2 border-red-500 text-red-500 px-4 py-2 text-sm">
                              Cancel Request
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {/* Pagination */}
                    <Pagination
                      currentPage={customRequestsPagination.currentPage}
                      totalPages={customRequestsPagination.totalPages}
                      onPageChange={customRequestsPagination.goToPage}
                      itemsPerPage={customRequestsPagination.itemsPerPage}
                      totalItems={customRequestsPagination.totalItems}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
          </div>
          {/* End Main Content Area */}
        </div>
        {/* End Sidebar Layout */}
      </div>
      {/* End Container */}

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditingProfile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditingProfile(false)}
              className="fixed inset-0 bg-black/50 z-[100]"
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                style={{ maxHeight: '90vh' }}
              >
              <div className="bg-forest-green text-white p-6 flex items-center justify-between">
                <h2 className="text-2xl font-playfair font-bold">Edit Profile</h2>
                <button onClick={() => setIsEditingProfile(false)} className="text-white hover:text-dawn-orange">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
                <div className="space-y-6">
                  {/* Edit Profile Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-earth-brown mb-1 block">Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-earth-brown mb-1 block">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-earth-brown mb-1 block">Phone</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-earth-brown mb-1 block">Address</label>
                      <textarea
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                        rows="3"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        // Save to localStorage (in real app, would save to backend)
                        localStorage.setItem('userProfile', JSON.stringify(profileData));
                        setIsEditingProfile(false);
                        alert('Profile updated successfully!');
                      }}
                      className="flex-1 btn-organic bg-dawn-orange text-white px-6 py-3"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditingProfile(false);
                        setProfileData({
                          name: user?.name || '',
                          email: user?.email || '',
                          phone: user?.phone || '',
                          address: user?.address || ''
                        });
                      }}
                      className="flex-1 btn-organic border-2 border-earth-brown text-earth-brown px-6 py-3"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => checkoutStep !== 4 && setShowCheckout(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-soft-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              >
              <div className="bg-forest-green text-white p-6 flex items-center justify-between">
                <h2 className="text-2xl font-playfair font-bold">
                  {checkoutStep === 4 ? 'Order Confirmed!' : 'Checkout'}
                </h2>
                {checkoutStep !== 4 && (
                  <button onClick={() => setShowCheckout(false)} className="text-white hover:text-dawn-orange">
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                {/* Step 1: Order Review */}
                {checkoutStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-forest-green">Order Summary</h3>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 border-b pb-3">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-forest-green">{item.name}</h4>
                            <p className="text-sm text-earth-brown">Qty: {item.quantity}</p>
                            <p className="text-dawn-orange font-bold">₱{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t-2 pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>₱{getCartTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>₱{shippingFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold text-forest-green pt-2 border-t">
                        <span>Total:</span>
                        <span className="text-dawn-orange">₱{(getCartTotal() + shippingFee).toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setCheckoutStep(2)}
                      className="w-full btn-organic bg-dawn-orange text-white py-3 font-semibold"
                    >
                      Continue to Shipping
                    </button>
                  </div>
                )}

                {/* Step 2: Shipping Info */}
                {checkoutStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-forest-green flex items-center gap-2">
                      <Truck className="w-6 h-6" />
                      Shipping Information
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={shippingInfo.fullName}
                        onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                      />
                      <textarea
                        placeholder="Complete Address"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                        rows="3"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="City"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Province"
                          value={shippingInfo.province}
                          onChange={(e) => setShippingInfo({...shippingInfo, province: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setCheckoutStep(1)}
                        className="flex-1 btn-organic border-2 border-dawn-orange text-dawn-orange py-3"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setCheckoutStep(3)}
                        className="flex-1 btn-organic bg-dawn-orange text-white py-3"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {checkoutStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-forest-green flex items-center gap-2">
                      <CreditCard className="w-6 h-6" />
                      Payment Method
                    </h3>
                    <div className="space-y-4">
                      <label className="basket-card p-4 flex items-center gap-4 cursor-pointer border-2 border-transparent hover:border-dawn-orange">
                        <input
                          type="radio"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-5 h-5"
                        />
                        <div>
                          <p className="font-semibold text-forest-green">Cash on Delivery</p>
                          <p className="text-sm text-earth-brown">Pay when you receive</p>
                        </div>
                      </label>
                      <label className="basket-card p-4 flex items-center gap-4 cursor-pointer border-2 border-transparent hover:border-dawn-orange">
                        <input
                          type="radio"
                          value="gcash"
                          checked={paymentMethod === 'gcash'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-5 h-5"
                        />
                        <div>
                          <p className="font-semibold text-forest-green">GCash</p>
                          <p className="text-sm text-earth-brown">Mobile wallet</p>
                        </div>
                      </label>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setCheckoutStep(2)}
                        className="flex-1 btn-organic border-2 border-dawn-orange text-dawn-orange py-3"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        className="flex-1 btn-organic bg-dawn-orange text-white py-3"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Success */}
                {checkoutStep === 4 && (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.5 }}
                    >
                      <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-playfair font-bold text-forest-green mb-4">
                      Order Placed Successfully!
                    </h3>
                    <p className="text-earth-brown mb-2">Thank you, {user?.name}!</p>
                    <p className="text-earth-brown mb-6">
                      Total: <span className="font-bold text-dawn-orange">₱{(getCartTotal() + shippingFee).toFixed(2)}</span>
                    </p>
                    <p className="text-sm text-earth-brown/70">
                      Redirecting to orders...
                    </p>
                  </div>
                )}
              </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Custom Product Request Modal */}
      <AnimatePresence>
        {showCustomProductModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCustomProductModal(false)}
              className="fixed inset-0 bg-black/50 z-[100]"
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                <div className="bg-gradient-to-r from-forest-green to-dark-forest text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-playfair font-bold">Custom Product Request</h2>
                      <p className="text-white/80 mt-1">Tell us what you need, and our artisans will create it</p>
                    </div>
                    <button
                      onClick={() => setShowCustomProductModal(false)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Product Name */}
                  <div>
                    <label className="block text-earth-brown font-semibold mb-2">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customProductForm.productName}
                      onChange={(e) => setCustomProductForm({ ...customProductForm, productName: e.target.value })}
                      placeholder="e.g., Custom Woven Basket with Lid"
                      className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-earth-brown font-semibold mb-2">Category</label>
                    <select
                      value={customProductForm.category}
                      onChange={(e) => setCustomProductForm({ ...customProductForm, category: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                    >
                      <option value="Handicrafts">Handicrafts</option>
                      <option value="Home Decor">Home Decor</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Textiles">Textiles</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Preferred Artisan/Vendor */}
                  <div>
                    <label className="block text-earth-brown font-semibold mb-2">
                      Preferred Artisan/Vendor <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={customProductForm.preferredVendor || ''}
                      onChange={(e) => setCustomProductForm({ ...customProductForm, preferredVendor: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                      required
                    >
                      <option value="">Select an artisan/vendor</option>
                      <option value="Mountain Coffee Co.">Mountain Coffee Co.</option>
                      <option value="Maria Santos">Maria Santos</option>
                      <option value="Juan Dela Cruz">Juan Dela Cruz</option>
                      <option value="Bulalacao Farms">Bulalacao Farms</option>
                      <option value="Local Artisans">Local Artisans</option>
                      <option value="Weaving Collective">Weaving Collective</option>
                      <option value="Pedro Craftsman">Pedro Craftsman</option>
                      <option value="Furniture Masters">Furniture Masters</option>
                      <option value="Hat Weavers Guild">Hat Weavers Guild</option>
                      <option value="Clay Artists">Clay Artists</option>
                      <option value="Fishermen Cooperative">Fishermen Cooperative</option>
                      <option value="Textile Artisans">Textile Artisans</option>
                      <option value="Any Available Vendor">Any Available Vendor</option>
                    </select>
                    <p className="text-sm text-earth-brown/70 mt-1">
                      Choose which artisan you'd like to create your custom product
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-earth-brown font-semibold mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={customProductForm.description}
                      onChange={(e) => setCustomProductForm({ ...customProductForm, description: e.target.value })}
                      placeholder="Describe what you want in detail: size, color, materials, design preferences, etc."
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none resize-none"
                    />
                  </div>

                  {/* Budget and Quantity */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-earth-brown font-semibold mb-2">
                        Budget (₱) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={customProductForm.budget}
                        onChange={(e) => setCustomProductForm({ ...customProductForm, budget: e.target.value })}
                        placeholder="1000"
                        className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-earth-brown font-semibold mb-2">Quantity</label>
                      <input
                        type="number"
                        value={customProductForm.quantity}
                        onChange={(e) => setCustomProductForm({ ...customProductForm, quantity: e.target.value })}
                        min="1"
                        className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-earth-brown font-semibold mb-2">Preferred Deadline (Optional)</label>
                    <input
                      type="date"
                      value={customProductForm.deadline}
                      onChange={(e) => setCustomProductForm({ ...customProductForm, deadline: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                    />
                  </div>

                  {/* Reference Image */}
                  <div>
                    <label className="block text-earth-brown font-semibold mb-2">Reference Image (Optional)</label>
                    <div className="border-2 border-dashed border-coconut-tan rounded-lg p-6 text-center">
                      {customProductForm.referenceImage ? (
                        <div className="relative">
                          <img 
                            src={customProductForm.referenceImage} 
                            alt="Reference" 
                            className="max-h-48 mx-auto rounded-lg"
                          />
                          <button
                            onClick={() => setCustomProductForm({ ...customProductForm, referenceImage: null })}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <Gift className="w-12 h-12 text-coconut-tan mx-auto mb-2" />
                          <p className="text-earth-brown mb-1">Upload a reference image</p>
                          <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCustomProductImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowCustomProductModal(false)}
                      className="flex-1 btn-organic border-2 border-gray-300 text-gray-700 py-3"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitCustomProduct}
                      className="flex-1 btn-organic bg-dawn-orange text-white py-3"
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Order Tracking Modal */}
      <AnimatePresence>
        {showTrackingModal && selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTrackingModal(false)}
              className="fixed inset-0 bg-black/50 z-[100]"
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-forest-green to-sea-blue text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-playfair font-bold">Order Tracking</h2>
                      <p className="text-white/80 mt-1">{selectedOrder.id}</p>
                    </div>
                    <button
                      onClick={() => setShowTrackingModal(false)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Estimated Delivery */}
                  {selectedOrder.status !== 'Delivered' && selectedOrder.status !== 'Cancelled' && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-3">
                        <Truck className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Estimated Delivery</p>
                          <p className={`text-2xl font-bold ${getEstimatedDelivery(selectedOrder).color}`}>
                            {getEstimatedDelivery(selectedOrder).text}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            ({getEstimatedDelivery(selectedOrder).hours} hours remaining)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div className="mb-6">
                    <h3 className="font-bold text-forest-green mb-4">Order Timeline</h3>
                    <div className="space-y-4">
                      {[
                        { status: 'Pending', icon: Clock, label: 'Order Placed', desc: 'Your order has been received' },
                        { status: 'Processing', icon: Package, label: 'Processing', desc: 'Vendor is preparing your order' },
                        { status: 'Shipped', icon: Truck, label: 'Shipped', desc: 'Order is on the way' },
                        { status: 'Delivered', icon: CheckCircle, label: 'Delivered', desc: 'Order has been delivered' }
                      ].map((step, idx) => {
                        const statusOrder = ['Pending', 'Processing', 'Shipped', 'Delivered'];
                        const currentIndex = statusOrder.indexOf(selectedOrder.status);
                        const stepIndex = statusOrder.indexOf(step.status);
                        const isCompleted = stepIndex <= currentIndex;
                        const isCurrent = step.status === selectedOrder.status;
                        const Icon = step.icon;

                        return (
                          <div key={step.status} className="flex gap-4">
                            {/* Timeline Line */}
                            <div className="flex flex-col items-center">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                              }`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              {idx < 3 && (
                                <div className={`w-1 h-16 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pb-8">
                              <div className={`font-bold ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                                {step.label}
                                {isCurrent && <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Current</span>}
                                {isCompleted && !isCurrent && <span className="ml-2 text-xs">✓</span>}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
                              {isCompleted && (
                                <p className="text-xs text-gray-400 mt-1">
                                  {new Date(selectedOrder.dateTime || selectedOrder.date).toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-forest-green mb-3">Order Details</h4>
                    <div className="space-y-2">
                      {selectedOrder.products && Array.isArray(selectedOrder.products) && selectedOrder.products.map((product, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <img
                            src={product?.image || 'https://via.placeholder.com/50'}
                            alt={product?.name || 'Product'}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold">{product?.name || 'Unknown Product'}</p>
                            <p className="text-xs text-gray-600">Qty: {product?.quantity || 1} × ₱{product?.price || '0.00'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {selectedOrder.shippingInfo && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-forest-green mb-2">Shipping Address</h4>
                      <p className="text-sm">{selectedOrder.shippingInfo.fullName}</p>
                      <p className="text-sm">{selectedOrder.shippingInfo.phone}</p>
                      <p className="text-sm">{selectedOrder.shippingInfo.address}</p>
                      <p className="text-sm">{selectedOrder.shippingInfo.city}, {selectedOrder.shippingInfo.province}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      
      {/* Image Cache Manager */}
      <ImageCacheManager products={cart} />
    </div>
  );
};

export default CustomerDashboard;
