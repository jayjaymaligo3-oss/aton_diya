# 💾 Data Persistence Test Guide

## ✅ What's Implemented

### LocalStorage Persistence:
- ✅ Cart saved automatically
- ✅ Wishlist saved automatically
- ✅ Orders saved automatically
- ✅ User data saved
- ✅ Data survives page refresh
- ✅ Data survives browser close

## 🧪 Testing Data Persistence

### Test 1: Cart Persistence
```
1. Add items to cart from /products
2. Check console: "Cart saved to localStorage: X items"
3. Refresh page (F5)
4. Go to /cart
5. ✅ Items still there!
```

### Test 2: Wishlist Persistence
```
1. Add items to wishlist from /products
2. Check console: "Wishlist saved to localStorage: X items"
3. Refresh page (F5)
4. Go to /wishlist
5. ✅ Items still there!
```

### Test 3: Orders Persistence
```
1. Complete checkout
2. Order created
3. Refresh page (F5)
4. Go to Dashboard → Orders
5. ✅ Orders still there!
```

### Test 4: Cross-Page Persistence
```
1. Add items to cart on /products
2. Go to /cart
3. ✅ Items visible
4. Go to /customer/dashboard
5. Click Cart tab
6. ✅ Same items visible
7. Go back to /cart
8. ✅ Still there!
```

### Test 5: Browser Close/Reopen
```
1. Add items to cart
2. Close browser completely
3. Reopen browser
4. Go to /cart
5. ✅ Items still there!
```

## 🔍 Debug Console Logs

### When Page Loads:
```
Loading cart and wishlist from localStorage...
Cart loaded: 2 items
Wishlist loaded: 2 items
```

### When Adding to Cart:
```
Adding to cart: {product object}
Updated cart (new item): [array]
Cart saved to localStorage: 3 items
```

### When Adding to Wishlist:
```
Wishlist saved to localStorage: 3 items
```

### When Removing Items:
```
Cart saved to localStorage: 2 items
Wishlist saved to localStorage: 1 items
```

## 💾 LocalStorage Structure

### Check Your Data:
```javascript
// Open browser console (F12) and run:

// View cart
console.log('Cart:', JSON.parse(localStorage.getItem('cart')));

// View wishlist
console.log('Wishlist:', JSON.parse(localStorage.getItem('wishlist')));

// View orders
console.log('Orders:', JSON.parse(localStorage.getItem('customerOrders')));

// View user
console.log('User:', JSON.parse(localStorage.getItem('demoUser')));
```

### Expected Output:
```javascript
// Cart
[
  {
    id: 1,
    name: "Product Name",
    price: "100.00",
    quantity: 2,
    image: "url",
    vendor: "Vendor Name"
  }
]

// Wishlist
[
  {
    id: 5,
    name: "Native Coffee Beans",
    price: "420.00",
    image: "url",
    vendor: "Mountain Coffee Co.",
    rating: "5.0"
  }
]

// Orders
[
  {
    id: "ORD-xxxxx",
    date: "11/23/2024",
    products: [...],
    total: "450.00",
    status: "Pending"
  }
]
```

## 🔧 Troubleshooting

### Issue 1: Items Disappearing After Refresh

**Possible Causes:**
- LocalStorage disabled in browser
- Private/Incognito mode
- Browser clearing data automatically
- Code error preventing save

**Fix:**
```javascript
// Test if localStorage works:
localStorage.setItem('test', 'value');
console.log(localStorage.getItem('test')); // Should show 'value'

// If null, localStorage is disabled
// Enable in browser settings
```

### Issue 2: Cart Shows Empty But Data Exists

**Check:**
```javascript
// In console:
const cart = localStorage.getItem('cart');
console.log('Raw cart data:', cart);
console.log('Parsed cart:', JSON.parse(cart));

// If data exists but not showing:
// 1. Check console for errors
// 2. Refresh page
// 3. Clear and re-add items
```

### Issue 3: Data Clears Randomly

**Possible Causes:**
- Browser auto-clear settings
- Incognito mode
- Storage quota exceeded
- Multiple tabs conflict

**Fix:**
```javascript
// Check storage quota:
if (navigator.storage && navigator.storage.estimate) {
  navigator.storage.estimate().then(estimate => {
    console.log('Storage used:', estimate.usage);
    console.log('Storage quota:', estimate.quota);
  });
}

// Clear old data:
localStorage.clear();
// Re-add items
```

### Issue 4: Sample Items Keep Reappearing

**Cause:** Sample items added when wishlist is empty

**Fix:**
```javascript
// If you don't want sample items:
// Remove this code from CartContext.jsx:
// else {
//   const sampleWishlist = [...];
//   setWishlist(sampleWishlist);
// }

// Or clear wishlist:
localStorage.removeItem('wishlist');
```

## 🎯 Verification Steps

### Step 1: Check Console Logs
```
1. Open console (F12)
2. Refresh page
3. Look for:
   "Loading cart and wishlist from localStorage..."
   "Cart loaded: X items"
   "Wishlist loaded: X items"
```

### Step 2: Check LocalStorage
```
1. Open DevTools (F12)
2. Go to "Application" tab
3. Click "Local Storage"
4. Click your domain
5. Look for keys:
   - cart
   - wishlist
   - customerOrders
   - demoUser
   - token
```

### Step 3: Test Persistence
```
1. Add item to cart
2. Check console: "Cart saved to localStorage: X items"
3. Refresh page
4. Check console: "Cart loaded: X items"
5. ✅ Should match!
```

### Step 4: Test Cross-Page
```
1. Add items on /products
2. Go to /cart
3. Items visible ✅
4. Go to /wishlist
5. Go back to /cart
6. Items still there ✅
```

## 📊 Data Flow

### Adding to Cart:
```
1. User clicks "Add to Cart"
2. addToCart() function called
3. setCart() updates state
4. useEffect triggers
5. localStorage.setItem('cart', JSON.stringify(cart))
6. Data saved ✅
```

### Loading Cart:
```
1. Page loads
2. useEffect runs
3. localStorage.getItem('cart')
4. JSON.parse(savedCart)
5. setCart(parsedCart)
6. Data loaded ✅
```

### Persistence:
```
Add Item → Save to localStorage → Refresh → Load from localStorage → Display
   ✅            ✅                  ✅            ✅                    ✅
```

## 🔄 Manual Testing

### Test Cart Persistence:
```javascript
// Add item manually in console:
const cart = JSON.parse(localStorage.getItem('cart')) || [];
cart.push({
  id: 999,
  name: 'Test Product',
  price: '100.00',
  quantity: 1,
  image: 'https://via.placeholder.com/300'
});
localStorage.setItem('cart', JSON.stringify(cart));
location.reload();
// Should see test product in cart
```

### Test Wishlist Persistence:
```javascript
// Add item manually in console:
const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
wishlist.push({
  id: 888,
  name: 'Test Wishlist Item',
  price: '200.00',
  image: 'https://via.placeholder.com/300',
  vendor: 'Test Vendor',
  rating: '5.0'
});
localStorage.setItem('wishlist', JSON.stringify(wishlist));
location.reload();
// Should see test item in wishlist
```

## 💡 Best Practices

### For Users:
1. Don't use Incognito mode (data won't persist)
2. Don't clear browser data frequently
3. Use same browser for consistency
4. Check console for errors

### For Developers:
1. Always save to localStorage after state change
2. Load from localStorage on mount
3. Add console logs for debugging
4. Handle JSON parse errors
5. Validate data before saving

## 🚀 Quick Verification

### Verify Everything Works:
```
1. Open console (F12)
2. Go to /products
3. Add item to cart
4. Check console: "Cart saved to localStorage: 1 items"
5. Refresh page
6. Check console: "Cart loaded: 1 items"
7. Go to /cart
8. ✅ Item visible!
9. Refresh again
10. ✅ Still there!
```

### Check LocalStorage Directly:
```javascript
// In console:
console.table({
  cart: localStorage.getItem('cart')?.length || 0,
  wishlist: localStorage.getItem('wishlist')?.length || 0,
  orders: localStorage.getItem('customerOrders')?.length || 0,
  user: localStorage.getItem('demoUser')?.length || 0
});
```

## 📝 Summary

### What's Working:
- ✅ Cart saves to localStorage
- ✅ Wishlist saves to localStorage
- ✅ Orders save to localStorage
- ✅ Data loads on page load
- ✅ Data persists across pages
- ✅ Data survives refresh
- ✅ Console logs for debugging

### If Data Still Disappears:
1. Check console for errors
2. Verify localStorage is enabled
3. Check browser settings
4. Try different browser
5. Clear all data and start fresh

### Clear All Data:
```javascript
localStorage.clear();
location.reload();
```

### Restore Sample Data:
```javascript
localStorage.clear();
location.reload();
// Sample wishlist will auto-load
// Add items to cart manually
```

---

**Dev Server:** http://localhost:3002/

**Test Cart:** http://localhost:3002/cart

**Test Wishlist:** http://localhost:3002/wishlist

Ang cart at wishlist ay naka-save na sa localStorage. Check mo ang console (F12) para makita ang logs! 📦
