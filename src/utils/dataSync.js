// Data Synchronization Utility
// Saves data to both localStorage AND database

import api from '../services/api';

/**
 * Sync data to both localStorage and database
 */
export const syncData = async (key, data, endpoint) => {
  try {
    // 1. Save to localStorage first (immediate)
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`✅ Saved to localStorage: ${key}`);
    
    // 2. Try to save to database
    try {
      const response = await api.post(endpoint, data);
      console.log(`✅ Saved to database: ${endpoint}`);
      return { success: true, source: 'both', data: response.data };
    