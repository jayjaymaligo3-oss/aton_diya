import React from 'react';
import { clearAllLocalStorage } from '../utils/clearLocalStorage';

const ClearStorageButton = () => {
  const handleClear = () => {
    if (window.confirm('⚠️ This will clear all saved data and log you out. Continue?')) {
      clearAllLocalStorage();
    }
  };

  return (
    <button
      onClick={handleClear}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        zIndex: 9999
      }}
    >
      🗑️ Clear Storage
    </button>
  );
};

export default ClearStorageButton;
