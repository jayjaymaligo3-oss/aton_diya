# Vendor Dashboard - Quick Test Guide

## 🚀 Quick Start (2 Minutes)

### Test 1: Login as Vendor
```bash
1. Open: http://localhost:5173/login
2. Email: vendor@test.com
3. Password: vendor123
4. Click Login
✅ Should see vendor dashboard
```

### Test 2: Add a Product
```bash
1. Click "Products" tab
2. Click "Add Product" button
3. Fill in:
   - Name: "Woven Basket"
   - Category: "Handicrafts"
   - Price: 500
   - Stock: 10
   - Description: "Beautiful handwoven basket"
4. Click "Add Product"
✅ Product appears in table
```

### Test 3: Edit a Product
```bash
1. In Products tab
2. Click edit icon (pencil) on any product
3. Change price to 600
4. Click "Update Product"
✅ Price updated in table
```

### Test 4: Manage Orders
```bash
1. Click "Orders" tab
2. Find an order with "pending" status
3. Change dropdown to "processing"
✅ Status updates immediately
✅ Badge color changes to yellow
```

### Test 5: View Sales Reports
```bash
1. Click "Sales Reports" tab
✅ See total revenue
✅ See sales by product chart
✅ See order status breakdown
```

### Test 6: Update Store Profile
```bash
1. Click "Store Profile" tab
2. Click "Edit Profile"
3. Change business name
4. Click "Save Changes"
5. Refresh page
✅ Changes persist
```

## 🆕 Test New Vendor Registration

### Register New Vendor
```bash
1. Logout (if logged in)
2. Go to: http://localhost:5173/vendor/register
3. Fill in form:
   - Business Name: "Test Store"
   - Owner Name: "John Doe"
   - Email: "newvendor@test.com"
   - Password: "password123"
   - Confirm Password: "password123"
   - Phone: "+63 912 345 6789"
   - Address: "Davao City"
   - Category: "Handicrafts"
   - Description: "Quality products"
4. Click "Submit Application"
✅ Success message appears
✅ Redirects to login after 3 seconds
```

### Try Login with Pending Account
```bash
1. Go to login page
2. Email: newvendor@test.com
3. Password: password123
4. Click Login
✅ Error: "Your vendor application is pending admin approval"
```

## 📊 Expected Results

### Overview Tab
- ✅ 4 stat cards (Revenue, Orders, Products, Sales)
- ✅ Recent orders list (last 5)
- ✅ Top products list (sorted by sales)

### Products Tab
- ✅ Product table with all columns
- ✅ Add button works
- ✅ Edit button opens modal with data
- ✅ Delete button removes product
- ✅ Status badges show correctly

### Orders Tab
- ✅ Order table with all columns
- ✅ Status dropdown works
- ✅ Status colors update
- ✅ View button shows details

### Sales Reports Tab
- ✅ 4 summary cards
- ✅ Sales by product with progress bars
- ✅ Order status breakdown grid
- ✅ Percentages calculate correctly

### Store Profile Tab
- ✅ All profile fields display
- ✅ Edit button opens modal
- ✅ Changes save to localStorage
- ✅ Data persists after refresh

## 🎯 Test Credentials

### Approved Vendor (Can Login)
```
Email: vendor@test.com
Password: vendor123
Status: Approved ✅
```

### Admin (For Approval)
```
Email: Admin@gmail.com
Password: Admin123456789
```

## 🐛 Common Issues

### Issue: Can't see products
**Solution:** Products are stored per vendor ID. Make sure you're logged in.

### Issue: Changes not saving
**Solution:** Check localStorage is enabled in browser.

### Issue: Modal not closing
**Solution:** Click X button or click outside modal.

### Issue: Pending vendor can't login
**Solution:** This is correct! Vendors need admin approval first.

## ✅ Success Checklist

- [ ] Can login as vendor
- [ ] Can view dashboard overview
- [ ] Can add new product
- [ ] Can edit existing product
- [ ] Can delete product
- [ ] Can view orders
- [ ] Can update order status
- [ ] Can view sales reports
- [ ] Can edit store profile
- [ ] Changes persist after refresh
- [ ] Can register new vendor
- [ ] Pending vendor cannot login
- [ ] Can logout successfully

## 🎉 All Tests Passed?

Your vendor dashboard is working perfectly!

**Next Steps:**
1. Test with real backend API
2. Add image upload for products
3. Implement real-time notifications
4. Add advanced analytics charts
5. Connect with payment gateway

---

**Need Help?**
- Check browser console for errors
- Clear localStorage and try again
- Verify you're using correct credentials
- Check VENDOR_ACCESS_GUIDE.md for detailed docs
