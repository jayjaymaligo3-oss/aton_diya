# 📦 Sample Data - Orders & Wishlist

## ✅ What's Added

### 1. **Sample Orders** (3 orders)
- ✅ Order 1: Delivered (7 days ago)
- ✅ Order 2: Shipped (3 days ago)
- ✅ Order 3: Processing (today)
- ✅ Complete order details
- ✅ Product images
- ✅ Tracking status

### 2. **Sample Wishlist** (2 items)
- ✅ Native Coffee Beans
- ✅ Woven Table Runners
- ✅ Product images
- ✅ Prices and ratings

### 3. **Auto-Initialize**
- ✅ Loads on first visit
- ✅ Saved to localStorage
- ✅ Persists across sessions
- ✅ Shows in dashboard

## 📋 Sample Orders Details

### Order 1: ORD-001 (Delivered)
```javascript
{
  id: 'ORD-001',
  date: '7 days ago',
  status: 'Delivered',
  items: 2,
  products: [
    {
      name: 'Handwoven Banig Mat',
      price: '₱850.00',
      quantity: 1
    },
    {
      name: 'Coconut Shell Bowl Set',
      price: '₱450.00',
      quantity: 1
    }
  ],
  total: '₱1,350.00',
  paymentMethod: 'Cash on Delivery'
}
```

### Order 2: ORD-002 (Shipped)
```javascript
{
  id: 'ORD-002',
  date: '3 days ago',
  status: 'Shipped',
  items: 1,
  products: [
    {
      name: 'Bamboo Woven Basket',
      price: '₱650.00',
      quantity: 1
    }
  ],
  total: '₱700.00',
  paymentMethod: 'GCash'
}
```

### Order 3: ORD-003 (Processing)
```javascript
{
  id: 'ORD-003',
  date: 'Today',
  status: 'Processing',
  items: 1,
  products: [
    {
      name: 'Organic Wild Honey',
      price: '₱350.00',
      quantity: 2
    }
  ],
  total: '₱750.00',
  paymentMethod: 'Cash on Delivery'
}
```

## ❤️ Sample Wishlist Items

### Item 1: Native Coffee Beans
```javascript
{
  id: 5,
  name: 'Native Coffee Beans',
  price: '₱420.00',
  vendor: 'Mountain Coffee Co.',
  rating: '5.0',
  image: 'Coffee beans image'
}
```

### Item 2: Woven Table Runners
```javascript
{
  id: 6,
  name: 'Woven Table Runners',
  price: '₱480.00',
  vendor: 'Textile Artisans',
  rating: '4.8',
  image: 'Table runner image'
}
```

## 🎯 Where to See

### Dashboard Overview Tab:
- ✅ Total Orders: 3
- ✅ Wishlist: 2 items
- ✅ Recent Orders section shows 3 orders
- ✅ Quick actions available

### My Orders Tab:
- ✅ All 3 orders displayed
- ✅ Complete details for each
- ✅ Tracking timeline
- ✅ Product images
- ✅ Shipping info
- ✅ Status badges

### Wishlist Tab:
- ✅ 2 items displayed
- ✅ Product images
- ✅ Prices shown
- ✅ "Add to Cart" button
- ✅ Remove button

### Stats Cards:
- ✅ Total Orders: 3
- ✅ Cart Items: (dynamic)
- ✅ Wishlist: 2
- ✅ Member Status: Gold

## 🔄 How It Works

### First Visit:
```
1. User opens dashboard
2. Check localStorage for orders
3. If none found, create sample orders
4. Save to localStorage
5. Display in dashboard
```

### Subsequent Visits:
```
1. User opens dashboard
2. Load orders from localStorage
3. Display existing orders
4. Include any new orders created
```

### Adding New Orders:
```
1. User completes checkout
2. New order added to list
3. Saved to localStorage
4. Appears in Orders tab
5. Sample orders still visible
```

## 💾 Data Storage

### LocalStorage Keys:
```javascript
// Orders
localStorage.getItem('customerOrders')

// Wishlist
localStorage.getItem('wishlist')

// Cart
localStorage.getItem('cart')
```

### Data Structure:
```javascript
// Orders Array
[
  {
    id: 'ORD-001',
    date: '11/16/2024',
    dateTime: '2024-11-16T...',
    items: 2,
    products: [...],
    subtotal: '1300.00',
    shippingFee: '50.00',
    total: '1350.00',
    status: 'Delivered',
    paymentMethod: 'cod',
    shippingInfo: {...}
  },
  // ... more orders
]

// Wishlist Array
[
  {
    id: 5,
    name: 'Product Name',
    price: '420.00',
    image: 'url',
    vendor: 'Vendor Name',
    rating: '5.0'
  },
  // ... more items
]
```

## 🧪 Testing

### Test 1: View Sample Orders
```
1. Clear localStorage (optional)
2. Go to dashboard
3. Click "My Orders" tab
4. ✅ See 3 sample orders
```

### Test 2: View Order Details
```
1. Go to Orders tab
2. See order details:
   - Product images ✅
   - Quantities ✅
   - Prices ✅
   - Status ✅
   - Tracking timeline ✅
```

### Test 3: View Wishlist
```
1. Go to Wishlist tab
2. ✅ See 2 sample items
3. ✅ Images displayed
4. ✅ Prices shown
```

### Test 4: Add New Order
```
1. Add items to cart
2. Complete checkout
3. Go to Orders tab
4. ✅ New order + sample orders visible
```

### Test 5: Stats Cards
```
1. Check Overview tab
2. ✅ Total Orders: 3
3. ✅ Wishlist: 2
4. ✅ Cart Items: (your items)
```

## 🎨 Visual Display

### Orders Tab:
```
My Orders (3)

┌─────────────────────────────────┐
│ ORD-001        [Delivered]      │
│ 11/16/2024                      │
│                                 │
│ Products:                       │
│ • Handwoven Banig Mat           │
│ • Coconut Shell Bowl Set        │
│                                 │
│ Total: ₱1,350.00                │
│                                 │
│ Tracking:                       │
│ ✓ Pending                       │
│ ✓ Processing                    │
│ ✓ Shipped                       │
│ ✓ Delivered                     │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ ORD-002        [Shipped]        │
│ 11/20/2024                      │
│ ...                             │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ ORD-003        [Processing]     │
│ 11/23/2024                      │
│ ...                             │
└─────────────────────────────────┘
```

### Wishlist Tab:
```
My Wishlist (2 items)

┌──────────┐  ┌──────────┐
│ [Image]  │  │ [Image]  │
│ Coffee   │  │ Table    │
│ Beans    │  │ Runners  │
│ ₱420.00  │  │ ₱480.00  │
│ [Add]    │  │ [Add]    │
└──────────┘  └──────────┘
```

## 🔧 Customization

### Add More Sample Orders:
Edit `CustomerDashboard.jsx`:
```javascript
const sampleOrders = [
  // ... existing orders
  {
    id: 'ORD-004',
    date: new Date().toLocaleDateString(),
    // ... more details
  }
];
```

### Add More Wishlist Items:
Edit `CartContext.jsx`:
```javascript
const sampleWishlist = [
  // ... existing items
  {
    id: 7,
    name: 'New Product',
    price: '500.00',
    // ... more details
  }
];
```

### Clear Sample Data:
```javascript
// In browser console (F12)
localStorage.removeItem('customerOrders');
localStorage.removeItem('wishlist');
location.reload();
```

## 📊 Benefits

### For Testing:
- ✅ Instant data to test with
- ✅ No need to create orders manually
- ✅ See how UI looks with data
- ✅ Test all features immediately

### For Demo:
- ✅ Professional appearance
- ✅ Shows functionality
- ✅ Realistic data
- ✅ Complete user experience

### For Development:
- ✅ Easy to test features
- ✅ Consistent test data
- ✅ Quick iteration
- ✅ No backend needed

## 🗄️ Database Integration

### Current (LocalStorage):
- ✅ Sample data auto-loads
- ✅ Persists in browser
- ✅ Works offline
- ✅ No backend needed

### Future (Database):
- 🎯 Load from MySQL
- 🎯 Real user orders
- 🎯 Sync across devices
- 🎯 Backend API calls

See `DATABASE_INTEGRATION_GUIDE.md` for database setup.

## 🚀 Quick Start

### See Sample Data:
```
1. Go to: http://localhost:3002/customer/dashboard
2. Click "My Orders" tab
3. ✅ See 3 sample orders!
4. Click "Wishlist" tab
5. ✅ See 2 sample items!
```

### Clear and Reload:
```javascript
// Browser console (F12)
localStorage.clear();
location.reload();
// Sample data will reload automatically
```

## ✨ Summary

### What's Working:
- ✅ 3 sample orders with complete details
- ✅ 2 sample wishlist items
- ✅ Auto-initialize on first visit
- ✅ Saved to localStorage
- ✅ Displays in dashboard
- ✅ Realistic data
- ✅ Professional appearance

### Where to See:
- 📦 Orders Tab - All orders
- ❤️ Wishlist Tab - Saved items
- 🏠 Overview Tab - Recent orders
- 📊 Stats Cards - Counts

---

**Dashboard:** http://localhost:3002/customer/dashboard

**Now with sample data!** 🎉
