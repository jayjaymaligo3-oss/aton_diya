# Quick Admin Test

## Admin Login Credentials

```
Email: Admin@gmail.com
Password: Admin123456789
```

## Quick Test Steps

### 1. ✅ Login as Admin
```
1. Go to http://localhost:5173/login
2. Enter email: Admin@gmail.com
3. Enter password: Admin123456789
4. Click Login
5. ✅ Should redirect to /admin/dashboard
```

### 2. ✅ Check Admin Dashboard
```
✅ Welcome banner with "Administrator"
✅ 4 stats cards visible:
   - Total Users: 1,250
   - Active Vendors: 45
   - Total Orders: 3,420
   - Total Revenue: ₱125,000
✅ 5 tabs: Overview, Users, Vendors, Orders, Analytics
✅ Recent Activity section
✅ Quick Stats section
```

### 3. ✅ Test Navigation
```
1. Click "Users" tab
   ✅ Shows "Users Management" placeholder
2. Click "Vendors" tab
   ✅ Shows "Vendors Management" placeholder
3. Click "Orders" tab
   ✅ Shows "Orders Management" placeholder
4. Click "Analytics" tab
   ✅ Shows "Analytics Management" placeholder
5. Click "Overview" tab
   ✅ Back to overview
```

### 4. ✅ Test Logout
```
1. Click Logout button (top right)
2. ✅ Should redirect to home page
3. ✅ Admin session cleared
```

### 5. ✅ Test Protected Access
```
1. After logout, try to access /admin/dashboard
2. ✅ Should redirect to /login
3. ✅ Should show "Please login to continue"
```

## What You Should See

### Login Page
```
┌─────────────────────────┐
│ Email: [Admin@gmail.com]│
│ Password: [***********] │
│ [Login Button]          │
└─────────────────────────┘
```

### Admin Dashboard
```
┌─────────────────────────────────────────┐
│ Aton Diya - Admin Portal    [🔔][⚙️][⚠️]│
├─────────────────────────────────────────┤
│ 🛡️ Welcome, Administrator!              │
├─────────────────────────────────────────┤
│ [👥 1,250] [🏪 45] [📦 3,420] [💰 125K] │
├─────────────────────────────────────────┤
│ [Overview][Users][Vendors][Orders][📊]  │
├─────────────────────────────────────────┤
│ Recent Activity    │ Quick Stats        │
│ • New order        │ Pending: 23        │
│ • New user         │ Products: 567      │
│ • Vendor approved  │ Vendors: 5         │
└─────────────────────────────────────────┘
```

## Browser Console Check

```javascript
// Check if admin is logged in
const user = JSON.parse(localStorage.getItem('demoUser'));
console.log(user);
// Should show: { id: 'admin-001', name: 'Administrator', email: 'Admin@gmail.com', role: 'admin' }

// Check token
const token = localStorage.getItem('token');
console.log(token);
// Should show: admin-token-{timestamp}
```

## Troubleshooting

### Login not working?
```
✅ Check email: Admin@gmail.com (case-sensitive!)
✅ Check password: Admin123456789 (exact!)
✅ Clear browser cache
✅ Try incognito mode
```

### Dashboard not showing?
```
✅ Check URL: /admin/dashboard
✅ Check browser console for errors
✅ Refresh page (F5)
```

### Redirected to customer dashboard?
```
✅ Make sure email is exactly: Admin@gmail.com
✅ Not admin@gmail.com (lowercase won't work)
```

## ✅ Success Checklist

- [ ] Can login with admin credentials
- [ ] Redirects to /admin/dashboard
- [ ] Shows admin welcome message
- [ ] Shows 4 stats cards
- [ ] Shows 5 tabs
- [ ] Recent activity visible
- [ ] Quick stats visible
- [ ] Can switch between tabs
- [ ] Can logout successfully
- [ ] Protected route works

## 🎉 Ready!

Admin dashboard is ready to use!
Login with the credentials above and start managing the platform!
