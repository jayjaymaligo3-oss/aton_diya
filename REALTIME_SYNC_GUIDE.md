# Real-Time Dashboard Synchronization Guide

## Overview

Ang system ay may **centralized data management** gamit ang React Context API at localStorage. Lahat ng dashboards (Admin, Vendor, Customer) ay **real-time connected** at synchronized.

## Features

### ✅ Connected Dashboards
- **Admin Dashboard** - Nakikita lahat ng transactions, users, vendors, at products
- **Vendor Dashboard** - Nakikita ang sariling products at orders
- **Customer Dashboard** - Nakikita ang sariling orders at notifications

### ✅ Real-Time Notifications
- Automatic notification pag may:
  - New order
  - Order status update
  - Product changes
  - Vendor applications
  - Low stock alerts
- Auto-refresh every 5 seconds
- Cross-tab synchronization (pag nag-update sa isang tab, makikita sa lahat)

### ✅ Synchronized Data
- **Products** - Shared across all dashboards
- **Orders** - Visible to admin, vendor (own orders), customer (own orders)
- **Users** - Managed by admin
- **Vendors** - Applications visible to admin
- **Notifications** - Role-based filtering

## How It Works

### 1. DataSyncContext
Located at: `src/context/DataSyncContext.jsx`

Provides centralized state management:
```javascript
const {
  products,
  orders,
  users,
  vendors,
  notifications,
  
  // Operations
  addProduct,
  updateProduct,
  deleteProduct,
  addOrder,
  updateOrder,
  updateOrderStatus,
  
  // Notifications
  addNotification,
  getNotifications,
  getUnreadCount,
  markNotificationAsRead
} = useDataSync();
```

### 2. NotificationCenter Component
Located at: `src/components/NotificationCenter.jsx`

Real-time notification dropdown na pwedeng gamitin sa lahat ng dashboards:
- Auto-refresh every 5 seconds
- Unread count badge
- Mark as read functionality
- Delete notifications
- Priority indicators

### 3. Sample Data
Located at: `src/utils/initializeSampleData.js`

Automatic initialization ng sample data para sa testing:
- 3 Users (2 customers, 1 vendor)
- 1 Approved vendor
- 4 Products
- 4 Orders (different statuses)
- 5 Notifications

## Usage Examples

### Adding a New Order (Customer)
```javascript
import { useDataSync } from '../context/DataSyncContext';

const { addOrder } = useDataSync();

const handlePlaceOrder = () => {
  const newOrder = addOrder({
    customerId: user.id,
    customerName: user.name,
    vendorId: product.vendorId,
    vendorName: product.vendorName,
    productId: product.id,
    product: product.name,
    quantity: 2,
    price: product.price,
    total: product.price * 2
  });
  
  // Automatically creates notifications for:
  // - Vendor (new order received)
  // - Admin (new order placed)
};
```

### Updating Order Status (Vendor)
```javascript
const { updateOrderStatus } = useDataSync();

const handleShipOrder = (orderId) => {
  updateOrderStatus(orderId, 'shipped');
  
  // Automatically notifies:
  // - Customer (order shipped)
  // - Vendor (order updated)
};
```

### Getting Vendor's Data
```javascript
const { getVendorProducts, getVendorOrders } = useDataSync();

const vendorProducts = getVendorProducts(user.id);
const vendorOrders = getVendorOrders(user.id);
```

### Getting Notifications
```javascript
const { getNotifications, getUnreadCount } = useDataSync();

const notifications = getNotifications(user.id, user.role);
const unreadCount = getUnreadCount(user.id, user.role);
```

## Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                    DataSyncContext                       │
│  (Centralized State + localStorage + Cross-tab Sync)    │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│    Admin     │    │   Vendor     │    │  Customer    │
│  Dashboard   │    │  Dashboard   │    │  Dashboard   │
└──────────────┘    └──────────────┘    └──────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
                  ┌──────────────────┐
                  │ NotificationCenter│
                  │  (Real-time)     │
                  └──────────────────┘
```

## Testing

### 1. Test Cross-Dashboard Sync
1. Open Admin Dashboard sa isang tab
2. Open Vendor Dashboard sa another tab
3. Add product sa Vendor Dashboard
4. Check Admin Dashboard - dapat makita yung new product

### 2. Test Real-Time Notifications
1. Open Vendor Dashboard
2. Simulate new order (pwede sa Customer Dashboard or manually add)
3. Check notification bell - dapat may new notification

### 3. Test Cross-Tab Sync
1. Open same dashboard sa 2 tabs
2. Update data sa isang tab
3. Check other tab - dapat automatic update

## Clearing Data

Para i-clear ang sample data:
```javascript
import { clearAllData } from './utils/initializeSampleData';

clearAllData(); // Clears all localStorage data
```

## Future Enhancements

### Planned Features:
- [ ] WebSocket integration for true real-time updates
- [ ] Backend API integration
- [ ] Push notifications
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Real-time chat between vendor and customer
- [ ] Live order tracking
- [ ] Analytics dashboard with real-time charts

## Troubleshooting

### Notifications not showing?
- Check if user is logged in
- Check if user.id and user.role are set
- Check browser console for errors
- Try refreshing the page

### Data not syncing?
- Check localStorage in DevTools
- Clear localStorage and refresh
- Check if DataSyncProvider is wrapping the app

### Cross-tab not working?
- Make sure both tabs are on same domain
- Check if localStorage is enabled
- Try in incognito mode to test fresh

## Notes

- Data is stored in localStorage (client-side only)
- Para sa production, i-integrate sa backend API
- Notifications auto-refresh every 5 seconds
- Maximum 100 notifications per user (auto-cleanup)
- Sample data auto-initializes on first load

## Support

For issues or questions, check:
- Console logs for debugging
- React DevTools for component state
- localStorage in Application tab
