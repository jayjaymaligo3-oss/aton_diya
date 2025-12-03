# Product Images - localStorage Guide

## Overview

Product images are now properly saved to localStorage in the following formats:
- **Base64** - When uploaded by vendor (converted from file)
- **URL** - Default sample images from Unsplash

## How It Works

### 1. Image Upload
```javascript
// When vendor uploads image
File → FileReader → Base64 → productForm.image → localStorage
```

### 2. Image Storage
```javascript
// Stored in localStorage as:
localStorage.setItem(`vendor_products_${userId}`, JSON.stringify(products))

// Each product has:
{
  id: 1,
  name: 'Product Name',
  image: 'data:image/jpeg;base64,/9j/4AAQ...' // or URL
  // ... other fields
}
```

### 3. Image Loading
```javascript
// On page load:
1. Check localStorage for saved products
2. Load products with images
3. If no image, add default Unsplash URL
4. Display in table
```

## Testing

### Test 1: Check Current Products
Open browser console and run:
```javascript
// Check if products have images
window.productImageHelper.check(3) // Replace 3 with your user ID
```

Expected output:
```
Total products: 3
Products with images: 3
```

### Test 2: Ensure All Products Have Images
```javascript
// Add default images to products without images
window.productImageHelper.ensure(3)
```

### Test 3: Initialize Sample Products
```javascript
// Create fresh sample products with images
window.productImageHelper.init(3)
```

### Test 4: View localStorage Data
```javascript
// View raw data
const userId = 3; // Your user ID
const products = JSON.parse(localStorage.getItem(`vendor_products_${userId}`));
console.log(products);
```

### Test 5: Check Image URLs
```javascript
// Check if images are valid
const products = JSON.parse(localStorage.getItem('vendor_products_3'));
products.forEach(p => {
  console.log(`${p.name}: ${p.image ? '✅ Has image' : '❌ No image'}`);
});
```

## Troubleshooting

### Images Not Showing?

#### Solution 1: Hard Refresh
1. Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. This clears cache and reloads

#### Solution 2: Clear and Reinitialize
```javascript
// In browser console
const userId = 3; // Your user ID
window.productImageHelper.clear(userId);
window.productImageHelper.init(userId);
// Then refresh page
```

#### Solution 3: Check localStorage Size
```javascript
// Check if localStorage is full
let total = 0;
for (let key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    total += localStorage[key].length + key.length;
  }
}
console.log(`localStorage size: ${(total / 1024).toFixed(2)} KB`);
// Max is usually 5-10 MB
```

#### Solution 4: Verify Image Format
```javascript
const products = JSON.parse(localStorage.getItem('vendor_products_3'));
const product = products[0];

if (product.image) {
  if (product.image.startsWith('data:image')) {
    console.log('✅ Base64 image');
  } else if (product.image.startsWith('http')) {
    console.log('✅ URL image');
  } else {
    console.log('❌ Invalid image format');
  }
}
```

## Image Formats Supported

### 1. Base64 (Uploaded Images)
```
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA...
```
- ✅ Stored in localStorage
- ✅ Works offline
- ⚠️ Large file size (increases localStorage usage)

### 2. URL (External Images)
```
https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop
```
- ✅ Small storage footprint
- ✅ High quality
- ⚠️ Requires internet connection

## Best Practices

### For Vendors:
1. **Upload images under 500KB** for better performance
2. **Use square images** (1:1 ratio) for consistent display
3. **Compress images** before uploading
4. **Use JPG format** for photos, PNG for graphics

### For Developers:
1. **Always check if image exists** before rendering
2. **Provide fallback images** for missing images
3. **Compress base64 images** if possible
4. **Consider using URLs** for default images

## Sample Products with Images

Default sample products include:
1. **Handwoven Banig Mat** - Woven texture
2. **Coconut Shell Crafts** - Coconut shell items
3. **Bamboo Baskets** - Bamboo basket
4. **Abaca Table Runner** - Table runner

All use Unsplash images (400x400, optimized)

## localStorage Structure

```javascript
{
  "vendor_products_3": [
    {
      "id": 1,
      "name": "Handwoven Banig Mat",
      "price": 850,
      "stock": 15,
      "sales": 45,
      "status": "active",
      "category": "Handicrafts",
      "image": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop",
      "description": "Traditional handwoven mat"
    }
  ],
  "vendor_orders_3": [...],
  "vendor_profile_3": {...}
}
```

## Debugging Commands

### Check All Vendor Data
```javascript
const userId = 3;
console.log('Products:', localStorage.getItem(`vendor_products_${userId}`));
console.log('Orders:', localStorage.getItem(`vendor_orders_${userId}`));
console.log('Profile:', localStorage.getItem(`vendor_profile_${userId}`));
```

### Export Products
```javascript
// Download products as JSON file
window.productImageHelper.export(3);
```

### Clear All Data
```javascript
// Clear all vendor data
const userId = 3;
localStorage.removeItem(`vendor_products_${userId}`);
localStorage.removeItem(`vendor_orders_${userId}`);
localStorage.removeItem(`vendor_profile_${userId}`);
```

## Common Issues

### Issue 1: Images Disappear After Refresh
**Cause:** localStorage not saving properly
**Solution:** Check browser settings, ensure localStorage is enabled

### Issue 2: Base64 Images Too Large
**Cause:** High-resolution images
**Solution:** Compress images before upload, or use URLs

### Issue 3: Images Not Loading
**Cause:** CORS issues with external URLs
**Solution:** Use Unsplash URLs (CORS-enabled) or base64

### Issue 4: localStorage Full
**Cause:** Too many base64 images
**Solution:** Clear old data, use URLs instead

## Performance Tips

1. **Limit base64 images** - Use URLs when possible
2. **Compress images** - Keep under 500KB
3. **Lazy load images** - Load as needed
4. **Cache images** - Browser will cache URLs
5. **Clean old data** - Remove unused products

## Future Enhancements

- [ ] Image compression before save
- [ ] Cloud storage integration (AWS S3, Cloudinary)
- [ ] Image optimization service
- [ ] Multiple image support
- [ ] Image gallery
- [ ] Image cropping tool
- [ ] Drag-and-drop upload
- [ ] Bulk image upload

## Support

If images still not showing:
1. Check browser console for errors
2. Verify localStorage data
3. Try in incognito mode
4. Clear cache and cookies
5. Use helper functions to debug
