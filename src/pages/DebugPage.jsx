import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Package, AlertCircle, CheckCircle } from 'lucide-react';

const DebugPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { cart, wishlist, addToCart, getCartTotal, getCartCount } = useCart();
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState([]);

  const addTestResult = (test, passed, message) => {
    setTestResults(prev => [...prev, { test, passed, message, time: new Date().toLocaleTimeString() }]);
  };

  const testProduct = {
    id: 999,
    name: 'Test Product',
    price: '100.00',
    description: 'Test product for debugging',
    image: 'https://via.placeholder.com/300',
    vendor: 'Test Vendor',
    rating: '5.0'
  };

  const runTests = () => {
    setTestResults([]);
    
    // Test 1: Check Auth
    try {
      if (user) {
        addTestResult('Authentication', true, `User logged in: ${user.name}`);
      } else {
        addTestResult('Authentication', false, 'No user logged in');
      }
    } catch (error) {
      addTestResult('Authentication', false, `Error: ${error.message}`);
    }

    // Test 2: Check Cart Context
    try {
      if (typeof addToCart === 'function') {
        addTestResult('Cart Context', true, 'addToCart function available');
      } else {
        addTestResult('Cart Context', false, 'addToCart is not a function');
      }
    } catch (error) {
      addTestResult('Cart Context', false, `Error: ${error.message}`);
    }

    // Test 3: Check Cart Data
    try {
      addTestResult('Cart Data', true, `Cart has ${cart.length} items`);
      addTestResult('Cart Count', true, `getCartCount() = ${getCartCount()}`);
      addTestResult('Cart Total', true, `getCartTotal() = ₱${getCartTotal().toFixed(2)}`);
    } catch (error) {
      addTestResult('Cart Data', false, `Error: ${error.message}`);
    }

    // Test 4: Check Wishlist
    try {
      addTestResult('Wishlist', true, `Wishlist has ${wishlist.length} items`);
    } catch (error) {
      addTestResult('Wishlist', false, `Error: ${error.message}`);
    }

    // Test 5: Check LocalStorage
    try {
      const token = localStorage.getItem('token');
      const demoUser = localStorage.getItem('demoUser');
      const cartData = localStorage.getItem('cart');
      
      addTestResult('LocalStorage - Token', !!token, token ? 'Token exists' : 'No token');
      addTestResult('LocalStorage - User', !!demoUser, demoUser ? 'Demo user exists' : 'No demo user');
      addTestResult('LocalStorage - Cart', !!cartData, cartData ? `Cart data: ${cartData.length} chars` : 'No cart data');
    } catch (error) {
      addTestResult('LocalStorage', false, `Error: ${error.message}`);
    }
  };

  const testAddToCart = () => {
    try {
      if (!user) {
        addTestResult('Add to Cart', false, 'User not logged in');
        return;
      }
      
      addToCart(testProduct);
      addTestResult('Add to Cart', true, 'Test product added successfully');
      
      setTimeout(() => {
        addTestResult('Cart Update', true, `Cart now has ${getCartCount()} items`);
      }, 100);
    } catch (error) {
      addTestResult('Add to Cart', false, `Error: ${error.message}`);
    }
  };

  useEffect(() => {
    runTests();
  }, [user, cart, wishlist]);

  return (
    <div className="min-h-screen bg-soft-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="basket-card p-8 mb-6">
          <h1 className="text-3xl font-playfair font-bold text-forest-green mb-4">
            🔧 Debug & Test Page
          </h1>
          <p className="text-earth-brown mb-4">
            This page helps identify issues with cart and checkout functionality.
          </p>
          
          {authLoading && (
            <div className="bg-blue-100 border-2 border-blue-500 p-4 rounded-lg mb-4">
              <p className="text-blue-700">Loading authentication...</p>
            </div>
          )}
        </div>

        {/* Current State */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="basket-card p-6">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-dawn-orange" />
              <span className="text-3xl font-bold text-forest-green">
                {user ? '✓' : '✗'}
              </span>
            </div>
            <h3 className="text-earth-brown font-semibold">User Status</h3>
            <p className="text-sm text-earth-brown/70">
              {user ? `Logged in as ${user.name}` : 'Not logged in'}
            </p>
          </div>

          <div className="basket-card p-6">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-8 h-8 text-dawn-orange" />
              <span className="text-3xl font-bold text-forest-green">
                {getCartCount()}
              </span>
            </div>
            <h3 className="text-earth-brown font-semibold">Cart Items</h3>
            <p className="text-sm text-earth-brown/70">
              Total: ₱{getCartTotal().toFixed(2)}
            </p>
          </div>

          <div className="basket-card p-6">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-8 h-8 text-dawn-orange" />
              <span className="text-3xl font-bold text-forest-green">
                {wishlist.length}
              </span>
            </div>
            <h3 className="text-earth-brown font-semibold">Wishlist</h3>
            <p className="text-sm text-earth-brown/70">
              Saved items
            </p>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="basket-card p-6 mb-6">
          <h2 className="text-xl font-semibold text-forest-green mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={runTests}
              className="btn-organic bg-blue-600 text-white py-3 font-semibold"
            >
              Run All Tests
            </button>
            
            <button
              onClick={testAddToCart}
              disabled={!user}
              className="btn-organic bg-green-600 text-white py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test Add to Cart
            </button>

            <button
              onClick={() => navigate('/customer/dashboard')}
              disabled={!user}
              className="btn-organic bg-dawn-orange text-white py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Go to Dashboard
            </button>

            <button
              onClick={() => navigate('/products')}
              className="btn-organic border-2 border-dawn-orange text-dawn-orange py-3 font-semibold"
            >
              Go to Products
            </button>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="btn-organic border-2 border-red-500 text-red-500 py-3 font-semibold"
            >
              Clear All & Reload
            </button>

            <button
              onClick={() => navigate('/test-auth')}
              className="btn-organic border-2 border-dawn-orange text-dawn-orange py-3 font-semibold"
            >
              Go to Auth Test
            </button>
          </div>
        </div>

        {/* Test Results */}
        <div className="basket-card p-6">
          <h2 className="text-xl font-semibold text-forest-green mb-4">Test Results</h2>
          {testResults.length === 0 ? (
            <p className="text-earth-brown text-center py-8">
              Click "Run All Tests" to see results
            </p>
          ) : (
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    result.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}
                >
                  {result.passed ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`font-semibold ${result.passed ? 'text-green-800' : 'text-red-800'}`}>
                      {result.test}
                    </p>
                    <p className={`text-sm ${result.passed ? 'text-green-700' : 'text-red-700'}`}>
                      {result.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{result.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Contents */}
        {cart.length > 0 && (
          <div className="basket-card p-6 mt-6">
            <h2 className="text-xl font-semibold text-forest-green mb-4">Current Cart Contents</h2>
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center gap-4 border-b border-coconut-tan pb-3">
                  <img
                    src={item.image || 'https://via.placeholder.com/60'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-forest-green">{item.name}</p>
                    <p className="text-sm text-earth-brown">Qty: {item.quantity} × ₱{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6 mt-6">
          <h3 className="font-semibold text-yellow-800 mb-3">📋 Troubleshooting Steps:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700">
            <li>Check if user is logged in (should show ✓)</li>
            <li>Run all tests to see what's working</li>
            <li>If not logged in, go to "Auth Test" page</li>
            <li>Try "Test Add to Cart" button</li>
            <li>Check test results for any errors</li>
            <li>If issues persist, click "Clear All & Reload"</li>
            <li>Open browser console (F12) for detailed errors</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;
