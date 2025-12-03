# 🎯 START FRESH - Complete Reset & Test Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Clear Everything
```javascript
// Open browser console (F12) and run:
localStorage.clear();
sessionStorage.clear();
```

### Step 2: Go to Debug Page
```
Open: http://localhost:3002/debug
```

### Step 3: Run Tests
```
1. Click "Run All Tests"
2. Check results (most will pass, except user status)
```

### Step 4: Register User
```
1. Click "Go to Auth Test"
2. Click "Test Register (Demo Mode)"
3. Should see user data appear
```

### Step 5: Test Add to Cart
```
1. Go back to /debug
2. Click "Test Add to Cart"
3. Should see cart count increase to 1
```

### Step 6: Test Dashboard
```
1. Click "Go to Dashboard"
2. Should load successfully
3. Click "Cart" tab
4. Should see test product
```

### Step 7: Test Checkout
```
1. Click "Proceed to Checkout"
2. Modal should open
3. Complete 3 steps:
   - Review Order
   - Shipping Info
   - Payment Method
4. Click "Place Order"
5. Should see success message
6. Cart cleared automatically
```

## ✅ Success Indicators

### After Each Step:
- ✅ Step 1: Console shows "Storage cleared"
- ✅ Step 2: Debug page loads
- ✅ Step 3: All tests show ✓ (except user)
- ✅ Step 4: User Status shows ✓
- ✅ Step 5: Cart Items shows 1
- ✅ Step 6: Dashboard loads, cart tab works
- ✅ Step 7: Checkout completes, success message

## 🔧 If Something Fails

### Debug Page Not Loading:
```
1. Check dev server is running
2. Go to: http://localhost:3002/
3. Should see landing page
4. Then try /debug again
```

### Tests Failing:
```
1. Read the error message
2. Check console (F12) for details
3. Try "Clear All & Reload" button
4. Run tests again
```

### Can't Register:
```
1. Clear localStorage again
2. Refresh page
3. Try /test-auth page
4. Click "Test Register"
5. Check "Current User" section
```

### Add to Cart Fails:
```
1. Verify user is logged in
2. Check "User Status" on debug page
3. If not logged in, register again
4. Try "Test Add to Cart" button
```

### Dashboard White Screen:
```
1. Open console (F12)
2. Look for red errors
3. Copy error message
4. Go to /debug page
5. Run tests to identify issue
```

### Checkout Not Opening:
```
1. Verify cart has items
2. Go to /debug page
3. Check "Cart Items" count
4. If 0, add items first
5. Try checkout again
```

## 📊 Complete Test Checklist

### Authentication:
- [ ] Clear localStorage
- [ ] Go to /test-auth
- [ ] Click "Test Register"
- [ ] User data appears
- [ ] Token saved in localStorage

### Cart Functionality:
- [ ] Go to /debug
- [ ] Click "Test Add to Cart"
- [ ] Cart count increases
- [ ] Cart total updates
- [ ] Item appears in cart list

### Dashboard:
- [ ] Click "Go to Dashboard"
- [ ] Dashboard loads
- [ ] Overview tab shows stats
- [ ] Cart tab shows items
- [ ] Wishlist tab works
- [ ] Profile tab shows user info

### Checkout:
- [ ] Cart has items
- [ ] Click "Proceed to Checkout"
- [ ] Modal opens
- [ ] Step 1: Review order
- [ ] Step 2: Fill shipping info
- [ ] Step 3: Select payment
- [ ] Click "Place Order"
- [ ] Success message appears
- [ ] Cart cleared
- [ ] Redirected to orders

### Products Page:
- [ ] Go to /products
- [ ] Products load
- [ ] Hover over product
- [ ] Click cart icon
- [ ] Item added to cart
- [ ] Toast notification appears
- [ ] Floating cart button updates

## 🎯 Full Flow Test

### Complete User Journey:
```
1. START: Clear all data
   → localStorage.clear()

2. REGISTER: Create account
   → /test-auth
   → "Test Register"
   → Verify user data

3. BROWSE: View products
   → /products
   → See product cards
   → Hover to see actions

4. ADD TO CART: Add items
   → Click cart icon on products
   → See toast notification
   → Check floating cart button

5. VIEW CART: Check dashboard
   → /customer/dashboard
   → Click "Cart" tab
   → See added items
   → Update quantities

6. CHECKOUT: Complete order
   → Click "Proceed to Checkout"
   → Fill shipping info
   → Select payment
   → Place order

7. SUCCESS: Verify completion
   → See success message
   → Cart cleared
   → Redirected to orders

8. VERIFY: Check everything
   → Go to /debug
   → Run all tests
   → All should pass ✓
```

## 🔍 Debugging Tools

### Browser Console (F12):
```javascript
// Check user
console.log('User:', JSON.parse(localStorage.getItem('demoUser')));

// Check cart
console.log('Cart:', JSON.parse(localStorage.getItem('cart')));

// Check token
console.log('Token:', localStorage.getItem('token'));

// Test cart function
// (Only works if on a page with cart context)
```

### Debug Page Tests:
- Authentication test
- Cart context test
- Cart data test
- Wishlist test
- LocalStorage test

### Network Tab:
- Check for failed requests
- Look for 404 errors
- Verify API calls (if backend running)

## 📱 Pages Overview

### /debug
- Test all functionality
- View current state
- Quick actions
- Test results

### /test-auth
- Register demo user
- Login demo user
- View user data
- Clear data

### /customer/dashboard
- Overview stats
- My orders
- Wishlist
- Cart
- Profile
- Checkout modal

### /products
- Browse products
- Add to cart
- Add to wishlist
- View details

## 💡 Tips & Tricks

1. **Always start with /debug** - See what's working
2. **Check console first** - Errors show there
3. **Use test pages** - Easier than manual testing
4. **Clear data often** - Fresh start helps
5. **Test in order** - Auth → Cart → Checkout
6. **Watch the console** - Real-time feedback
7. **Use debug page** - Built-in diagnostics

## 🆘 Emergency Reset

### Nuclear Option:
```javascript
// Complete reset
localStorage.clear();
sessionStorage.clear();
indexedDB.deleteDatabase('keyval-store');

// Reload
location.href = '/debug';
```

### If Still Broken:
```bash
# Terminal:
# Stop server (Ctrl+C)
npm run build
npm run dev

# Browser:
localStorage.clear();
location.href = '/debug';
```

## ✨ Expected Behavior

### Working System:
- ✅ Debug page loads
- ✅ All tests pass
- ✅ Can register user
- ✅ Can add to cart
- ✅ Dashboard loads
- ✅ Checkout works
- ✅ No console errors

### Broken System:
- ❌ White screens
- ❌ Console errors
- ❌ Tests fail
- ❌ Can't add to cart
- ❌ Checkout doesn't open

## 🎉 Success!

When everything works:
1. All tests pass ✓
2. No console errors
3. Can complete full checkout
4. Cart persists
5. Dashboard loads fast

---

## 📞 Quick Links

- **Debug:** http://localhost:3002/debug
- **Auth Test:** http://localhost:3002/test-auth
- **Dashboard:** http://localhost:3002/customer/dashboard
- **Products:** http://localhost:3002/products
- **Home:** http://localhost:3002/

**Start here:** http://localhost:3002/debug
