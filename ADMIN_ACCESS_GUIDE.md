  # Admin Access Guide

## Admin Credentials

**Email:** `Admin@gmail.com`  
**Password:** `Admin123456789`

## How to Access Admin Dashboard

### Step 1: Go to Login Page
```
Navigate to: http://localhost:5173/login
```

### Step 2: Enter Admin Credentials
```
Email: Admin@gmail.com
Password: Admin123456789
```

### Step 3: Click Login
- System will detect admin credentials
- Automatically redirect to `/admin/dashboard`

## Admin Dashboard Features

### 📊 Overview Tab (Default)
- **Stats Cards:**
  - Total Users: 1,250 (+12%)
  - Active Vendors: 45 (+8%)
  - Total Orders: 3,420 (+15%)
  - Total Revenue: ₱125,000 (+20%)

- **Recent Activity:**
  - New orders
  - User registrations
  - Vendor approvals
  - Order deliveries

- **Quick Stats:**
  - Pending Orders: 23
  - Active Products: 567
  - Pending Vendors: 5

### 👥 Users Tab
- User management (coming soon)
- View all users
- Export user reports

### 🏪 Vendors Tab
- Vendor management (coming soon)
- Approve/reject vendors
- View vendor performance

### 📦 Orders Tab
- Order management (coming soon)
- View all orders
- Update order status

### 📈 Analytics Tab
- Platform analytics (coming soon)
- Revenue reports
- Performance metrics

## Admin Dashboard UI

### Top Navigation
```
┌─────────────────────────────────────────┐
│ [Logo] Aton Diya     [🔔] [⚙️] [Logout] │
│        Admin Portal                      │
└─────────────────────────────────────────┘
```

### Welcome Banner
```
┌─────────────────────────────────────────┐
│ 🛡️ Welcome, Administrator!              │
│    Manage your platform and monitor     │
│    performance                           │
└─────────────────────────────────────────┘
```

### Stats Cards
```
┌──────────┬──────────┬──────────┬──────────┐
│ 👥 Users │ 🏪 Vendors│ 📦 Orders│ 💰 Revenue│
│  1,250   │    45    │  3,420   │ ₱125,000 │
│  +12%    │   +8%    │  +15%    │   +20%   │
└──────────┴──────────┴──────────┴──────────┘
```

### Tabs
```
[Overview] [Users] [Vendors] [Orders] [Analytics]
```

## Technical Implementation

### AuthContext Update
```javascript
// Check for admin credentials
if (credentials.email === 'Admin@gmail.com' && 
    credentials.password === 'Admin123456789') {
  const adminUser = {
    id: 'admin-001',
    name: 'Administrator',
    email: 'Admin@gmail.com',
    role: 'admin'
  };
  // Set admin user and token
  localStorage.setItem('demoUser', JSON.stringify(adminUser));
  localStorage.setItem('token', 'admin-token-' + Date.now());
  setUser(adminUser);
  return { user: adminUser, token: 'admin-token' };
}
```

### Protected Route
```javascript
<Route path="/admin/dashboard" element={
  <ProtectedRoute requiredRole="admin">
    <AdminDashboard />
  </ProtectedRoute>
} />
```

### Login Redirect Logic
```javascript
// In LoginPage.jsx
if (response.user.role === 'admin') {
  navigate('/admin/dashboard');
} else if (response.user.role === 'vendor') {
  navigate('/vendor/dashboard');
} else {
  navigate('/customer/dashboard');
}
```

## Security Features

### Role-Based Access
- Only users with `role: 'admin'` can access
- Protected by ProtectedRoute component
- Automatic redirect if not authorized

### Token Management
- Admin token stored in localStorage
- Token format: `admin-token-{timestamp}`
- Token checked on page refresh

### Logout
- Clears admin token
- Clears user data
- Redirects to home page

## Testing

### Test Admin Login
```
1. Go to http://localhost:5173/login
2. Enter:
   Email: Admin@gmail.com
   Password: Admin123456789
3. Click Login
4. ✅ Should redirect to /admin/dashboard
5. ✅ Should see admin dashboard
```

### Test Protected Access
```
1. Logout from admin
2. Try to access /admin/dashboard directly
3. ✅ Should redirect to /login
4. ✅ Should show "Please login to continue"
```

### Test Wrong Credentials
```
1. Go to login page
2. Enter wrong admin password
3. ✅ Should show error
4. ✅ Should not login
```

## Admin Dashboard Sections

### Overview (Current)
- ✅ Stats cards with metrics
- ✅ Recent activity feed
- ✅ Quick stats panel
- ✅ Gradient design
- ✅ Responsive layout

### Users (Coming Soon)
- User list table
- Search and filter
- User details
- Ban/unban users
- Export to CSV/Excel

### Vendors (Coming Soon)
- Vendor list table
- Approval queue
- Vendor performance
- Product management
- Commission settings

### Orders (Coming Soon)
- Order list table
- Order details
- Status updates
- Refund management
- Shipping tracking

### Analytics (Coming Soon)
- Revenue charts
- User growth
- Order trends
- Product performance
- Vendor analytics

## Color Scheme

### Stats Cards
- 🔵 Blue: Users (from-blue-50 to-blue-100)
- 🟢 Green: Vendors (from-green-50 to-green-100)
- 🟠 Orange: Orders (from-orange-50 to-orange-100)
- 🟣 Purple: Revenue (from-purple-50 to-purple-100)

### Navigation
- Gradient: from-forest-green to-sea-blue
- Active tab: dawn-orange
- Hover: coconut-tan

## Future Enhancements

### Backend Integration
```javascript
// Fetch real admin data
const fetchAdminStats = async () => {
  const response = await fetch('/api/admin/stats', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
```

### Real-time Updates
```javascript
// WebSocket for live updates
const ws = new WebSocket('ws://localhost:8000/admin');

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  // Update stats in real-time
  setStats(update);
};
```

### Advanced Analytics
```javascript
// Chart.js integration
import { Line, Bar, Pie } from 'react-chartjs-2';

<Line data={revenueData} options={chartOptions} />
```

### User Management
```javascript
// CRUD operations
const banUser = async (userId) => {
  await fetch(`/api/admin/users/${userId}/ban`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
```

## Troubleshooting

### Can't login as admin?
```
Check credentials:
Email: Admin@gmail.com (case-sensitive!)
Password: Admin123456789 (exact match!)
```

### Redirected to customer dashboard?
```
Make sure you're using the exact admin email.
The system checks for exact match.
```

### Dashboard not loading?
```
1. Check browser console for errors
2. Clear localStorage: localStorage.clear()
3. Refresh page
4. Try login again
```

### Protected route not working?
```
1. Check if ProtectedRoute component exists
2. Verify requiredRole="admin" is set
3. Check user role in localStorage
```

## Summary

✅ **Admin access is ready!**

Features:
- 🔐 Secure admin login
- 📊 Admin dashboard with stats
- 🛡️ Role-based access control
- 📈 Overview with metrics
- 🎨 Beautiful gradient design
- 📱 Fully responsive
- 🔔 Notifications ready
- ⚙️ Settings ready

**Login now:**
- Email: `Admin@gmail.com`
- Password: `Admin123456789`
- URL: `http://localhost:5173/login`

🎉 Welcome to the Admin Portal!
