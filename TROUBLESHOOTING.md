# Troubleshooting Guide - Customer Dashboard

## Quick Fix Steps

### Step 1: Clear Everything
```javascript
// Open browser console (F12) and run:
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Step 2: Test Authentication
1. Go to: **http://localhost:3001/test-auth**
2. Click "Test Register (Demo Mode)"
3. Check if user appears in "Current User" section
4. Click "Go to Customer Dashboard"
5. Should work now!

### Step 3: If Still Not Working
1. Open browser console (F12)
2. Look for red error messages
3. Check what the error says
4. Follow specific fix below

## Common Issues & Fixes

### Issue 1: White Screen / "Oops! May problema"
**Cause:** JavaScript error crashing the app

**Fix:**
1. Open console (F12)
2. Look for the actual error message
3. Clear localStorage: `localStorage.clear()`
4. Refresh page

### Issue 2: Infinite Redirect Loop
**Cause:** User role doesn't match required role

**Fix:**
```javascript
// Check user role in console:
const user = JSON.parse(localStorage.getItem('demoUser'));
console.log('User role:', user?.role);

// If wrong role, fix it:
user.role = 'customer';
localStorage.setItem('demoUser', JSON.stringify(user));
location.reload();
```

### Issue 3: "Please login first" but Already Logged In
**Cause:** User data not loaded properly

**Fix:**
```javascript
// Check if user exists:
console.log('Token:', localStorage.getItem('token'));
console.log('Demo User:', localStorage.getItem('demoUser'));

// If both are null, register again:
// Go to /test-auth and click "Test Register"
```

### Issue 4: Dashboard Shows Loading Forever
**Cause:** Auth context stuck in loading state

**Fix:**
1. Clear localStorage
2. Refresh page
3. Register again

### Issue 5: "Cannot read properties of null"
**Cause:** Trying to access user data before it's loaded

**Fix:**
- This should be fixed by ProtectedRoute
- If still happening, check console for specific line
- Report the error

## Debug Mode

### Enable Console Logging
The app now has console.log statements for debugging:

1. Open console (F12)
2. Look for messages like:
   - "ProtectedRoute: { user: ..., loading: ..., requiredRole: ... }"
   - "No user, redirecting to login"
   - "Wrong role: ..."
   - "Access granted to: ..."

### Check Auth State
```javascript
// In console:
const authState = {
  token: localStorage.getItem('token'),
  demoUser: JSON.parse(localStorage.getItem('demoUser')),
  cart: JSON.parse(localStorage.getItem('cart')),
  wishlist: JSON.parse(localStorage.getItem('wishlist'))
};
console.table(authState);
```

## Test Page Features

Go to: **http://localhost:3001/test-auth**

### What You Can Do:
1. **Test Register** - Create demo user
2. **Test Login** - Login with demo credentials
3. **Go to Dashboard** - Navigate to customer dashboard
4. **Logout** - Clear user session
5. **Clear All Data** - Reset everything

### What to Check:
- Current User section shows user data
- LocalStorage Data shows token and demoUser
- No errors in console

## Manual Registration Test

### Step-by-Step:
1. Clear all data: `localStorage.clear()`
2. Go to: http://localhost:3001/register
3. Fill in form:
   ```
   Name: Test Customer
   Email: test@example.com
   Phone: 09123456789
   Address: Bulalacao
   Password: password123
   Confirm: password123
   ```
4. Click "Create Customer Account"
5. Should redirect to /customer/dashboard
6. If error, check console

## Expected Console Output (Success)

```
Backend not available, using demo mode
ProtectedRoute: { user: { id: ..., name: "Test Customer", role: "customer" }, loading: false, requiredRole: "customer" }
Access granted to: /customer/dashboard
Adding to cart: { id: 1, name: "Product Name", ... }
Updated cart (new item): [{ id: 1, ... }]
```

## Expected Console Output (Error)

```
ProtectedRoute: { user: null, loading: false, requiredRole: "customer" }
No user, redirecting to login
```

## Still Not Working?

### Collect Debug Info:
```javascript
// Run in console:
const debugInfo = {
  url: window.location.href,
  token: localStorage.getItem('token'),
  demoUser: localStorage.getItem('demoUser'),
  cart: localStorage.getItem('cart'),
  userAgent: navigator.userAgent,
  errors: 'Check console for errors'
};
console.log('Debug Info:', JSON.stringify(debugInfo, null, 2));
```

### Check These:
1. ✅ Browser: Chrome, Firefox, Edge (latest version)
2. ✅ JavaScript enabled
3. ✅ No browser extensions blocking
4. ✅ Dev server running (http://localhost:3001)
5. ✅ No CORS errors in console

## Reset to Factory Settings

```javascript
// Complete reset:
localStorage.clear();
sessionStorage.clear();
indexedDB.deleteDatabase('keyval-store');
location.href = '/test-auth';
```

## Contact Support

If nothing works:
1. Take screenshot of console errors
2. Copy debug info from above
3. Note what you were trying to do
4. Report the issue

---

## Quick Links

- Test Page: http://localhost:3001/test-auth
- Register: http://localhost:3001/register
- Login: http://localhost:3001/login
- Dashboard: http://localhost:3001/customer/dashboard
- Products: http://localhost:3001/products
