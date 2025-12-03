# 🎉 Sales Calendar System - Complete Guide

## Overview

Automatic sales/discount system na parang Shopee at Lazada! May special sales every month based sa date (1.1, 2.14, 11.11, 12.12, etc.)

## Sales Schedule 2024

### January
- **1.1** - New Year Sale (20% OFF) 🎊

### February  
- **2.14** - Valentine's Day Sale (14% OFF) 💝

### March
- **3.8** - Women's Day Sale (15% OFF) 👩

### April
- **4.4** - Summer Kickoff Sale (10% OFF) ☀️

### May
- **5.1** - Labor Day Sale (15% OFF) 💪
- **5.5** - 5.5 Flash Sale (25% OFF) ⚡

### June
- **6.12** - Independence Day Sale (20% OFF) 🇵🇭

### July
- **7.7** - 7.7 Mid-Year Sale (30% OFF) 🎯

### August
- **8.8** - 8.8 Mega Sale (35% OFF) 🛍️

### September
- **9.9** - 9.9 Super Sale (40% OFF) 🎉

### October
- **10.10** - 10.10 Flash Sale (35% OFF) 🎃

### November
- **11.11** - 11.11 MEGA SALE (50% OFF) 🔥 **BIGGEST SALE!**

### December
- **12.12** - 12.12 Year-End Sale (45% OFF) 🎄
- **12.25** - Christmas Sale (25% OFF) 🎅

## Features

### 1. Automatic Discount Application
```javascript
import { getSalePrice } from '../utils/salesCalendar';

const product = { name: 'Basket', price: 1000 };
const saleInfo = getSalePrice(product);

// If today is 11.11:
// saleInfo = {
//   hasDiscount: true,
//   saleName: '11.11 Mega Sale',
//   saleEmoji: '🔥',
//   originalPrice: 1000,
//   discount: 500,
//   finalPrice: 500,
//   savings: 500,
//   discountPercent: 50
// }
```

### 2. Sales Banner
- Automatically shows on sale days
- Animated background
- Shows discount percentage
- Can be dismissed
- Shows countdown for upcoming sales (within 7 days)

### 3. Product Cards with Sale Price
- Original price (crossed out)
- Sale price (highlighted)
- Discount badge
- Sale name badge
- Savings amount

### 4. Sales Calendar Page
- View all sales for the year
- Current sale highlighted
- Upcoming sales countdown
- Grouped by month
- Shopping tips

## How to Use

### Display Current Sale
```javascript
import { getCurrentSale, hasSaleToday } from '../utils/salesCalendar';

const currentSale = getCurrentSale();
if (hasSaleToday()) {
  console.log(`Today's sale: ${currentSale.name} - ${currentSale.discount}% OFF`);
}
```

### Get Upcoming Sales
```javascript
import { getUpcomingSales } from '../utils/salesCalendar';

const upcoming = getUpcomingSales(); // Returns next 3 sales
upcoming.forEach(sale => {
  console.log(`${sale.name} in ${sale.daysUntil} days`);
});
```

### Apply Discount to Product
```javascript
import { getSalePrice, formatPrice } from '../utils/salesCalendar';

const product = { name: 'Banig', price: 850 };
const saleInfo = getSalePrice(product);

if (saleInfo.hasDiscount) {
  console.log(`Original: ${formatPrice(saleInfo.originalPrice)}`);
  console.log(`Sale: ${formatPrice(saleInfo.finalPrice)}`);
  console.log(`You save: ${formatPrice(saleInfo.savings)}`);
}
```

### Get Countdown to Next Sale
```javascript
import { getCountdownToNextSale } from '../utils/salesCalendar';

const countdown = getCountdownToNextSale();
if (countdown) {
  console.log(`Next sale: ${countdown.sale.name}`);
  console.log(`Starts in: ${countdown.countdown.days}d ${countdown.countdown.hours}h`);
}
```

## Components

### SalesBanner
```jsx
import SalesBanner from '../components/SalesBanner';

// Add to App.jsx or any page
<SalesBanner />
```

Features:
- Auto-shows on sale days
- Animated design
- Dismissible
- Shows upcoming sale countdown (if within 7 days)

### ProductCardWithSale
```jsx
import ProductCardWithSale from '../components/ProductCardWithSale';

<ProductCardWithSale
  product={product}
  onAddToCart={handleAddToCart}
  onAddToWishlist={handleAddToWishlist}
/>
```

Features:
- Automatic sale price calculation
- Sale badges
- Original price crossed out
- Savings display
- Quick actions (cart, wishlist)

### SalesCalendarPage
```jsx
// Route: /sales
<Route path="/sales" element={<SalesCalendarPage />} />
```

Features:
- Full year calendar
- Current sale highlighted
- Upcoming sales section
- Grouped by month
- Shopping tips

## Testing

### Test Specific Date
```javascript
import { getSaleForDate } from '../utils/salesCalendar';

// Test 11.11 sale
const sale = getSaleForDate(11, 11);
console.log(sale); // { name: '11.11 Mega Sale', discount: 50, ... }
```

### Test in Browser Console
```javascript
// Manually set date for testing (browser console)
const originalDate = Date;
global.Date = class extends Date {
  constructor() {
    super();
    return new originalDate('2024-11-11'); // Test 11.11 sale
  }
};

// Refresh page to see 11.11 sale
```

### Quick Test Script
```javascript
// Test all sales
import { SALES_CALENDAR } from '../utils/salesCalendar';

Object.entries(SALES_CALENDAR).forEach(([date, sale]) => {
  console.log(`${date}: ${sale.name} - ${sale.discount}% OFF ${sale.emoji}`);
});
```

## Integration Examples

### In ProductsPage
```jsx
import { getSalePrice } from '../utils/salesCalendar';

const products = [...]; // your products

return (
  <div className="grid grid-cols-3 gap-6">
    {products.map(product => {
      const saleInfo = getSalePrice(product);
      return (
        <div key={product.id}>
          {saleInfo.hasDiscount && (
            <div className="sale-badge">
              {saleInfo.discountPercent}% OFF
            </div>
          )}
          <h3>{product.name}</h3>
          {saleInfo.hasDiscount ? (
            <>
              <span className="line-through">₱{saleInfo.originalPrice}</span>
              <span className="text-red-600">₱{saleInfo.finalPrice}</span>
            </>
          ) : (
            <span>₱{product.price}</span>
          )}
        </div>
      );
    })}
  </div>
);
```

### In Cart/Checkout
```jsx
import { getSalePrice } from '../utils/salesCalendar';

const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const saleInfo = getSalePrice(item);
    const price = saleInfo.hasDiscount ? saleInfo.finalPrice : item.price;
    return total + (price * item.quantity);
  }, 0);
};
```

### In Navbar
```jsx
import { hasSaleToday, getCurrentSale } from '../utils/salesCalendar';

{hasSaleToday() && (
  <Link to="/sales" className="sale-link">
    {getCurrentSale().emoji} Sale Today!
  </Link>
)}
```

## Customization

### Add New Sale
```javascript
// In salesCalendar.js
export const SALES_CALENDAR = {
  // ... existing sales
  
  // Add new sale
  '3.15': {
    name: 'Spring Sale',
    discount: 20,
    emoji: '🌸',
    color: 'bg-pink-500',
    description: 'Spring into savings!'
  }
};
```

### Change Discount Percentage
```javascript
// Edit existing sale
'11.11': {
  name: '11.11 Mega Sale',
  discount: 60, // Changed from 50% to 60%
  emoji: '🔥',
  color: 'bg-red-600',
  description: 'BIGGEST SALE OF THE YEAR!'
}
```

### Add Sale Duration (Multi-day)
```javascript
// For sales that last multiple days
export const isSaleActive = (saleKey) => {
  const now = new Date();
  const [month, day] = saleKey.split('.').map(Number);
  
  // Example: 11.11 sale lasts 3 days (11.11 - 11.13)
  if (saleKey === '11.11') {
    const saleStart = new Date(now.getFullYear(), 10, 11); // Nov 11
    const saleEnd = new Date(now.getFullYear(), 10, 13);   // Nov 13
    return now >= saleStart && now <= saleEnd;
  }
  
  // Default: single day
  return now.getMonth() + 1 === month && now.getDate() === day;
};
```

## Best Practices

### 1. Cache Sale Info
```javascript
// Cache current sale to avoid repeated calculations
const [currentSale, setCurrentSale] = useState(null);

useEffect(() => {
  const sale = getCurrentSale();
  setCurrentSale(sale);
  
  // Update at midnight
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const timeout = setTimeout(() => {
    setCurrentSale(getCurrentSale());
  }, tomorrow - now);
  
  return () => clearTimeout(timeout);
}, []);
```

### 2. Show Sale Countdown
```javascript
const [countdown, setCountdown] = useState(null);

useEffect(() => {
  const updateCountdown = () => {
    setCountdown(getCountdownToNextSale());
  };
  
  updateCountdown();
  const interval = setInterval(updateCountdown, 60000); // Update every minute
  
  return () => clearInterval(interval);
}, []);
```

### 3. Notify Users
```javascript
// Send notification when sale starts
useEffect(() => {
  if (hasSaleToday()) {
    const sale = getCurrentSale();
    // Show notification
    if (Notification.permission === 'granted') {
      new Notification(`${sale.emoji} ${sale.name}`, {
        body: `${sale.discount}% OFF today only!`
      });
    }
  }
}, []);
```

## Analytics

### Track Sale Performance
```javascript
// Track which sales generate most revenue
const trackSalePurchase = (product, saleInfo) => {
  if (saleInfo.hasDiscount) {
    // Send to analytics
    analytics.track('Sale Purchase', {
      saleName: saleInfo.saleName,
      discount: saleInfo.discountPercent,
      savings: saleInfo.savings,
      product: product.name
    });
  }
};
```

## Troubleshooting

### Sale not showing?
1. Check system date: `new Date()`
2. Verify sale exists: `getSaleForDate(month, day)`
3. Check console logs
4. Clear cache and refresh

### Wrong discount applied?
1. Verify product price is correct
2. Check `getSalePrice()` return value
3. Ensure no conflicting discounts

### Banner not appearing?
1. Check if `SalesBanner` is imported
2. Verify it's added to App.jsx
3. Check if banner was dismissed (localStorage)

## Summary

✅ **Automatic Sales** - Based on date (1.1, 11.11, etc.)
✅ **15 Sales Events** - Throughout the year
✅ **Up to 50% OFF** - Biggest sale on 11.11
✅ **Sales Banner** - Auto-shows with countdown
✅ **Product Cards** - Automatic discount display
✅ **Sales Calendar** - Full year view
✅ **Easy Integration** - Simple utility functions

Perfect para sa e-commerce! Parang Shopee/Lazada na may automatic sales! 🎉🛍️
