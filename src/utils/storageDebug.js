// Utility functions para i-debug ang localStorage

export const debugLocalStorage = () => {
  console.log('=== localStorage Debug ===');
  
  try {
    const cart = localStorage.getItem('cart');
    const wishlist = localStorage.getItem('wishlist');
    
    console.log('Cart data:', cart ? JSON.parse(cart) : 'Empty');
    console.log('Wishlist data:', wishlist ? JSON.parse(wishlist) : 'Empty');
    
    // Check total localStorage size
    let totalSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage[key].length + key.length;
      }
    }
    console.log('Total localStorage size:', (totalSize / 1024).toFixed(2), 'KB');
    
  } catch (error) {
    console.error('Error reading localStorage:', error);
  }
  
  console.log('======================');
};

export const clearCartStorage = () => {
  localStorage.removeItem('cart');
  console.log('Cart cleared from localStorage');
};

export const clearWishlistStorage = () => {
  localStorage.removeItem('wishlist');
  console.log('Wishlist cleared from localStorage');
};

export const clearAllStorage = () => {
  localStorage.clear();
  console.log('All localStorage cleared');
};

// Para ma-access sa browser console
if (typeof window !== 'undefined') {
  window.debugStorage = debugLocalStorage;
  window.clearCartStorage = clearCartStorage;
  window.clearWishlistStorage = clearWishlistStorage;
  window.clearAllStorage = clearAllStorage;
}
