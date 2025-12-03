# Vendor Access Guide

## Test Vendor Credentials

**Email:** `vendor@test.com`  
**Password:** `vendor123`

## How to Access Vendor Dashboard

### Step 1: Go to Login Page
```
Navigate to: http://localhost:5173/login
```

### Step 2: Enter Vendor Credentials
```
Email: vendor@test.com
Password: vendor123
```

### Step 3: Click Login
- System will detect vendor credentials
- Automatically redirect to `/vendor/dashboard`

## Vendor Registration Process

### New Vendor Registration
1. Go to `/vendor/register`
2. Fill in the registration form:
   - Business Name
   - Owner Name
   - Email
   - Password (min. 8 characters)
   - Phone
   - Address
   - Product Category
   - Business Description

3. Submit application
4. **Status: Pending** - Wait for admin approval
5. Receive approval notification
6. Login with your credentials

### Admin Approval Required
- All new vendor registrations require admin approval
- Vendors with "pending" status cannot login
- Once approved, vendors can access their dashboard



## Vendor Dashboard Features

### 📊 Overview Tab (Default)
- **Stats Cards:**
  - Total Revenue: Real-time calculation from orders
  - Total Orders: Count of all orders
  - Products: Total products with active count
  - Total Sales: Sum of all product sales

- **Recent Orders:**
  - Last 5 orders with customer info
  - Order status (pending, processing, shipped, delivered)
  - Order totals

- **Top Products:**
  - Best-selling products
  - Sales count and pricing
  - Sorted by sales volume

### 📦 Products Tab
**Full Product Management:**

#### View Products
- Product list table with:
  - Product name
  - Category
  - Price
  - Stock level
  - Sales count
  - Status (Active/Out of Stock)
  - Action buttons

#### Add New Product
- Click "Add Product" button
- Fill in product details:
  - Product Name
  - Category (Handicrafts, Food Products, Textiles, Home Decor, Accessories)
  - Price (₱)
  - Stock quantity
  - Description
- Click "Add Product" to save

#### Edit Product
- Click edit icon (pencil) on any product
- Update product information
- Click "Update Product" to save changes

#### Delete Product
- Click delete icon (trash) on any product
- Confirm deletion
- Product removed from inventory

### 🛍️ Orders Tab
**Order Management System:**

#### View All Orders
- Complete order list with:
  - Order ID
  - Customer name
  - Product ordered
  - Quantity
  - Total amount
  - Order date
  - Current status

#### Update Order Status
- Change status via dropdown:
  - **Pending** - New order received
  - **Processing** - Order being prepared
  - **Shipped** - Order dispatched
  - **Delivered** - Order completed

- Status updates automatically saved
- Color-coded status badges:
  - Gray: Pending
  - Yellow: Processing
  - Blue: Shipped
  - Green: Delivered

#### View Order Details
- Click eye icon to view full order details
- Customer information
- Shipping address
- Order items

### 📈 Sales Reports Tab
**Comprehensive Analytics:**

#### Summary Cards
- **Total Revenue:** All-time earnings
- **Total Orders:** Order count
- **Average Order Value:** Revenue ÷ Orders
- **Completed Orders:** Delivered orders count

#### Sales by Product
- Visual progress bars
- Revenue per product
- Percentage of total revenue
- Sorted by performance

#### Order Status Breakdown
- Count by status (pending, processing, shipped, delivered)
- Percentage distribution
- Visual grid layout

### 🏪 Store Profile Tab
**Manage Your Store Information:**

#### View Profile
- Business Name
- Description
- Category
- Phone
- Address

#### Edit Profile
- Click "Edit Profile" button
- Update any information:
  - Business Name
  - Description
  - Category selection
  - Phone number
  - Business address
- Click "Save Changes"
- Changes persist in localStorage

## Technical Features

### Data Persistence
```javascript
// All vendor data is saved to localStorage
localStorage.setItem(`vendor_products_${user.id}`, JSON.stringify(products));
localStorage.setItem(`vendor_orders_${user.id}`, JSON.stringify(orders));
localStorage.setItem(`vendor_profile_${user.id}`, JSON.stringify(storeProfile));
```

### Real-time Updates
- Stats automatically recalculate
- Order status changes reflect immediately
- Product inventory updates in real-time

### Responsive Design
- Mobile-friendly interface
- Tablet-optimized layouts
- Desktop full-feature experience

## Vendor Dashboard UI

### Top Navigation
```
┌─────────────────────────────────────────────────┐
│ Vendor Dashboard                    [Logout]    │
│ Welcome back, Test Vendor!                      │
└─────────────────────────────────────────────────┘
```

### Tab Navigation
```
[Overview] [Products] [Orders] [Sales Reports] [Store Profile]
```

### Stats Cards Layout
```
┌──────────┬──────────┬──────────┬──────────┐
│ 💰 Revenue│ 🛍️ Orders│ 📦 Products│ 📈 Sales│
│  ₱45,250 │   156    │    24    │   105   │
│  +12.5%  │  +8.2%   │ 24 active│  +15%   │
└──────────┴──────────┴──────────┴──────────┘
```

## Security Features

### Role-Based Access
- Only users with `role: 'vendor'` can access
- Protected by ProtectedRoute component
- Automatic redirect if not authorized

### Approval Status Check
- Pending vendors cannot login
- Error message: "Your vendor application is pending admin approval"
- Only approved vendors can access dashboard

### Token Management
- Vendor token stored in localStorage
- Token format: `vendor-token-{timestamp}`
- Token checked on page refresh

### Logout
- Clears vendor token
- Clears user data
- Redirects to home page

## Testing

### Test Vendor Login
```
1. Go to http://localhost:5173/login
2. Enter:
   Email: vendor@test.com
   Password: vendor123
3. Click Login
4. ✅ Should redirect to /vendor/dashboard
5. ✅ Should see vendor dashboard with all tabs
```

### Test Product Management
```
1. Login as vendor
2. Go to Products tab
3. Click "Add Product"
4. Fill in product details
5. ✅ Product should appear in table
6. Click edit icon
7. Update product
8. ✅ Changes should save
9. Click delete icon
10. ✅ Product should be removed
```

### Test Order Management
```
1. Login as vendor
2. Go to Orders tab
3. View order list
4. Change order status via dropdown
5. ✅ Status should update immediately
6. ✅ Color badge should change
```

### Test Sales Reports
```
1. Login as vendor
2. Go to Sales Reports tab
3. ✅ Should see summary cards
4. ✅ Should see sales by product chart
5. ✅ Should see order status breakdown
```

### Test Store Profile
```
1. Login as vendor
2. Go to Store Profile tab
3. Click "Edit Profile"
4. Update business information
5. Click "Save Changes"
6. ✅ Changes should persist
7. Refresh page
8. ✅ Changes should still be there
```

### Test Protected Access
```
1. Logout from vendor
2. Try to access /vendor/dashboard directly
3. ✅ Should redirect to /login
4. ✅ Should show "Please login to continue"
```

## Sample Data

### Pre-loaded Products
```javascript
[
  { 
    id: 1, 
    name: 'Handwoven Banig Mat', 
    price: 850, 
    stock: 15, 
    sales: 45, 
    status: 'active', 
    category: 'Handicrafts' 
  },
  { 
    id: 2, 
    name: 'Coconut Shell Crafts', 
    price: 450, 
    stock: 8, 
    sales: 32, 
    status: 'active', 
    category: 'Home Decor' 
  },
  { 
    id: 3, 
    name: 'Bamboo Baskets', 
    price: 650, 
    stock: 0, 
    sales: 28, 
    status: 'out_of_stock', 
    category: 'Handicrafts' 
  }
]
```

### Pre-loaded Orders
```javascript
[
  { 
    id: 1001, 
    customer: 'Juan Dela Cruz', 
    product: 'Handwoven Banig Mat', 
    quantity: 2, 
    total: 1700, 
    status: 'pending', 
    date: '2024-11-20' 
  },
  { 
    id: 1002, 
    customer: 'Maria Santos', 
    product: 'Coconut Shell Crafts', 
    quantity: 3, 
    total: 1350, 
    status: 'processing', 
    date: '2024-11-21' 
  },
  { 
    id: 1003, 
    customer: 'Pedro Garcia', 
    product: 'Bamboo Baskets', 
    quantity: 1, 
    total: 650, 
    status: 'shipped', 
    date: '2024-11-22' 
  }
]
```

## Color Scheme

### Stats Cards
- 🟢 Green: Revenue (bg-green-500)
- 🔵 Blue: Orders (bg-blue-500)
- 🟣 Purple: Products (bg-purple-500)
- 🟠 Orange: Sales (bg-orange-500)

### Status Colors
- **Pending:** Gray (bg-gray-100 text-gray-700)
- **Processing:** Yellow (bg-yellow-100 text-yellow-700)
- **Shipped:** Blue (bg-blue-100 text-blue-700)
- **Delivered:** Green (bg-green-100 text-green-700)

### Action Buttons
- Edit: Dawn Orange (text-dawn-orange)
- Delete: Red (text-red-600)
- View: Sea Blue (text-sea-blue)

## Future Enhancements

### Backend Integration
```javascript
// Fetch real vendor data
const fetchVendorData = async () => {
  const response = await fetch('/api/vendor/dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
```

### Image Upload
```javascript
// Product image upload
const handleImageUpload = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('/api/vendor/products/upload', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.json();
};
```

### Real-time Notifications
```javascript
// WebSocket for live order updates
const ws = new WebSocket('ws://localhost:8000/vendor');

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  if (update.type === 'new_order') {
    setOrders([update.order, ...orders]);
    showNotification('New order received!');
  }
};
```

### Advanced Analytics
```javascript
// Chart.js integration
import { Line, Bar, Doughnut } from 'react-chartjs-2';

<Line data={salesTrendData} options={chartOptions} />
<Bar data={productPerformanceData} />
<Doughnut data={categoryDistribution} />
```

## Troubleshooting

### Can't login as vendor?
```
Check credentials:
Email: vendor@test.com (case-sensitive!)
Password: vendor123 (exact match!)
```

### "Pending approval" error?
```
Your vendor application is awaiting admin approval.
Contact admin or use test credentials:
Email: vendor@test.com
Password: vendor123
```

### Dashboard not loading?
```
1. Check browser console for errors
2. Clear localStorage: localStorage.clear()
3. Refresh page
4. Try login again
```

### Products not saving?
```
1. Check if all required fields are filled
2. Verify localStorage is enabled
3. Check browser console for errors
4. Try adding product again
```

### Orders not updating?
```
1. Refresh the page
2. Check localStorage data
3. Verify order status dropdown is working
4. Check browser console for errors
```

## Summary

✅ **Vendor dashboard is fully functional!**

Features:
- 🔐 Secure vendor login with test credentials
- 📊 Comprehensive dashboard with stats
- 📦 Full product management (CRUD)
- 🛍️ Order management with status updates
- 📈 Sales reports and analytics
- 🏪 Store profile management
- 💾 Data persistence with localStorage
- 🎨 Beautiful, responsive design
- 🛡️ Role-based access control
- ✅ Admin approval workflow

**Test Login:**
- Email: `vendor@test.com`
- Password: `vendor123`
- URL: `http://localhost:5173/login`

**New Vendor Registration:**
- URL: `http://localhost:5173/vendor/register`
- Status: Pending (requires admin approval)

🎉 Start managing your store now!
