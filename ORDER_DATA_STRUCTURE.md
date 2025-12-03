# Order Data Structure - localStorage Implementation

## ✅ Current Implementation

### Data Storage
**localStorage Key:** `customerOrders`

**Storage Method:**
```javascript
localStorage.setItem('customerOrders', JSON.stringify(orders));
```

**Retrieval Method:**
```javascript
const orders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
```

## Order Data Structure

### Complete Order Object
```javascript
{
  id: 'ORD-001',                    // Unique order ID
  date: '11/18/2025',               // Display date
  dateTime: '2024-11-18T10:30:00Z', // ISO timestamp
  items: 2,                         // Number of items
  
  // Products array with images
  products: [
    {
      id: 1,
      name: 'Handwoven Banig Mat',
      price: '850.00',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400'
    },
    {
      id: 2,
      name: 'Coconut Shell Bowl Set',
      price: '450.00',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc768?q=80&w=400'
    }
  ],
  
  // Order totals
  subtotal: '1300.00',
  shippingFee: '50.00',
  total: '1350.00',
  
  // Order status
  status: 'Delivered', // Pending, Processing, Shipped, Delivered, Cancelled
  
  // Payment info
  paymentMethod: 'cod', // cod or gcash
  
  // Shipping details
  shippingInfo: {
    fullName: 'Juan Dela Cruz',
    phone: '09123456789',
    address: 'Bulalacao, Oriental Mindoro',
    city: 'Bulalacao',
    province: 'Oriental Mindoro'
  }
}
```

## Sample Orders with Images

### Order 1 - Delivered
```javascript
{
  id: 'ORD-001',
  status: 'Delivered',
  products: [
    {
      name: 'Handwoven Banig Mat',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400',
      price: '850.00',
      quantity: 1
    },
    {
      name: 'Coconut Shell Bowl Set',
      image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc768?q=80&w=400',
      price: '450.00',
      quantity: 1
    }
  ],
  total: '1350.00'
}
```

### Order 2 - Shipped
```javascript
{
  id: 'ORD-002',
  status: 'Shipped',
  products: [
    {
      name: 'Bamboo Woven Basket',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=400',
      price: '650.00',
      quantity: 1
    }
  ],
  total: '700.00'
}
```

### Order 3 - Processing
```javascript
{
  id: 'ORD-003',
  status: 'Processing',
  products: [
    {
      name: 'Organic Wild Honey',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784acc?q=80&w=400',
      price: '350.00',
      quantity: 2
    }
  ],
  total: '750.00'
}
```

## Image Sources

### Current Images (Unsplash)
All product images are hosted on Unsplash CDN:
- High quality
- Fast loading
- Reliable
- Free to use

### Image URLs
```
Product 1: https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400
Product 2: https://images.unsplash.com/photo-1615485500834-bc10199bc768?q=80&w=400
Product 3: https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=400
Product 4: https://images.unsplash.com/photo-1587049352846-4a222e784acc?q=80&w=400
```

## Where Images Are Displayed

### 1. Customer Dashboard - My Orders
```jsx
<img 
  src={product.image} 
  alt={product.name}
  className="w-12 h-12 object-cover rounded"
/>
```

### 2. Admin Dashboard - Orders Tab
```jsx
<img 
  src={product.image} 
  alt={product.name}
  className="w-16 h-16 object-cover rounded-lg"
/>
```

### 3. Analytics - Popular Products
```jsx
<img 
  src={product.image} 
  alt={product.name}
  className="w-16 h-16 object-cover rounded-lg"
/>
```

## localStorage Operations

### Save Orders
```javascript
// In CustomerDashboard.jsx
useEffect(() => {
  if (orders.length > 0) {
    localStorage.setItem('customerOrders', JSON.stringify(orders));
  }
}, [orders]);
```

### Load Orders
```javascript
// In CustomerDashboard.jsx
useEffect(() => {
  const savedOrders = localStorage.getItem('customerOrders');
  if (savedOrders) {
    const parsedOrders = JSON.parse(savedOrders);
    setOrders(parsedOrders);
  } else {
    // Create sample orders with images
    const sampleOrders = [...];
    setOrders(sampleOrders);
    localStorage.setItem('customerOrders', JSON.stringify(sampleOrders));
  }
}, [user]);
```

### Read Orders (Admin)
```javascript
// In AdminDashboard.jsx
const customerOrders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
```

## Data Flow

### 1. Initial Load
```
User opens app
  ↓
Check localStorage for 'customerOrders'
  ↓
If exists: Load orders
If not: Create sample orders with images
  ↓
Save to localStorage
```

### 2. New Order
```
User places order
  ↓
Create order object with product images
  ↓
Add to orders array
  ↓
Save to localStorage
  ↓
Display in dashboard
```

### 3. Admin View
```
Admin logs in
  ↓
Load orders from localStorage
  ↓
Display in Orders tab
  ↓
Show product images
```

## Browser DevTools Check

### View Orders in localStorage
```javascript
// Open browser console (F12)
// Type:
const orders = JSON.parse(localStorage.getItem('customerOrders'));
console.log(orders);

// Check images
orders.forEach(order => {
  console.log(`Order ${order.id}:`);
  order.products.forEach(product => {
    console.log(`  - ${product.name}: ${product.image}`);
  });
});
```

### Clear Orders
```javascript
localStorage.removeItem('customerOrders');
```

### Update Orders
```javascript
const orders = JSON.parse(localStorage.getItem('customerOrders'));
// Modify orders
localStorage.setItem('customerOrders', JSON.stringify(orders));
```

## Database Integration (Future)

### API Endpoints
```javascript
// Save order to database
POST /api/orders
{
  "order": {
    "id": "ORD-001",
    "products": [...],
    "total": "1350.00",
    ...
  }
}

// Get orders from database
GET /api/orders
Response: [
  { id: "ORD-001", ... },
  { id: "ORD-002", ... }
]

// Update order status
PUT /api/orders/:id
{
  "status": "Shipped"
}
```

### Image Upload
```javascript
// Upload product image
POST /api/products/:id/image
FormData: {
  image: File
}

Response: {
  imageUrl: "https://api.example.com/images/product-1.jpg"
}
```

### Database Schema
```sql
-- Orders table
CREATE TABLE orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(50) UNIQUE,
  user_id INT,
  total DECIMAL(10,2),
  status VARCHAR(50),
  created_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Order items table
CREATE TABLE order_items (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  product_id INT,
  product_name VARCHAR(255),
  product_image VARCHAR(255),
  price DECIMAL(10,2),
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Products table
CREATE TABLE products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  image VARCHAR(255),
  category VARCHAR(100),
  vendor_id INT,
  created_at TIMESTAMP
);
```

## Testing

### Test Order Images
```
1. Login as customer
2. Go to My Orders tab
3. ✅ See product images in orders
4. Check browser console
5. Type: localStorage.getItem('customerOrders')
6. ✅ See JSON with image URLs
```

### Test Admin View
```
1. Login as admin
2. Go to Orders tab
3. ✅ See all orders with product images
4. Go to Analytics tab
5. ✅ See popular products with images
```

### Test Image Loading
```
1. Open Network tab (F12)
2. Reload page
3. ✅ See images loading from Unsplash
4. ✅ Images load quickly (< 1s)
5. ✅ No broken images
```

## Summary

✅ **Orders already have images!**

Current implementation:
- ✅ Product images included in order data
- ✅ Images from Unsplash CDN
- ✅ Saved to localStorage ('customerOrders')
- ✅ Displayed in Customer Dashboard
- ✅ Displayed in Admin Dashboard
- ✅ Displayed in Analytics
- ✅ High quality images (400px width)
- ✅ Fast loading
- ✅ Persistent storage

**Check it:**
1. Login as customer or admin
2. Go to Orders tab
3. See product images in all orders!

🎉 Order images are working perfectly!
