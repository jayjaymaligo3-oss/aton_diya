# Admin Login - Access Fixed

## ✅ Admin Credentials

### Demo Mode (Without Backend):
```
Email: admin@gmail.com (or admin@example.com)
Password: Admin123456789 (or password or admin123)
```

### Database Mode (With Backend):
```
Email: (your admin email in database)
Password: (your admin password)
Role: admin (must be set in database)
```

## 🔧 How to Fix "Access Denied"

### Problem: Shows "Required Role: CUSTOMER, Your Role: ADMIN"
This means the route is checking for wrong role.

### Solution 1: Check User Role in Database
```sql
SELECT id, name, email, role FROM users WHERE email = 'admin@example.com';
```

Make sure `role` column = `'admin'` (lowercase)

### Solution 2: Update User Role
```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

### Solution 3: Create Admin User
```bash
php artisan tinker
```
```php
User::create([
    'name' => 'Administrator',
    'email' => 'admin@example.com',
    'password' => bcrypt('password'),
    'role' => 'admin'  // Important!
]);
```

## 🐛 Debugging

### Check Console Logs:
Open browser console (F12) and look for:
```
Access Denied - User role: customer Required: admin
User object: { role: 'customer', ... }
```

### Check localStorage:
```javascript
// In browser console:
JSON.parse(localStorage.getItem('demoUser'))
// Should show: { role: 'admin', ... }
```

### Check API Response:
```javascript
// In Network tab, check /api/login response:
{
  "user": {
    "role": "admin"  // Must be "admin"
  }
}
```

## ✅ Correct Setup

### 1. Database User:
```
role = 'admin' (lowercase, exactly)
```

### 2. Demo User:
```javascript
{
  id: 'admin-001',
  name: 'Administrator',
  email: 'admin@gmail.com',
  role: 'admin'  // lowercase
}
```

### 3. Protected Route:
```javascript
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>
```

## 🚀 Quick Test

### 1. Clear Storage:
```javascript
localStorage.clear();
```

### 2. Login with Admin:
```
Email: admin@gmail.com
Password: Admin123456789
```

### 3. Check Role:
```javascript
JSON.parse(localStorage.getItem('demoUser')).role
// Should return: "admin"
```

### 4. Access Dashboard:
```
http://localhost:3000/admin/dashboard
```

## ⚠️ Common Issues

### Issue 1: "Access Denied" even with admin role
**Cause:** Role mismatch (Admin vs admin)
**Fix:** Ensure role is lowercase "admin"

### Issue 2: Redirects to login
**Cause:** Not authenticated
**Fix:** Login first, check token exists

### Issue 3: Shows customer dashboard
**Cause:** Wrong role in database
**Fix:** Update user role to 'admin'

## 📝 Role Values

### Valid Roles:
- `'admin'` - Full access to admin dashboard
- `'vendor'` - Access to vendor dashboard
- `'customer'` - Access to customer dashboard

### Case Sensitive:
- ✅ `'admin'` (correct)
- ❌ `'Admin'` (wrong)
- ❌ `'ADMIN'` (wrong)

## 🎯 Success Checklist

- [ ] User role is exactly 'admin' (lowercase)
- [ ] Login successful
- [ ] Token stored in localStorage
- [ ] User object has role: 'admin'
- [ ] No "Access Denied" message
- [ ] Admin dashboard loads

If all checked, admin access should work! 🎉
