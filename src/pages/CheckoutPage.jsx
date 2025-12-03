import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, MessageSquare, CreditCard, Wallet, Package, 
  ShoppingBag, Trash2, Plus, Minus, Phone, Banknote 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    address: '',
    zipCode: '',
    message: '',
    paymentMethod: 'cod'
  });

  // Check if coming from Buy Now (single product)
  const buyNowProduct = location.state?.product;
  const items = buyNowProduct ? [{ ...buyNowProduct, quantity: 1 }] : cart;

  const shippingFee = 50;
  const subtotal = buyNowProduct 
    ? parseFloat(buyNowProduct.price.replace(/,/g, ''))
    : getCartTotal();
  const total = subtotal + shippingFee;

  // Auto-fill user details from registration
  useEffect(() => {
    if (user) {
      setCheckoutData(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        // Keep zipCode empty as it's not collected during registration
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (items.length === 0) {
      navigate('/products');
    }
  }, [user, items, navigate]);

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
      customer: user?.name || checkoutData.name,
      customerEmail: user?.email || '',
      customerPhone: checkoutData.phone,
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image,
        vendor: item.vendor || 'Unknown Vendor'
      })),
      subtotal: subtotal.toFixed(2),
      shippingFee: shippingFee.toFixed(2),
      total: total.toFixed(2),
      status: 'pending',
      shippingAddress: checkoutData.address,
      zipCode: checkoutData.zipCode,
      customerName: checkoutData.name,
      message: checkoutData.message,
      paymentMethod: 'Cash on Delivery',
      isNew: true // Mark as new for notification
    };
    orders.push(newOrder);
    localStorage.setItem('customerOrders', JSON.stringify(orders));
    
    // Create vendor orders for each vendor
    items.forEach(item => {
      const vendorEmail = item.vendorEmail;
      const vendorName = item.vendor;
      
      if (vendorEmail && vendorName) {
        // Get vendor's user ID from global_users
        let globalUsers = JSON.parse(localStorage.getItem('global_users') || '[]');
        let vendor = globalUsers.find(u => u.email === vendorEmail);
        
        // If vendor doesn't exist in global_users, create a placeholder
        if (!vendor) {
          vendor = {
            id: Date.now(), // Generate unique ID
            name: vendorName,
            email: vendorEmail,
            role: 'vendor',
            vendor_status: 'approved',
            business_name: vendorName,
            createdAt: new Date().toISOString()
          };
          globalUsers.push(vendor);
          localStorage.setItem('global_users', JSON.stringify(globalUsers));
          console.log(`📝 Created vendor placeholder: ${vendorName}`);
        }
        
        // Get or create vendor orders
        const vendorOrders = JSON.parse(localStorage.getItem(`vendor_orders_${vendor.id}`) || '[]');
        
        const vendorOrder = {
          id: newOrder.id,
          customer: newOrder.customer,
          customerEmail: newOrder.customerEmail,
          customerPhone: checkoutData.phone,
          product: item.name,
          quantity: item.quantity || 1,
          total: parseFloat(item.price.replace(/,/g, '')) * (item.quantity || 1),
          status: 'pending',
          date: newOrder.date,
          dateTime: newOrder.dateTime,
          shippingAddress: checkoutData.address,
          paymentMethod: newOrder.paymentMethod,
          isNew: true // Mark as new for notification
        };
        
        vendorOrders.push(vendorOrder);
        localStorage.setItem(`vendor_orders_${vendor.id}`, JSON.stringify(vendorOrders));
        
        console.log(`✅ Order sent to vendor: ${vendorName} (${vendorEmail}) - Vendor ID: ${vendor.id}`);
      } else {
        console.warn(`⚠️ Product missing vendor info: ${item.name}`);
      }
    });

    if (loadingBar) loadingBar.style.width = '100%';

    // Clear cart if not from Buy Now
    if (!buyNowProduct) {
      clearCart();
    }

    setToastMessage('Order placed successfully!');
    setShowToast(true);

    // Complete loading bar
    if (loadingBar) {
      setTimeout(() => {
        loadingBar.classList.add('hidden');
        loadingBar.style.width = '0%';
      }, 300);
    }

    // Redirect to customer dashboard after 1.5 seconds
    setTimeout(() => {
      navigate('/customer/dashboard');
    }, 1500);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {showToast && (
        <Toast
          message={toastMessage}
          type="cart"
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="min-h-screen bg-soft-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-earth-brown hover:text-dawn-orange transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="basket-card p-6"
              >
                <h1 className="text-3xl font-playfair font-bold text-forest-green mb-6">
                  Checkout
                </h1>

                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-forest-green mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={checkoutData.name}
                      onChange={(e) => handleCheckoutChange('name', e.target.value)}
                      placeholder="Juan Dela Cruz"
                      required
                      className="w-full px-4 py-3 border border-coconut-tan rounded-lg focus:outline-none focus:ring-2 focus:ring-dawn-orange/50"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-forest-green mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={checkoutData.phone}
                      onChange={(e) => handleCheckoutChange('phone', e.target.value)}
                      placeholder="+63 XXX XXX XXXX"
                      required
                      className="w-full px-4 py-3 border border-coconut-tan rounded-lg focus:outline-none focus:ring-2 focus:ring-dawn-orange/50"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-forest-green mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Delivery Address *
                    </label>
                    <textarea
                      value={checkoutData.address}
                      onChange={(e) => handleCheckoutChange('address', e.target.value)}
                      placeholder="Street, Barangay, City, Province"
                      required
                      rows="3"
                      className="w-full px-4 py-3 border border-coconut-tan rounded-lg focus:outline-none focus:ring-2 focus:ring-dawn-orange/50"
                    />
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label className="block text-sm font-semibold text-forest-green mb-2">
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      value={checkoutData.zipCode}
                      onChange={(e) => handleCheckoutChange('zipCode', e.target.value)}
                      placeholder="5203"
                      required
                      className="w-full px-4 py-3 border border-coconut-tan rounded-lg focus:outline-none focus:ring-2 focus:ring-dawn-orange/50"
                    />
                  </div>

                  {/* Message/Request */}
                  <div>
                    <label className="block text-sm font-semibold text-forest-green mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-1" />
                      Message/Special Request (Optional)
                    </label>
                    <textarea
                      value={checkoutData.message}
                      onChange={(e) => handleCheckoutChange('message', e.target.value)}
                      placeholder="Any special instructions for this order..."
                      rows="3"
                      className="w-full px-4 py-3 border border-coconut-tan rounded-lg focus:outline-none focus:ring-2 focus:ring-dawn-orange/50"
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-semibold text-forest-green mb-2">
                      <Banknote className="w-4 h-4 inline mr-1" />
                      Payment Method
                    </label>
                    <div className="p-4 border-2 border-dawn-orange bg-dawn-orange/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-dawn-orange/20 rounded-lg flex items-center justify-center">
                          <Banknote className="w-6 h-6 text-dawn-orange" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-forest-green">Cash on Delivery</h3>
                          <p className="text-sm text-earth-brown">Pay when you receive your order</p>
                        </div>
                        <div className="w-6 h-6 bg-dawn-orange rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="basket-card p-6 sticky top-24"
              >
                <h2 className="text-2xl font-playfair font-bold text-forest-green mb-4">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-soft-white rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-forest-green text-sm line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-earth-brown">
                          Qty: {item.quantity || 1}
                        </p>
                        <p className="text-sm font-bold text-dawn-orange">
                          ₱{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment Details */}
                <div className="border-t border-coconut-tan pt-4 space-y-3">
                  <div className="flex justify-between text-earth-brown">
                    <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                    <span>₱{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-earth-brown">
                    <span>Shipping Fee</span>
                    <span>₱{shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-coconut-tan pt-3">
                    <div className="flex justify-between text-xl font-bold text-forest-green">
                      <span>Total</span>
                      <span className="text-dawn-orange">₱{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={!checkoutData.name || !checkoutData.phone || !checkoutData.address || !checkoutData.zipCode}
                  className="w-full mt-6 btn-organic bg-forest-green text-white py-4 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-forest-green/90 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Place Order - ₱{total.toFixed(2)}
                </button>

                <p className="text-xs text-earth-brown/70 text-center mt-4">
                  By placing your order, you agree to our terms and conditions
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
