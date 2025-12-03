# 🗑️ Paano Mag-Clear ng Local Storage

## Mga Paraan:

### 1️⃣ **Gamit ang Browser Console (Pinakamabilis)**

1. Buksan ang React app mo sa browser
2. Press `F12` o right-click > "Inspect"
3. Pumunta sa "Console" tab
4. Type at press Enter:
```javascript
localStorage.clear()
```
5. Refresh ang page (`F5` o `Ctrl+R`)

---

### 2️⃣ **Gamit ang Application Tab**

1. Press `F12` sa browser
2. Pumunta sa "Application" tab (sa Chrome/Edge)
3. Sa left sidebar, expand "Local Storage"
4. Click yung URL ng app mo
5. Right-click > "Clear"
6. Refresh ang page

---

### 3️⃣ **Gamit ang Clear Storage Button**

Pwede mo i-add yung `ClearStorageButton` component sa kahit anong page:

```jsx
import ClearStorageButton from './components/ClearStorageButton';

function App() {
  return (
    <div>
      {/* Your app content */}
      <ClearStorageButton />
    </div>
  );
}
```

---

## 🔍 Para Tingnan ang Laman ng Local Storage

Sa browser console, type:
```javascript
// View all items
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key + ':', localStorage.getItem(key));
}
```

---

## ⚠️ Ano ang Matatanggal?

Kapag nag-clear ng localStorage, mawawala ang:
- Saved login credentials
- User session data
- Cached data
- Saved preferences
- Offline data

---

## 💡 Tips

- Mag-clear ng localStorage kapag may login issues
- Mag-clear after testing para fresh start
- Automatic logout after clearing
- Safe gawin - walang mawawalang data sa database
