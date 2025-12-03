# Vendor Products Sync Guide

## Overview

Ang products na ina-add ng vendors sa Vendor Dashboard ay **automatically visible** na sa:
- ✅ **Products Page** - Makikita ng lahat ng customers
- ✅ **Landing Page** - Featured products section
- ✅ **Admin Dashboard** - Product management

## How It Works

### 1. Vendor Adds Product
```
Vendor Dashboard → Products Tab → Add Product
↓
Fills in:
- Product Name
- Category
- Price
- Stock
- Description
- Image (upload or URL)
↓
Saves Product
↓
Product is stored in DataSync (global_products)
```

### 2. Product Appears Everywhere
```
DataSync (global_products)
↓
├─→ Products Page (all active products)
├─→ Landing Page (top 4 by sales)
├─→ Admin Dashboard (all products)
└─→ Vendor Dashboard (vendor's own products)
```

## Testing Steps

### Test 1: Add Product as Vendor
1. Login as vendor (or register new vendor account)
2. Go to Vendor Dashboard → Products tab
3. Click "Add Product" button
4. Fill in product details:
   - Name: "Test Product"
   - Category: "Handicrafts"
   - Price: 500
   - Stock: 10
   - Description: "This is a test product"
   - Upload an image
5. Click "Add Product"
6. Product should appear in the products table

### Test 2: View Product as Customer
1. Open new tab or logout
2. Go to Products page (`/products`)
3. Search for "Test Product"
4. Product should be visible with image

### Test 3: Check Landing Page
1. Go to home page (`/`)
2. Scroll to "Featured Products" section
3. If product has high sales, it will appear here
4. Otherwise, it will show in Products page

### Test 4: Admin View
1. Login as admin
2. Go to Admin Dashboard
3. Check Products section
4. All vendor products should be visible

## Product Display Logic

### Products Page
- Shows **all active products** from all vendors
- Combines DataSync products + static fallback products
- Filters by:
  - Search query (name, description)
  - Category
  - Status (only active)

### Landing Page
- Shows **top 4 products** by sales
- Sorted by popularity
- Falls back to static products if no vendor products

### Product Card Format
```javascript
{
  id: number,
  name: string,
  description: string,
  price: string,
  rating: string,
  vendor: string,
  category: string,
  badge: 'Popular' | 'New' | 'Featured' | null,
  image: string (URL)
}
```

## Product Badges

Products automatically get badges based on:
- **Popular**: sales > 30
- **New**: created within last 7 days
- **Featured**: default for high-performing products

## Image Handling

### Vendor Upload
- Vendor uploads image file
- Converted to base64
- Stored in product data
- Displayed everywhere

### Fallback
- If no image: Shows Package icon placeholder
- If image fails to load: Shows fallback icon

## Data Flow

```
┌─────────────────┐
│ Vendor Dashboard│
│  Add Product    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   DataSync      │
│ addProduct()    │
└────────┬────────┘
         │
         ├─→ localStorage (global_products)
         ├─→ Notification (admin, vendor)
         └─→ Real-time sync
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Products │ │ Landing │ │  Admin  │
│  Page   │ │  Page   │ │Dashboard│
└─────────┘ └─────────┘ └─────────┘
```

## Troubleshooting

### Product not showing in Products Page?
1. Check if product status is "active"
2. Verify product is in localStorage:
   ```javascript
   console.log(JSON.parse(localStorage.getItem('global_products')))
   ```
3. Check browser console for errors
4. Try hard refresh (Ctrl+Shift+R)

### Product not showing in Landing Page?
- Landing page only shows top 4 products by sales
- New products need sales to appear
- Check if product has `sales` property

### Image not displaying?
1. Check if image URL is valid
2. Try uploading image again
3. Check browser console for CORS errors
4. Verify image is in product data:
   ```javascript
   const products = JSON.parse(localStorage.getItem('global_products'))
   console.log(products.find(p => p.name === 'Your Product Name'))
   ```

### Product shows for vendor but not customer?
1. Check product status (must be "active")
2. Verify DataSync is working:
   ```javascript
   // In browser console
   const { products } = useDataSync()
   console.log(products)
   ```
3. Clear localStorage and refresh

## Real-Time Updates

### When vendor adds product:
- ✅ Immediately visible in vendor's dashboard
- ✅ Stored in global_products
- ✅ Notification sent to admin
- ✅ Available in Products page (after refresh)

### When vendor updates product:
- ✅ Changes reflected everywhere
- ✅ Notification sent
- ✅ Cross-tab sync (if multiple tabs open)

### When vendor deletes product:
- ✅ Removed from all views
- ✅ Notification sent
- ✅ Orders history preserved

## Sample Data

On first load, system initializes with 4 sample products:
1. Handwoven Banig Mat (₱850)
2. Coconut Shell Crafts (₱450)
3. Bamboo Baskets (₱650)
4. Abaca Table Runner (₱550)

These are assigned to vendorId: 3 (sample vendor)

## API Integration (Future)

Currently using localStorage. For production:
```javascript
// Instead of localStorage
const response = await fetch('/api/products', {
  method: 'POST',
  body: JSON.stringify(productData)
})

// Real-time updates via WebSocket
socket.on('product:added', (product) => {
  // Update UI
})
```

## Notes

- Products are stored client-side (localStorage)
- For production, integrate with Laravel backend API
- Images are stored as base64 or URLs
- Maximum 100 products recommended for performance
- Consider pagination for large product lists

## Support

If products are not syncing:
1. Check DataSyncContext is properly wrapped in App.jsx
2. Verify useDataSync hook is imported
3. Check browser console for errors
4. Clear localStorage and test with fresh data
