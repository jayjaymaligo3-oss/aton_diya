# 🗄️ Database Integration Guide - Cart & Orders

## 📊 Current Status

### What's Working Now (LocalStorage):
- ✅ Cart saved in browser localStorage
- ✅ Orders saved in browser localStorage
- ✅ User data in localStorage
- ✅ Works without backend
- ❌ Data not shared across devices
- ❌ Data lost if browser cleared
- ❌ No real database storage

### What We Need (Database):
- 🎯 Cart saved in MySQL database
- 🎯 Orders saved in MySQL database
- 🎯 User authentication via Laravel
- 🎯 Data synced across devices
- 🎯 Persistent data storage
- 🎯 Real backend integration

## 🏗️ Backend Setup Required

### 1. Laravel Backend Structure

#### Database Tables Needed:

**users table:**
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    role ENUM('customer', 'vendor', 'admin'),
    password VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

**cart_items table:**
```sql
CREATE TABLE cart_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    product_id BIGINT,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

**orders table:**
```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    order_number VARCHAR(50) UNIQUE,
    subtotal DECIMAL(10,2),
    shipping_fee DECIMAL(10,2),
    total DECIMAL(10,2),
    status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
    payment_method VARCHAR(50),
    shipping_name VARCHAR(255),
    shipping_phone VARCHAR(20),
    shipping_address TEXT,
    shipping_city VARCHAR(100),
    shipping_province VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**order_items table:**
```sql
CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT,
    product_id BIGINT,
    product_name VARCHAR(255),
    product_price DECIMAL(10,2),
    quantity INT,
    subtotal DECIMAL(10,2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### 2. Laravel API Endpoints Needed

#### Authentication:
```php
POST   /api/register          - Register new user
POST   /api/login             - Login user
POST   /api/logout            - Logout user
GET    /api/user              - Get current user
```

#### Cart:
```php
GET    /api/cart              - Get user's cart items
POST   /api/cart              - Add item to cart
PUT    /api/cart/{id}         - Update cart item quantity
DELETE /api/cart/{id}         - Remove item from cart
DELETE /api/cart              - Clear entire cart
```

#### Orders:
```php
GET    /api/orders            - Get user's orders
POST   /api/orders            - Create new order
GET    /api/orders/{id}       - Get order details
PUT    /api/orders/{id}       - Update order status
DELETE /api/orders/{id}       - Cancel order
```

### 3. Laravel Controllers

#### CartController.php:
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cartItems = CartItem::with('product')
            ->where('user_id', $request->user()->id)
            ->get();
            
        return response()->json($cartItems);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1'
        ]);
        
        $cartItem = CartItem::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'product_id' => $validated['product_id']
            ],
            [
                'quantity' => DB::raw('quantity + ' . ($validated['quantity'] ?? 1))
            ]
        );
        
        return response()->json($cartItem->load('product'));
    }
    
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);
        
        $cartItem = CartItem::where('user_id', $request->user()->id)
            ->findOrFail($id);
            
        $cartItem->update($validated);
        
        return response()->json($cartItem->load('product'));
    }
    
    public function destroy(Request $request, $id)
    {
        CartItem::where('user_id', $request->user()->id)
            ->findOrFail($id)
            ->delete();
            
        return response()->json(['message' => 'Item removed']);
    }
    
    public function clear(Request $request)
    {
        CartItem::where('user_id', $request->user()->id)->delete();
        
        return response()->json(['message' => 'Cart cleared']);
    }
}
```

#### OrderController.php:
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with('items.product')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($orders);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'payment_method' => 'required|string',
            'shipping_name' => 'required|string',
            'shipping_phone' => 'required|string',
            'shipping_address' => 'required|string',
            'shipping_city' => 'required|string',
            'shipping_province' => 'required|string',
        ]);
        
        DB::beginTransaction();
        
        try {
            // Get cart items
            $cartItems = CartItem::with('product')
                ->where('user_id', $request->user()->id)
                ->get();
                
            if ($cartItems->isEmpty()) {
                return response()->json(['error' => 'Cart is empty'], 400);
            }
            
            // Calculate totals
            $subtotal = $cartItems->sum(function($item) {
                return $item->product->price * $item->quantity;
            });
            $shippingFee = 50.00;
            $total = $subtotal + $shippingFee;
            
            // Create order
            $order = Order::create([
                'user_id' => $request->user()->id,
                'order_number' => 'ORD-' . strtoupper(Str::random(10)),
                'subtotal' => $subtotal,
                'shipping_fee' => $shippingFee,
                'total' => $total,
                'status' => 'Pending',
                'payment_method' => $validated['payment_method'],
                'shipping_name' => $validated['shipping_name'],
                'shipping_phone' => $validated['shipping_phone'],
                'shipping_address' => $validated['shipping_address'],
                'shipping_city' => $validated['shipping_city'],
                'shipping_province' => $validated['shipping_province'],
            ]);
            
            // Create order items
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'product_name' => $cartItem->product->name,
                    'product_price' => $cartItem->product->price,
                    'quantity' => $cartItem->quantity,
                    'subtotal' => $cartItem->product->price * $cartItem->quantity,
                ]);
            }
            
            // Clear cart
            CartItem::where('user_id', $request->user()->id)->delete();
            
            DB::commit();
            
            return response()->json($order->load('items'));
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Order creation failed'], 500);
        }
    }
    
    public function show(Request $request, $id)
    {
        $order = Order::with('items.product')
            ->where('user_id', $request->user()->id)
            ->findOrFail($id);
            
        return response()->json($order);
    }
}
```

### 4. Laravel Models

#### CartItem.php:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
```

#### Order.php:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_number',
        'subtotal',
        'shipping_fee',
        'total',
        'status',
        'payment_method',
        'shipping_name',
        'shipping_phone',
        'shipping_address',
        'shipping_city',
        'shipping_province'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
```

## 🔧 Frontend Integration

### 1. Update API Service

Create/Update `src/services/api.js`:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Laravel backend URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 2. Update CartContext

Update `src/context/CartContext.jsx`:
```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Fallback to localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCart();
    }
  }, []);

  const addToCart = async (product, quantity = 1) => {
    try {
      const response = await api.post('/cart', {
        product_id: product.id,
        quantity
      });
      
      // Refresh cart
      await fetchCart();
      
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Fallback to localStorage
      setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...product, quantity }];
      });
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(itemId);
    }
    
    try {
      await api.put(`/cart/${itemId}`, { quantity });
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart');
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.product?.price || item.price || 0);
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
```

### 3. Update Order Creation

In `CustomerDashboard.jsx`, update `handlePlaceOrder`:
```javascript
const handlePlaceOrder = async () => {
  try {
    setLoading(true);
    
    const response = await api.post('/orders', {
      payment_method: paymentMethod,
      shipping_name: shippingInfo.fullName,
      shipping_phone: shippingInfo.phone,
      shipping_address: shippingInfo.address,
      shipping_city: shippingInfo.city,
      shipping_province: shippingInfo.province
    });
    
    // Show success
    setCheckoutStep(4);
    
    // Refresh orders
    await fetchOrders();
    
    // Clear cart
    await clearCart();
    
    // Redirect after delay
    setTimeout(() => {
      setShowCheckout(false);
      setCheckoutStep(1);
      setActiveTab('orders');
    }, 3000);
    
  } catch (error) {
    console.error('Order creation error:', error);
    alert('Failed to create order. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

## 📝 Migration Steps

### Step 1: Setup Laravel Backend
```bash
cd laravel-backend

# Run migrations
php artisan migrate

# Create controllers
php artisan make:controller Api/CartController
php artisan make:controller Api/OrderController

# Create models
php artisan make:model CartItem -m
php artisan make:model Order -m
php artisan make:model OrderItem -m
```

### Step 2: Add API Routes
In `routes/api.php`:
```php
Route::middleware('auth:sanctum')->group(function () {
    // Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    Route::delete('/cart', [CartController::class, 'clear']);
    
    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
});
```

### Step 3: Update Frontend
```bash
cd react-frontend

# Update CartContext.jsx
# Update CustomerDashboard.jsx
# Update api.js
```

### Step 4: Test Integration
```bash
# Start Laravel backend
cd laravel-backend
php artisan serve

# Start React frontend
cd react-frontend
npm run dev
```

## 🧪 Testing Checklist

- [ ] User can register
- [ ] User can login
- [ ] Add to cart saves to database
- [ ] Cart persists across devices
- [ ] Update quantity works
- [ ] Remove from cart works
- [ ] Checkout creates order in database
- [ ] Orders appear in Orders tab
- [ ] Order details load from database
- [ ] Cart clears after checkout

## 🔄 Migration Strategy

### Phase 1: Dual Mode (Current + Database)
- Keep localStorage as fallback
- Try database first
- Fall back to localStorage if fails
- Gradual migration

### Phase 2: Database Only
- Remove localStorage code
- Full database integration
- Better error handling
- Real-time sync

## 📞 Next Steps

1. **Setup Laravel Backend**
   - Create database tables
   - Add API endpoints
   - Test with Postman

2. **Update Frontend**
   - Update CartContext
   - Update API calls
   - Test integration

3. **Deploy**
   - Deploy Laravel backend
   - Update frontend API URL
   - Test production

---

**Current:** LocalStorage only (working)
**Target:** Database integration (requires backend setup)

**Backend URL:** http://localhost:8000/api
**Frontend URL:** http://localhost:3002
