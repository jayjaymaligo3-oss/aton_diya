# Cart at Wishlist Persistence Guide

## Ano ang Ginawa

Nag-update ako ng `CartContext.jsx` para siguruhing ang cart at wishlist ay naka-save sa **localStorage** at automatic na nare-restore kahit mag-refresh o mag-close ng browser.

## Mga Pagbabago

### 1. Improved localStorage Initialization
- Ginagamit na ang **lazy initialization** sa `useState` para mas mabilis at mas reliable ang pag-load ng data
- Nag-add ng error handling para sa localStorage operations
- Automatic na nag-save sa localStorage tuwing may changes sa cart o wishlist

### 2. Paano Gumagana

**Cart:**
- Kada mag-add, remove, o update ng quantity → automatic save sa localStorage
- Pag nag-refresh ng page → automatic restore ng cart items
- Pag nag-close at bumalik → nandoon pa rin ang cart items

**Wishlist:**
- Kada mag-add o remove ng item sa wishlist → automatic save sa localStorage
- Pag nag-refresh ng page → automatic restore ng wishlist items
- Pag nag-close at bumalik → nandoon pa rin ang wishlist items

## Paano I-test

### 1. Test Cart Persistence
```
1. Pumunta sa Products page
2. Mag-add ng ilang products sa cart
3. I-refresh ang page (F5 o Ctrl+R)
4. Check kung nandoon pa rin ang cart items
5. I-close ang browser tab
6. Buksan ulit ang site
7. Check kung nandoon pa rin ang cart items
```

### 2. Test Wishlist Persistence
```
1. Pumunta sa Products page
2. Mag-add ng ilang products sa wishlist (heart icon)
3. I-refresh ang page
4. Check kung nandoon pa rin ang wishlist items
5. I-close ang browser tab
6. Buksan ulit ang site
7. Check kung nandoon pa rin ang wishlist items
```

### 3. Check localStorage sa Browser DevTools
```
1. Press F12 para buksan ang DevTools
2. Pumunta sa "Application" tab (Chrome) o "Storage" tab (Firefox)
3. Sa left sidebar, click "Local Storage"
4. Click ang domain ng site (e.g., http://localhost:5173)
5. Makikita mo ang:
   - Key: "cart" → Value: JSON array ng cart items
   - Key: "wishlist" → Value: JSON array ng wishlist items
```

## Console Logs

Makikita mo sa browser console ang mga messages:
- `Cart loaded from localStorage: X items` - pag nag-load ng cart
- `Wishlist loaded from localStorage: X items` - pag nag-load ng wishlist
- `Cart saved to localStorage: X items` - pag nag-save ng cart
- `Wishlist saved to localStorage: X items` - pag nag-save ng wishlist

## Troubleshooting

### Kung hindi pa rin nag-save ang cart/wishlist:

1. **Check kung naka-enable ang localStorage sa browser**
   - Some browsers may disable localStorage in private/incognito mode
   - Check browser settings

2. **Clear localStorage at subukan ulit**
   ```javascript
   // Sa browser console, i-type:
   localStorage.clear()
   // Then refresh the page
   ```

3. **Check kung may errors sa console**
   - Press F12 at tingnan ang Console tab
   - Hanapin ang mga error messages

4. **Verify na gumagana ang CartProvider**
   - Check kung naka-wrap ang app sa CartProvider (nasa App.jsx)
   - Dapat ganito ang structure:
   ```jsx
   <AuthProvider>
     <CartProvider>
       <Router>
         ...
       </Router>
     </CartProvider>
   </AuthProvider>
   ```

## Database Integration (Future)

Para sa mas advanced na persistence at multi-device sync, pwede nating i-integrate sa Laravel backend:

1. **Create API endpoints:**
   - `POST /api/cart` - Save cart to database
   - `GET /api/cart` - Get cart from database
   - `POST /api/wishlist` - Save wishlist to database
   - `GET /api/wishlist` - Get wishlist from database

2. **Update CartContext:**
   - Sync localStorage with database
   - Load from database pag nag-login
   - Save to database kada may changes

3. **Benefits:**
   - Cart/wishlist accessible sa multiple devices
   - Naka-save kahit mag-clear ng browser data
   - Better analytics at reporting

## Summary

Ang cart at wishlist ay naka-save na sa localStorage at automatic na nare-restore. Subukan mo lang mag-add ng items, i-refresh ang page, at makikita mo na nandoon pa rin ang lahat ng items!
