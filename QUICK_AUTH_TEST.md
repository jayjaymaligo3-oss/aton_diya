# Quick Auth & Role Testing Guide

## Mabilis na Pag-test ng Role-Based Access

### Step 1: Prepare Test Accounts

Gumawa ng 3 test accounts sa localStorage:

```javascript
// Customer Account
localStorage.setItem('user', JSON.stringify({
  id: 1,
  name: 'Juan Customer',
  email: 'customer@test.com',
  role: 'customer'
}));

// Vendor Account
localStorage.setItem('user', JSON.stringify({
  id: 2,
  name: 'Maria Vendor',
  email: 'vendor@test.com',
  role: 'vendor',
  businessName: 'Maria\'s Handicrafts'
}));

// Admin Account
localStorage.setItem('user', JSON.stringify({
  id: 3,
  name: 'Admin User',
  email: 'admin@test.com',
  role: 'admin'
}));
```

### Step 2: Test Access Control

#### Test 1: Customer Access
1. Login as **customer**
2. ✅ Can access: `/customer/dashboard`
3. ❌ Cannot access: `/vendor/dashboard` (Access Denied)
4. ❌ Cannot access: `/admin/dashboard` (Access Denied)

#### Test 2: Vendor Access
1. Login as **vendor**
2. ✅ Can access: `/vendor/dashboard`
3. ❌ Cannot access: `/customer/dashboard` (Access Denied)
4. ❌ Cannot access: `/admin/dashboard` (Access Denied)

#### Test 3: Admin Access
1. Login as **admin**
2. ✅ Can access: `/admin/dashboard`
3. ❌ Cannot access: `/customer/dashboard` (Access Denied)
4. ❌ Cannot access: `/vendor/dashboard` (Access Denied)

### Step 3: Verify Access Denied Page

Kapag nag-try mag-access ng wrong dashboard:

**Dapat makita:**
- 🛡️ Red shield icon with X
- "Access Denied" heading
- Required Role vs Your Role comparison
- "Go to My Dashboard" button
- "Back to Home" button

### Step 4: Test Navigation

1. Click "Go to My Dashboard" - dapat mag-redirect sa correct dashboard
2. Click "Back to Home" - dapat bumalik sa landing page

## Console Logs

I-check ang browser console (F12) para makita ang logs:

```
ProtectedRoute: { user: {...}, loading: false, requiredRole: "customer", path: "/customer/dashboard" }
Access granted to: /customer/dashboard
```

O kung mali ang role:
```
Access Denied - Wrong role: vendor required: customer
```

## Quick Test Script

Paste sa browser console:

```javascript
// Test Customer
localStorage.setItem('user', JSON.stringify({
  id: 1, name: 'Test Customer', email: 'customer@test.com', role: 'customer'
}));
window.location.href = '/customer/dashboard';

// After testing, try vendor dashboard (should be denied)
setTimeout(() => {
  window.location.href = '/vendor/dashboard';
}, 3000);
```

## Expected Results

### ✅ Correct Access
- Page loads normally
- No error messages
- Full functionality available

### ❌ Denied Access
- Access Denied page appears
- Shows role mismatch
- Provides navigation options
- Cannot see protected content

## Troubleshooting

### Hindi gumagana ang access control?
1. Check localStorage: `localStorage.getItem('user')`
2. Verify role property exists
3. Check spelling (lowercase: "customer", "vendor", "admin")
4. Refresh page after setting user

### Walang lumalabas na Access Denied page?
1. Check if AccessDenied component is imported
2. Verify ProtectedRoute is using AccessDenied
3. Check console for errors
4. Clear browser cache

### Redirect loop?
1. Verify user role matches a valid dashboard
2. Check ProtectedRoute logic
3. Ensure role is set correctly

## Success Indicators

✅ Customer can only access Customer Dashboard
✅ Vendor can only access Vendor Dashboard  
✅ Admin can only access Admin Dashboard
✅ Access Denied page shows for wrong roles
✅ Navigation buttons work correctly
✅ Console logs show access attempts

Tapos! Secure na ang system! 🔒✨
