# Order Actions Guide - Gabay sa Order Actions

## Mga Bagong Features sa My Orders

### 1. 🔄 Order Again (for Delivered orders)
**Functionality:**
- Automatically adds all products from the order back to cart
- Shows success message with item count
- Auto-switches to Cart tab after 0.8 seconds
- Hover effect (green background)

**Paano gamitin:**
1. Pumunta sa "My Orders" tab
2. Hanapin ang delivered order
3. Click "🔄 Order Again" button
4. ✅ All items added to cart!
5. Automatic redirect to Cart tab

**Example:**
```
Order: ORD-001 (Delivered)
Products:
- Handwoven Banig Mat (1x)
- Coconut Shell Bowl Set (1x)

Click "Order Again" →
✅ 2 item(s) added to cart!
→ Redirects to Cart tab
```

### 2. ❌ Cancel Order (for Pending orders)
**Functionality:**
- Allows cancellation of pending orders
- Shows confirmation dialog
- Updates order status to "Cancelled"
- Hover effect (red background)

**Paano gamitin:**
1. Pumunta sa "My Orders" tab
2. Hanapin ang pending order
3. Click "Cancel Order" button
4. Confirm cancellation
5. ✅ Order cancelled!

### 3. 📦 Track Order (for Processing/Shipped orders)
**Functionality:**
- Shows tracking information
- Displays current status
- Shows estimated delivery time
- Hover effect (blue background)

**Paano gamitin:**
1. Pumunta sa "My Orders" tab
2. Hanapin ang processing/shipped order
3. Click "📦 Track Order" button
4. ✅ View tracking info!

**Example Alert:**
```
Tracking order ORD-002
Status: Shipped
Estimated delivery: 2-3 days
```

### 4. 💬 Contact Support (for all orders)
**Functionality:**
- Shows contact information
- Available for all order statuses
- Quick access to support
- Hover effect (brown background)

**Paano gamitin:**
1. Pumunta sa "My Orders" tab
2. Click "💬 Contact Support" on any order
3. ✅ View contact details!

**Example Alert:**
```
Need help with order ORD-001?

Contact us:
📞 Phone: 0912-345-6789
📧 Email: support@atondiya.com
```

## Order Status Actions Matrix

| Order Status | Available Actions |
|-------------|-------------------|
| **Pending** | ❌ Cancel Order, 💬 Contact Support |
| **Processing** | 📦 Track Order, 💬 Contact Support |
| **Shipped** | 📦 Track Order, 💬 Contact Support |
| **Delivered** | 🔄 Order Again, 💬 Contact Support |
| **Cancelled** | 💬 Contact Support |

## Technical Implementation

### Order Again Function
```javascript
onClick={() => {
  // Add all products from this order to cart
  if (order.products && order.products.length > 0) {
    order.products.forEach(product => {
      addToCart(product, product.quantity);
    });
    alert(`✅ ${order.products.length} item(s) added to cart!`);
    // Switch to cart tab after a short delay
    setTimeout(() => {
      setActiveTab('cart');
    }, 800);
  }
}}
```

### Cancel Order Function
```javascript
onClick={() => {
  if (confirm('Cancel this order?')) {
    setOrders(prev => prev.map(o => 
      o.id === order.id ? { ...o, status: 'Cancelled' } : o
    ));
  }
}}
```

### Track Order Function
```javascript
onClick={() => {
  alert(`Tracking order ${order.id}\nStatus: ${order.status}\nEstimated delivery: 2-3 days`);
}}
```

### Contact Support Function
```javascript
onClick={() => {
  alert(`Need help with order ${order.id}?\n\nContact us:\n📞 Phone: 0912-345-6789\n📧 Email: support@atondiya.com`);
}}
```

## UI/UX Improvements

### Button Styling
- Border-2 with color coding
- Hover effects (background color change)
- Smooth transitions
- Emoji icons for better UX
- Responsive flex-wrap layout

### Color Coding
- 🔴 Red: Cancel Order (danger)
- 🟢 Green: Order Again (success)
- 🔵 Blue: Track Order (info)
- 🟤 Brown: Contact Support (neutral)

### Responsive Design
```javascript
<div className="flex flex-wrap gap-2">
  {/* Buttons wrap on small screens */}
</div>
```

## Testing Guide

### Test Order Again
```
1. Go to My Orders tab
2. Find a delivered order (ORD-001)
3. Click "🔄 Order Again"
4. ✅ Alert shows: "✅ 2 item(s) added to cart!"
5. ✅ Auto-redirect to Cart tab
6. ✅ Items visible in cart
7. ✅ Quantities preserved
```

### Test Cancel Order
```
1. Go to My Orders tab
2. Find a pending order (ORD-003)
3. Click "Cancel Order"
4. ✅ Confirmation dialog appears
5. Click OK
6. ✅ Order status changes to "Cancelled"
7. ✅ Cancel button disappears
```

### Test Track Order
```
1. Go to My Orders tab
2. Find a processing/shipped order (ORD-002)
3. Click "📦 Track Order"
4. ✅ Alert shows tracking info
5. ✅ Status and delivery estimate visible
```

### Test Contact Support
```
1. Go to My Orders tab
2. Click "💬 Contact Support" on any order
3. ✅ Alert shows contact information
4. ✅ Phone and email visible
```

## Future Enhancements

### Backend Integration

#### Order Again API
```javascript
const orderAgain = async (orderId) => {
  const response = await fetch(`/api/orders/${orderId}/reorder`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
```

#### Cancel Order API
```javascript
const cancelOrder = async (orderId) => {
  const response = await fetch(`/api/orders/${orderId}/cancel`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
```

#### Track Order API
```javascript
const trackOrder = async (orderId) => {
  const response = await fetch(`/api/orders/${orderId}/tracking`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
```

### Real-time Tracking
```javascript
// WebSocket for live tracking updates
const ws = new WebSocket('ws://localhost:8000/tracking');

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  // Update order status in real-time
  setOrders(prev => prev.map(o => 
    o.id === update.orderId ? { ...o, status: update.status } : o
  ));
};
```

### Email Notifications
```javascript
// Send email when order is placed again
const sendOrderAgainEmail = async (order) => {
  await fetch('/api/emails/order-again', {
    method: 'POST',
    body: JSON.stringify({
      orderId: order.id,
      email: user.email,
      products: order.products
    })
  });
};
```

### Order History Analytics
```javascript
// Track order again frequency
const trackOrderAgain = (orderId) => {
  analytics.track('Order Again Clicked', {
    orderId: orderId,
    userId: user.id,
    timestamp: new Date()
  });
};
```

## User Experience Flow

### Order Again Flow
```
1. User views delivered order
2. Clicks "Order Again"
3. ✅ Success alert appears
4. Items added to cart
5. Auto-redirect to cart (0.8s delay)
6. User can review and checkout
```

### Cancel Order Flow
```
1. User views pending order
2. Clicks "Cancel Order"
3. Confirmation dialog appears
4. User confirms
5. Order status updates to "Cancelled"
6. Cancel button disappears
7. Order remains in history
```

### Track Order Flow
```
1. User views processing/shipped order
2. Clicks "Track Order"
3. Tracking info appears
4. Shows current status
5. Shows estimated delivery
6. User can contact support if needed
```

## Summary

✅ **Tapos na ang lahat ng order actions!**

Mga features:
- 🔄 Order Again - adds all items to cart
- ❌ Cancel Order - cancels pending orders
- 📦 Track Order - shows tracking info
- 💬 Contact Support - shows contact details
- Smooth animations and transitions
- Color-coded buttons
- Responsive design
- Auto-redirect after order again

**Subukan mo na!** Pumunta sa My Orders tab at test ang lahat ng buttons! 🎉
