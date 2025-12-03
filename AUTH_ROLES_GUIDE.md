# Authentication & Role-Based Access Control Guide

## Overview

Ang system ay may **role-based authentication** na nag-restrict ng access sa iba't ibang pages based sa user role.

## User Roles

### 1. **Customer** 
- Default role para sa regular users
- Access: Customer Dashboard, Cart, Wishlist, Custom Product Requests
- **Route**: `/customer/dashboard`

### 2. **Vendor**
- Para sa mga artisans/sellers
- Access: Vendor Dashboard, Product Management, Order Management, Sales Reports
- **Route**: `/vendor/dashboard`

### 3. **Admin**
- Para sa system administrators
- Access: Admin Dashboard, User Management, Analytics, System Settings
- **Route**: `/admin/dashboard`

## Protected Routes

### Customer Routes
```jsx
<Route path="/customer/dashboard" element={
  <ProtectedRoute requiredRole="customer">
    <CustomerDashboard />
  </ProtectedRoute>
} />
```

### Vendor Routes
```jsx
<Route path="/vendor/dashboard" element={
  <ProtectedRoute requiredRole="vendor">
    <VendorDashboard />
  </ProtectedRoute>
} />
```

### Admin Routes
```jsx
<Route path="/admin/dashboard" element={
  <ProtectedRoute requiredRole="admin">
    <AdminDashboard />
  </ProtectedRoute>
} />
```

## How It Works

### 1. Authentication Check
```javascript
if (!user) {
  // Redirect to login page
  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
}
```

### 2. Role Verification
```javascript
if (requiredRole && user.role !== requiredRole) {
  // Show Access Denied page
  return <AccessDenied requiredRole={requiredRole} />;
}
```

### 3. Access Granted
```javascript
// User has correct role, show the page
return children;
```

## Access Denied Page

Kapag may user na nag-try mag-access ng page na hindi para sa kanyang role:

### Features:
- ❌ Clear "Access Denied" message
- 🔒 Shows required role vs current role
- 🏠 "Go to My Dashboard" button - auto-redirect to correct dashboard
- 🏡 "Back to Home" button - return to landing page

### Visual Design:
- Red shield icon with X
- Professional error message
- Role comparison display
- Easy navigation options

## Testing Access Control

### Test Scenario 1: Customer tries to access Vendor Dashboard
1. Login as **customer** (role: "customer")
2. Try to access `/vendor/dashboard`
3. **Result**: Access Denied page appears
4. Shows: Required Role: VENDOR, Your Role: CUSTOMER

### Test Scenario 2: Vendor tries to access Admin Dashboard
1. Login as **vendor** (role: "vendor")
2. Try to access `/admin/dashboard`
3. **Result**: Access Denied page appears
4. Shows: Required Role: ADMIN, Your Role: VENDOR

### Test Scenario 3: Not logged in
1. No user logged in
2. Try to access any protected route
3. **Result**: Redirected to `/login`
4. After login, redirected back to original page (if role matches)

## Demo Users

### Customer Account
```javascript
{
  email: "customer@test.com",
  password: "password123",
  role: "customer",
  name: "Juan Dela Cruz"
}
```

### Vendor Account
```javascript
{
  email: "vendor@test.com",
  password: "password123",
  role: "vendor",
  name: "Maria's Handicrafts"
}
```

### Admin Account
```javascript
{
  email: "admin@test.com",
  password: "password123",
  role: "admin",
  name: "Admin User"
}
```

## Security Features

### ✅ Implemented
1. **Role-based routing** - Each dashboard requires specific role
2. **Authentication check** - Must be logged in
3. **Role verification** - Must have correct role
4. **Auto-redirect** - Wrong role = redirect to correct dashboard
5. **Visual feedback** - Clear access denied message
6. **Console logging** - Track access attempts

### 🔒 Best Practices
1. Always use `<ProtectedRoute>` for sensitive pages
2. Specify `requiredRole` prop
3. Check user role in components if needed
4. Store user data securely
5. Clear user data on logout

## Code Examples

### Protecting a New Route
```jsx
<Route path="/new-feature" element={
  <ProtectedRoute requiredRole="customer">
    <NewFeaturePage />
  </ProtectedRoute>
} />
```

### Checking Role in Component
```jsx
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    return <AdminFeature />;
  }
  
  return <RegularFeature />;
};
```

### Conditional Rendering by Role
```jsx
{user?.role === 'vendor' && (
  <button>Vendor Only Feature</button>
)}

{user?.role === 'customer' && (
  <button>Customer Only Feature</button>
)}
```

## Troubleshooting

### Issue: Access Denied pero tama ang role
**Solution**: 
- Check localStorage: `localStorage.getItem('user')`
- Verify role spelling (lowercase: "customer", "vendor", "admin")
- Clear cache and re-login

### Issue: Redirect loop
**Solution**:
- Check if user role matches any dashboard
- Verify ProtectedRoute logic
- Check console for errors

### Issue: Not redirecting after login
**Solution**:
- Check AuthContext login function
- Verify user object has `role` property
- Check navigation logic in login page

## Future Enhancements

### Planned Features:
1. **Permission levels** - Fine-grained permissions within roles
2. **Multi-role support** - Users with multiple roles
3. **Role hierarchy** - Admin can access all pages
4. **Session timeout** - Auto-logout after inactivity
5. **2FA** - Two-factor authentication
6. **Audit logs** - Track all access attempts

## Summary

✅ **3 User Roles**: Customer, Vendor, Admin
✅ **Protected Routes**: Role-based access control
✅ **Access Denied Page**: Professional error handling
✅ **Auto-redirect**: Users go to correct dashboard
✅ **Secure**: No unauthorized access
✅ **User-friendly**: Clear messages and navigation

Ang system ay secure at hindi pwedeng ma-access ng ibang roles ang pages na hindi para sa kanila! 🔒
