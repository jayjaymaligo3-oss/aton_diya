import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Enable cookies for CSRF
});

// Helper to get CSRF cookie
export const getCsrfCookie = async () => {
  try {
    const response = await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
      }
    });
    console.log('✅ CSRF cookie obtained');
    return response;
  } catch (error) {
    console.warn('⚠️ Failed to get CSRF cookie:', error.message);
    throw error;
  }
};

// Helper to get CSRF token from cookie
const getCsrfTokenFromCookie = () => {
  const name = 'XSRF-TOKEN';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return null;
};

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // Add token if available (for API token authentication)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CSRF token from cookie
    const csrfToken = getCsrfTokenFromCookie();
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Only handle errors if we have a response (backend is available)
    if (error.response) {
      if (error.response.status === 401) {
        console.log('401 Unauthorized - token may be invalid');
        // Token is invalid, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('authenticated');
        // Don't auto-redirect, let the app handle it
      }
      
      if (error.response.status === 403) {
        // Handle forbidden access
        console.log('403 Forbidden - access denied');
      }
    }
    // If no response (network error, backend down), silently fail
    
    return Promise.reject(error);
  }
);

export default api;
