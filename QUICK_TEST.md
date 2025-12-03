# Quick Test Guide - Customer Dashboard Access

## Problema na Na-fix
- ✅ Customer dashboard ay nag-crash (white screen)
- ✅ Hindi maka-access ng dashboard after registration
- ✅ Walang authentication check
- ✅ Walang demo mode para sa testing

## Solusyon
1. **Demo Mode** - Gumagana kahit walang backend
2. **ProtectedRoute** - Automatic authentication check
3. **Role-Based Access** - Customer/Vendor separation
4. **Proper Registration Flow** - Register → Auto-login → Dashboard

## Test Now! 🚀

### Step 1: Register as Customer
```
1. Open: http://localhost:3001/register
2. Fill in:
   - Name: Juan Dela Cruz
   - Email: juan@test.com
   - Phone: 09123456789
   - Address: Bulalacao
   - Password: password123
   - Confirm Password: password123
3. Click "Create Customer Account"
4. ✅ Should redirect to /customer/dashboard
5. ✅ Should see "Welcome back, Juan Dela Cruz!"
```

### Step 2: Test Add to Cart (Requires Login)
```
1. Go to: http://localhost:3001/products
2. Hover over any product
3. Click the shopping cart icon
4. ✅ Should add to cart (you're logged in)
5. ✅ Check floating cart button (bottom-right)
6. ✅ Should show item count
```

### Step 3: Test Logout and Protected Route
```
1. Click "Logout" in dashboard
2. Try to access: http://localhost:3001/customer/dashboard
3. ✅ Should redirect to /login
4. Login again
5. ✅ Should return to /customer/dashboard
```

### Step 4: Register as Vendor
```
1. Logout
2. Go to: http://localhost:3001/register?role=vendor
3. Select "Vendor" role
4. Fill in form + business details
5. Click "Create Vendor Account"
6. ✅ Should redirect to /vendor/dashboard
```

### Step 5: Test Role-Based Access
```
1. Login as customer
2. Try: http://localhost:3001/vendor/dashboard
3. ✅ Should redirect to /customer/dashboard
```

## Expected Results

### ✅ Customer Registration
- Form submission works
- Auto-login after registration
- Redirect to customer dashboard
- User data saved (demo mode)

### ✅ Customer Dashboard
- No white screen
- Shows user name
- Shows orders, wishlist, cart
- Can logout

### ✅ Add to Cart
- Requires login
- Shows error toast if not logged in
- Redirects to login page
- Returns to previous page after login

### ✅ Protected Routes
- Cannot access dashboard without login
- Automatic redirect to login
- Returns to intended page after login
- Role-based access control

## Demo Credentials

### Any Email/Password Works!
```
Email: test@example.com
Password: anything
```

Demo mode will create a user automatically.

## Clear Demo Data

If you want to start fresh:
```javascript
// Open browser console (F12)
localStorage.clear();
location.reload();
```

## Troubleshooting

### White Screen?
1. Open browser console (F12)
2. Check for errors
3. Clear localStorage
4. Refresh page

### Can't Login?
1. Check console for errors
2. Demo mode should work automatically
3. Try clearing localStorage

### Wrong Dashboard?
1. Check user role in console:
   ```javascript
   JSON.parse(localStorage.getItem('demoUser'))
   ```
2. Should show correct role

## Success Indicators

✅ No white screen errors
✅ Registration works
✅ Login works
✅ Dashboard loads
✅ Add to cart requires login
✅ Protected routes work
✅ Role-based access works

## Next Steps

1. Test all features
2. Report any issues
3. Backend integration (when ready)
4. Production deployment
