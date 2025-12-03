# Quick Test - Cart at Wishlist Persistence

## Mabilis na Test

### 1. I-run ang app
```bash
cd react-frontend
npm run dev
```

### 2. Test Cart
1. Pumunta sa Products page
2. Mag-add ng 2-3 products sa cart
3. **I-refresh ang page (F5)**
4. ✅ Dapat nandoon pa rin ang cart items!

### 3. Test Wishlist
1. Mag-add ng 2-3 products sa wishlist (heart icon)
2. **I-refresh ang page (F5)**
3. ✅ Dapat nandoon pa rin ang wishlist items!

### 4. Test Browser Close
1. I-close ang browser tab
2. Buksan ulit ang site
3. ✅ Dapat nandoon pa rin ang cart at wishlist!

## Debug Commands (sa Browser Console)

Buksan ang browser console (F12) at i-type:

```javascript
// Tingnan ang cart at wishlist data
debugStorage()

// Clear cart only
clearCartStorage()

// Clear wishlist only
clearWishlistStorage()

// Clear lahat
clearAllStorage()
```

## Ano ang Dapat Makita

### Sa Console:
```
Cart loaded from localStorage: 2 items
Wishlist loaded from localStorage: 3 items
Cart saved to localStorage: 2 items
```

### Sa DevTools (F12 → Application → Local Storage):
- **cart**: `[{"id":1,"name":"Product 1",...}]`
- **wishlist**: `[{"id":2,"name":"Product 2",...}]`

## ✅ Tapos na!

Ang cart at wishlist ay naka-save na sa localStorage. Kahit mag-refresh, mag-close ng browser, o bumalik kinabukasan, nandoon pa rin ang lahat ng items!
