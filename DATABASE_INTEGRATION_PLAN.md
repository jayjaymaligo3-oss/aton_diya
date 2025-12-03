# Database Integration Plan - Complete Guide

## Current Status: DEMO MODE (localStorage)

Ang lahat ng data ay naka-save sa **browser localStorage** lang. Kapag nag-clear ng browser cache, mawawala lahat.

## What Needs Database Integration

### 🔴 CRITICAL (Must have database)

#### 1. **User Authentication**
**Current:** localStorage
**Should be:** MySQL database
```
Tables needed:
- users (id, name, email, password, role, phone, address)
- password_resets
- sessions
```

#### 2. **Products**
**Current:** Hardcoded array sa VendorDashboard
**Should be:** MySQL database
```
Table: products
- id
- vendor_id (foreign key to users)
- name
- description
- price
- stock
- category
- image
- status (active/inactive)
- created_at
- updated_at
```

#### 3. **Orders**
**Current:** localStorage
**Should be:** MySQL database
```
Table: orders
- id
- customer_id (foreign key to users)
- vendor_id (foreign key to users)
- total_amount
- shipping_fee
- status (pending/processing/shipped/delivered)
- payment_method
- shipping_address
- created_at
- updated_at

Table: order_items
- id
- order_id (foreign key to orders)
- product_id (foreign key to products)
- quantity
- price
- subtotal
```

#### 4. **Cart & Wishlist**
**Current:** localStorage
**Should be:** MySQL database
```
Table: cart_items
- id
- user_id (foreign key to users)
- product_id (foreign key to products)
- quantity
- created_at

Table: wishlist_items
- id
- user_id (foreign key to users)
- product_id (foreign key to products)
- created_at
```

#### 5. **Custom Product Requests**
**Current:** localStorage
**Should be:** MySQL database
```
Table: custom_product_requests
- id
- customer_id (foreign key to users)
- product_name
- description
- category
- budget
- quantity
- deadline
- reference_image
- status (pending/in_progress/completed/cancelled)
- created_at
- updated_at
```

#### 6. **Vendor Applications**
**Current:** Demo mode
**Should be:** MySQL database
```
Table: vendor_applications
- id
- user_id (foreign key to users)
- business_name
- business_description
- business_category
- phone
- address
- status (pending/approved/rejected)
- reviewed_by (admin user_id)
- reviewed_at
- created_at
- updated_at
```

### 🟡 IMPORTANT (Should have database)

#### 7. **Sales Reports**
**Current:** Hardcoded data
**Should be:** Calculated from orders table
```
No new table needed - query from orders:
- Daily sales
- Monthly sales
- Revenue by product
- Revenue by vendor
```

#### 8. **Analytics**
**Current:** Hardcoded data
**Should be:** Calculated from database
```
No new table needed - aggregate queries:
- Total users by role
- Total products
- Total orders
- Revenue trends
```

#### 9. **Notifications**
**Current:** Hardcoded array
**Should be:** MySQL database
```
Table: notifications
- id
- user_id (foreign key to users)
- type (order/promo/system)
- message
- read (boolean)
- created_at
```

### 🟢 OPTIONAL (Nice to have)

#### 10. **Product Reviews**
```
Table: product_reviews
- id
- product_id (foreign key to products)
- user_id (foreign key to users)
- rating (1-5)
- comment
- created_at
```

#### 11. **Shipping Addresses**
```
Table: shipping_addresses
- id
- user_id (foreign key to users)
- full_name
- phone
- address
- city
- province
- is_default (boolean)
```

#### 12. **Payment Transactions**
```
Table: payments
- id
- order_id (foreign key to orders)
- payment_method
- amount
- status (pending/completed/failed)
- transaction_id
- created_at
```

## Database Schema Overview

```sql
-- Users & Authentication
users
├── id (PK)
├── name
├── email (unique)
├── password (hashed)
├── role (customer/vendor/admin)
├── phone
├── address
├── vendor_status (pending/approved/rejected)
└── timestamps

-- Products
products
├── id (PK)
├── vendor_id (FK → users.id)
├── name
├── description
├── price
├── stock
├── category
├── image
├── status
└── timestamps

-- Orders
orders
├── id (PK)
├── customer_id (FK → users.id)
├── vendor_id (FK → users.id)
├── total_amount
├── shipping_fee
├── status
├── payment_method
├── shipping_address
└── timestamps

order_items
├── id (PK)
├── order_id (FK → orders.id)
├── product_id (FK → products.id)
├── quantity
├── price
└── subtotal

-- Cart & Wishlist
cart_items
├── id (PK)
├── user_id (FK → users.id)
├── product_id (FK → products.id)
├── quantity
└── created_at

wishlist_items
├── id (PK)
├── user_id (FK → users.id)
├── product_id (FK → products.id)
└── created_at

-- Custom Requests
custom_product_requests
├── id (PK)
├── customer_id (FK → users.id)
├── product_name
├── description
├── category
├── budget
├── quantity
├── deadline
├── reference_image
├── status
└── timestamps

-- Vendor Applications
vendor_applications
├── id (PK)
├── user_id (FK → users.id)
├── business_name
├── business_description
├── business_category
├── phone
├── address
├── status
├── reviewed_by (FK → users.id)
├── reviewed_at
└── timestamps

-- Notifications
notifications
├── id (PK)
├── user_id (FK → users.id)
├── type
├── message
├── read
└── created_at
```

## Laravel Backend Setup

### 1. Create Migrations

```bash
# Users (already exists)
php artisan make:migration create_users_table

# Products
php artisan make:migration create_products_table

# Orders
php artisan make:migration create_orders_table
php artisan make:migration create_order_items_table

# Cart & Wishlist
php artisan make:migration create_cart_items_table
php artisan make:migration create_wishlist_items_table

# Custom Requests
php artisan make:migration create_custom_product_requests_table

# Vendor Applications
php artisan make:migration create_vendor_applications_table

# Notifications
php artisan make:migration create_notifications_table
```

### 2. Create Models

```bash
php artisan make:model Product
php artisan make:model Order
php artisan make:model OrderItem
php artisan make:model CartItem
php artisan make:model WishlistItem
php artisan make:model CustomProductRequest
php artisan make:model VendorApplication
php artisan make:model Notification
```

### 3. Create Controllers

```bash
php artisan make:controller API/ProductController
php artisan make:controller API/OrderController
php artisan make:controller API/CartController
php artisan make:controller API/WishlistController
php artisan make:controller API/CustomRequestController
php artisan make:controller API/VendorApplicationController
php artisan make:controller API/NotificationController
```

### 4. Create API Routes

```php
// routes/api.php

// Products
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    
    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::put('/orders/{id}', [OrderController::class, 'update']);
    
    // Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    
    // Wishlist
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist', [WishlistController::class, 'store']);
    Route::delete('/wishlist/{id}', [WishlistController::class, 'destroy']);
    
    // Custom Requests
    Route::get('/custom-requests', [CustomRequestController::class, 'index']);
    Route::post('/custom-requests', [CustomRequestController::class, 'store']);
    
    // Vendor Applications (Admin only)
    Route::get('/vendor-applications', [VendorApplicationController::class, 'index']);
    Route::put('/vendor-applications/{id}', [VendorApplicationController::class, 'update']);
});
```

## React Frontend Updates

### Update API Calls

**Before (localStorage):**
```javascript
// Save to localStorage
localStorage.setItem('cart', JSON.stringify(cart));
```

**After (API):**
```javascript
// Save to database via API
await api.post('/cart', { product_id, quantity });
```

### Example: Cart Integration

```javascript
// src/context/CartContext.jsx

const addToCart = async (product, quantity = 1) => {
  try {
    // Call API
    const response = await api.post('/cart', {
      product_id: product.id,
      quantity
    });
    
    // Update local state
    setCart(response.data.cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

const loadCart = async () => {
  try {
    const response = await api.get('/cart');
    setCart(response.data.cart);
  } catch (error) {
    console.error('Error loading cart:', error);
  }
};
```

## Migration Steps

### Phase 1: Authentication (DONE ✅)
- Users table
- Login/Register
- Sanctum authentication

### Phase 2: Products
1. Create products table
2. Create Product model & controller
3. Update VendorDashboard to use API
4. Update ProductsPage to fetch from API

### Phase 3: Orders
1. Create orders & order_items tables
2. Create Order model & controller
3. Update checkout process
4. Update order tracking

### Phase 4: Cart & Wishlist
1. Create cart_items & wishlist_items tables
2. Create controllers
3. Update CartContext to use API
4. Sync with database

### Phase 5: Custom Requests
1. Create custom_product_requests table
2. Create controller
3. Update CustomerDashboard
4. Add vendor view

### Phase 6: Vendor Applications
1. Create vendor_applications table
2. Create controller
3. Update AdminDashboard
4. Add approval workflow

## Benefits of Database Integration

### ✅ Data Persistence
- Data saved permanently
- Survives browser cache clear
- Accessible from any device

### ✅ Security
- Server-side validation
- Protected data
- Role-based access control

### ✅ Scalability
- Handle multiple users
- Real-time updates
- Better performance

### ✅ Features
- Search & filter
- Analytics & reports
- Data relationships
- Transaction history

### ✅ Multi-device
- Login from anywhere
- Sync across devices
- Consistent experience

## Current vs Future

### Current (Demo Mode):
```
Browser localStorage
├── cart (lost on clear)
├── wishlist (lost on clear)
├── orders (lost on clear)
└── user (lost on logout)
```

### Future (Database):
```
MySQL Database
├── users (permanent)
├── products (permanent)
├── orders (permanent)
├── cart_items (permanent)
├── wishlist_items (permanent)
└── custom_requests (permanent)
```

## Summary

### What's Working Now:
✅ Authentication (Laravel Sanctum)
✅ Demo mode (localStorage)
✅ All features functional

### What Needs Database:
🔴 Products
🔴 Orders
🔴 Cart & Wishlist
🔴 Custom Requests
🔴 Vendor Applications
🔴 Notifications

### Priority Order:
1. **Products** - Foundation for everything
2. **Orders** - Core business logic
3. **Cart & Wishlist** - User experience
4. **Custom Requests** - New feature
5. **Vendor Applications** - Admin workflow
6. **Notifications** - Nice to have

**Gusto mo ba i-implement ko ang database integration? Sabihin mo lang kung saan tayo magsisimula!** 🚀
