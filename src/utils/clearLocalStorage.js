// Utility function to clear all localStorage data
export const clearAllLocalStorage = () => {
  try {
    // Clear all localStorage
    localStorage.clear();
    
    // Also clear sessionStorage if needed
    sessionStorage.clear();
    
    console.log('✅ Local storage cleared successfully!');
    
    // Reload the page to reset the app state
    window.location.href = '/';
    
    return true;
  } catch (error) {
    console.error('❌ Error clearing local storage:', error);
    return false;
  }
};

// Clear specific items only
export const clearAuthData = () => {
  try {
    // Remove auth-related items
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    
    console.log('✅ Auth data cleared!');
    return true;
  } catch (error) {
    console.error('❌ Error clearing auth data:', error);
    return false;
  }
};

// View all localStorage items
export const viewLocalStorage = () => {
  console.log('📦 Current localStorage items:');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}:`, value);
  }
};
