import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Security hook for session management
 * - Auto logout on inactivity
 * - Prevent back button after logout
 * - Clear sensitive data on logout
 */
export const useSecureSession = (inactivityTimeout = 30 * 60 * 1000) => { // 30 minutes default
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const isLoggingOutRef = useRef(false);

  // Clear all sensitive data
  const clearSensitiveData = useCallback(() => {
    // Clear localStorage
    const keysToKeep = ['theme', 'language']; // Keep non-sensitive data
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });

    // Clear sessionStorage
    sessionStorage.clear();

    // Clear any cached data
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
  }, []);

  // Handle logout with security measures
  const secureLogout = useCallback(async (reason = 'manual') => {
    if (isLoggingOutRef.current) return;
    isLoggingOutRef.current = true;

    try {
      // Clear timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Perform logout
      await logout();

      // Clear sensitive data
      clearSensitiveData();

      // Add logout flag to prevent back button
      sessionStorage.setItem('loggedOut', 'true');
      sessionStorage.setItem('logoutTime', Date.now().toString());
      sessionStorage.setItem('logoutReason', reason);

      // Redirect to login
      navigate('/login', { 
        replace: true,
        state: { 
          message: reason === 'inactivity' 
            ? 'You have been logged out due to inactivity.' 
            : 'You have been logged out successfully.',
          from: null // Clear previous location
        }
      });

      // Prevent back button by replacing history
      window.history.pushState(null, '', '/login');
      
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      isLoggingOutRef.current = false;
    }
  }, [logout, navigate, clearSensitiveData]);

  // Reset inactivity timer
  const resetTimer = useCallback(() => {
    if (!user) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      secureLogout('inactivity');
    }, inactivityTimeout);
  }, [user, inactivityTimeout, secureLogout]);

  // Track user activity
  useEffect(() => {
    if (!user) return;

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

    const handleActivity = () => {
      resetTimer();
    };

    // Set initial timer
    resetTimer();

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [user, resetTimer]);

  // Prevent back button after logout
  useEffect(() => {
    const handlePopState = (e) => {
      const loggedOut = sessionStorage.getItem('loggedOut');
      const logoutTime = sessionStorage.getItem('logoutTime');
      
      if (loggedOut === 'true' && logoutTime) {
        const timeSinceLogout = Date.now() - parseInt(logoutTime);
        
        // If logged out within last 5 minutes, prevent going back
        if (timeSinceLogout < 5 * 60 * 1000) {
          e.preventDefault();
          window.history.pushState(null, '', '/login');
          navigate('/login', { replace: true });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Push initial state to prevent back
    if (!user) {
      window.history.pushState(null, '', window.location.pathname);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [user, navigate]);

  // Clear logout flag when user logs in
  useEffect(() => {
    if (user) {
      sessionStorage.removeItem('loggedOut');
      sessionStorage.removeItem('logoutTime');
      sessionStorage.removeItem('logoutReason');
    }
  }, [user]);

  // Warn before closing tab with unsaved changes
  useEffect(() => {
    if (!user) return;

    const handleBeforeUnload = (e) => {
      // Check if there are unsaved changes (you can customize this)
      const hasUnsavedChanges = false; // Implement your logic here
      
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user]);

  return {
    secureLogout,
    resetTimer
  };
};
