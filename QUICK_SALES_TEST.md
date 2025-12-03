# Quick Sales Testing Guide

## Mabilis na Pag-test ng Sales System

### Method 1: Test sa Browser Console

Buksan ang browser console (F12) at paste:

```javascript
// Test kung may sale today
const { getCurrentSale, hasSaleToday } = await import('./src/utils/salesCalendar.js');

if (hasSaleToday()) {
  const sale = getCurrentSale();
  console.log('🎉 SALE TODAY!');
  console.log(`Name: ${sale.name}`);
  console.log(`Discount: ${sale.discount}%`);
  console.log(`Emoji: ${sale.emoji}`);
} else {
  console.log('No sale today 😢');
}
```

### Method 2: Test Specific Date

Para mag-test ng specific sale date (e.g., 11.11):

```javascript
// Paste sa browser console
const originalDate = Date;
Date = class extends originalDate {
  constructor(...args) {
    if (args.length === 0) {
      super('2024-11-11T12:00:00'); // Test 11.11 sale
    } else {
      super(...args);
    }
  }
  static now() {
    return new originalDate('2024-11-11T12:00:00').getTime();
  }
};

// Refresh page
location.reload();
```

### Method 3: Test All Sales

```javascript
// View all sales
const { SALES_CALENDAR } = await import('./src/utils/salesCalendar.js');

console.table(
  Object.entries(SALES_CALENDAR).map(([date, sale]) => ({
    Date: date,
    Name: sale.name,
    Discount: `${sale.discount}%`,
    Emoji: sale.emoji
  }))
);
```

### Method 4: Test Product Discount

```javascript
const { getSalePrice, formatPrice } = await import('./src/utils/salesCalendar.js');

const product = {
  name: 'Handwoven Basket',
  price: 1000
};

const saleInfo = getSalePrice(product);

if (saleInfo.hasDiscount) {
  console.log('✅ SALE ACTIVE!');
  console.log(`Sale: ${saleInfo.saleName} ${saleInfo.saleEmoji}`);
  console.log(`Original: ${formatPrice(saleInfo.originalPrice)}`);
  console.log(`Discount: ${saleInfo.discountPercent}%`);
  console.log(`Final: ${formatPrice(saleInfo.finalPrice)}`);
  console.log(`You Save: ${formatPrice(saleInfo.savings)}`);
} else {
  console.log('No discount today');
  console.log(`Price: ${formatPrice(product.price)}`);
}
```

## Visual Testing

### 1. Test Sales Banner
1. Open homepage
2. Kung may sale today, dapat may banner sa taas
3. May animation at emoji
4. Pwedeng i-close (X button)

### 2. Test Sales Calendar Page
1. Go to `/sales`
2. Dapat makita lahat ng sales for the year
3. Current sale (if any) highlighted
4. Upcoming sales with countdown

### 3. Test Product Cards
1. Go to products page
2. Kung may sale, dapat may:
   - Sale badge (e.g., "50% OFF")
   - Original price (crossed out)
   - Sale price (red, highlighted)
   - Savings amount

## Test Scenarios

### Scenario 1: 11.11 Mega Sale (Biggest Sale)
```javascript
// Set date to Nov 11
Date = class extends Date {
  constructor() { super('2024-11-11'); }
};
location.reload();
```

**Expected:**
- 🔥 Red banner: "11.11 Mega Sale"
- 50% OFF badge
- All products show 50% discount
- Original prices crossed out

### Scenario 2: Valentine's Day
```javascript
// Set date to Feb 14
Date = class extends Date {
  constructor() { super('2024-02-14'); }
};
location.reload();
```

**Expected:**
- 💝 Pink banner: "Valentine's Day Sale"
- 14% OFF badge
- Romantic theme

### Scenario 3: No Sale Day
```javascript
// Set date to random day without sale
Date = class extends Date {
  constructor() { super('2024-03-15'); }
};
location.reload();
```

**Expected:**
- No sale banner
- Regular prices
- Maybe countdown to next sale (if within 7 days)

## Quick Verification Checklist

### ✅ Sales Banner
- [ ] Shows on sale days
- [ ] Correct emoji and color
- [ ] Correct discount percentage
- [ ] Can be dismissed
- [ ] Shows countdown for upcoming sales

### ✅ Product Prices
- [ ] Original price shown (crossed out)
- [ ] Sale price highlighted in red
- [ ] Savings amount displayed
- [ ] Correct discount calculation

### ✅ Sales Calendar Page
- [ ] All 15 sales listed
- [ ] Grouped by month
- [ ] Current sale highlighted
- [ ] Upcoming sales section
- [ ] Countdown working

### ✅ Discount Calculation
- [ ] Correct percentage applied
- [ ] Math is accurate
- [ ] No rounding errors
- [ ] Works with different prices

## Common Issues

### Issue: Banner not showing
**Fix:**
1. Check if today has a sale: `hasSaleToday()`
2. Check if banner was dismissed (localStorage)
3. Verify SalesBanner is in App.jsx

### Issue: Wrong discount
**Fix:**
1. Check SALES_CALENDAR for correct percentage
2. Verify date format (month.day)
3. Check getSalePrice() function

### Issue: Countdown not updating
**Fix:**
1. Check interval is running
2. Verify getCountdownToNextSale() returns data
3. Check console for errors

## Production Testing

### Before Launch:
1. Test all 15 sale dates
2. Verify discount calculations
3. Check mobile responsiveness
4. Test banner dismiss functionality
5. Verify countdown accuracy
6. Test timezone handling

### On Sale Day:
1. Monitor at midnight (sale activation)
2. Check banner appears
3. Verify all products show discount
4. Test checkout with sale prices
5. Monitor analytics

## Success Indicators

✅ Banner shows automatically on sale days
✅ Correct discount applied to all products
✅ Countdown shows for upcoming sales
✅ Sales calendar displays all events
✅ No console errors
✅ Mobile responsive
✅ Performance is good

Tapos! Ready na ang sales system! 🎉
