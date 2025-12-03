# 🚨 Quick Fix Guide - White Screen & Checkout Issues

## Problem
- White screen when adding to cart
- Checkout not working
- Dashboard not loading

## 🔧 IMMEDIATE FIX

### Step 1: Clear Everything
```javascript
// Open browser console (F12) and paste:
localStorage.clear();
sessionStorage.clear();
location.href = '/debug';
```

### Step 2: Use Debug Page
```
1. Go to: http://localhost:3002/debug
2. Click "Run All Tests"
3. Check which tests fail
4. Follow the instructions on the page
```

### Step 3: Register Fresh
```
1. From debug page, click "Go to Auth Test"
2. Click "Test Register (Demo Mode)"
3. Verify user appears in "Current User"
4. Click "Go to Dashboard"
```

## 🎯 Debug Page Features

### What It Does:
- ✅ Tests authentication
- ✅ Tests cart functionality
- ✅ Tests localStorage
- ✅ Shows current state
- ✅ Provides quick actions
- ✅ Displays test results

### Quick Actions:
1. **Run All Tests** - Check what's working
2. **Test Add to Cart** - Try adding test product
3. **Go to Dashboard** - Navigate to dashboard
4. **Go to Products** - Browse products
5. **Clear All & Reload** - Reset everything
6. **Go to Auth Test** - Test authentication

## 📋 Troubleshooting Steps

### If White Screen:
```
1. Open console (F12)
2. Look for red errors
3. Go to /debug page
4. Run all tests
5. Check which test fails
6. Clear all data
7. Register again
```

### If Checkout Not Working:
```
1. Go to /debug page
2. Check "Cart Items" count
3. Click "Test Add to Cart"
4. Verify cart updates
5. Go to dashboard
6. Try checkout again
```

### If Add to Cart Not Working:
```
1. Verify you're logged in
2. Go to /debug page
3. Check "User Status" (should show ✓)
4. If not logged in:
   - Go to /test-auth
   - Click "Test Register"
   - Try again
```

## 🔍 Common Issues

### Issue 1: Not Logged In
**Symptoms:** Can't add to cart, redirects to login
**Fix:**
```
1. Go to: http://localhost:3002/test-auth
2. Click "Test Register (Demo Mode)"
3. Should see user data
4. Try add to cart again
```

### Issue 2: Cart Context Error
**Symptoms:** "Cannot read properties of undefined"
**Fix:**
```
1. Check console for exact error
2. Go to /debug page
3. Run tests
4. If "Cart Context" fails:
   - Clear localStorage
   - Reload page
   - Register again
```

### Issue 3: LocalStorage Issues
**Symptoms:** Data not persisting
**Fix:**
```javascript
// Clear and test:
localStorage.clear();
localStorage.setItem('test', 'value');
console.log(localStorage.getItem('test')); // Should show 'value'
location.reload();
```

### Issue 4: Checkout Modal Not Opening
**Symptoms:** Click checkout, nothing happens
**Fix:**
```
1. Go to /debug page
2. Check cart has items
3. Check console for errors
4. Try "Test Add to Cart"
5. Go to dashboard
6. Try checkout again
```

## 🧪 Test Sequence

### Complete Test Flow:
```
1. Clear all data
   → localStorage.clear()

2. Go to debug page
   → http://localhost:3002/debug

3. Run all tests
   → Click "Run All Tests"
   → All should pass except "User Status"

4. Register user
   → Click "Go to Auth Test"
   → Click "Test Register"
   → Should see user data

5. Test add to cart
   → Go back to /debug
   → Click "Test Add to Cart"
   → Should see cart count increase

6. Test dashboard
   → Click "Go to Dashboard"
   → Should load without errors
   → Check Cart tab

7. Test checkout
   → Add items to cart
   → Click "Proceed to Checkout"
   → Should open modal
   → Complete steps
```

## 📊 Expected Test Results

### All Tests Passing:
```
✓ Authentication - User logged in: [Name]
✓ Cart Context - addToCart function available
✓ Cart Data - Cart has X items
✓ Cart Count - getCartCount() = X
✓ Cart Total - getCartTotal() = ₱XXX.XX
✓ Wishlist - Wishlist has X items
✓ LocalStorage - Token - Token exists
✓ LocalStorage - User - Demo user exists
✓ LocalStorage - Cart - Cart data: XXX chars
```

### If Tests Fail:
- ❌ Authentication → Go to /test-auth and register
- ❌ Cart Context → Reload page
- ❌ LocalStorage → Clear and try again

## 🚀 Quick Links

- **Debug Page:** http://localhost:3002/debug
- **Auth Test:** http://localhost:3002/test-auth
- **Dashboard:** http://localhost:3002/customer/dashboard
- **Products:** http://localhost:3002/products

## 💡 Pro Tips

1. **Always check console first** (F12)
2. **Use debug page** to identify issues
3. **Clear data** when in doubt
4. **Test in order** (auth → cart → checkout)
5. **Check localStorage** for data persistence

## 🆘 Still Not Working?

### Last Resort:
```bash
# Stop dev server (Ctrl+C)
# Clear node_modules cache
npm run build
npm run dev
```

Then:
```javascript
// In browser:
localStorage.clear();
location.href = '/debug';
```

---

## 📞 Need Help?

1. Go to /debug page
2. Run all tests
3. Take screenshot of results
4. Check console for errors
5. Report specific failing test
