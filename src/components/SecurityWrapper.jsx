import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Security wrapper component
 * - Prevents back button after logout
 * - Clears sensitive data
 * - Manages session security
 */
const SecurityWrapper = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Prevent back button after logout
  useEffect(() => {
    const handlePopState = () => {
      const loggedOut = sessionStorage.getItem('loggedOut');
      const logoutTime = sessionStorage.getItem('logoutTime');
      
      if (loggedOut === 'true' && logoutTime) {
        const timeSinceLogout = Date.now() - parseInt(logoutTime);
        
        // If logged out within last 5 minutes, prevent going back
        if (timeSinceLogout < 5 * 60 * 1000) {
          window.history.pushState(null, '', '/login');
          navigate('/login', { replace: true });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Push state to prevent back button
    if (!user && location.pathname !== '/login' && location.pathname !== '/register') {
      const loggedOut = sessionStorage.getItem('loggedOut');
      if (loggedOut === 'true') {
        window.history.pushState(null, '', location.pathname);
      }
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [user, location, navigate]);

  // Clear logout flag when user logs in
  useEffect(() => {
    if (user) {
      sessionStorage.removeItem('loggedOut');
      sessionStorage.removeItem('logoutTime');
      sessionStorage.removeItem('logoutReason');
    }
  }, [user]);

  // Disable right-click on sensitive pages (optional)
  useEffect(() => {
    const sensitivePages = ['/admin/dashboard', '/vendor/dashboard'];
    const isSensitivePage = sensitivePages.some(page => location.pathname.startsWith(page));

    if (isSensitivePage && user) {
      const handleContextMenu = (e) => {
        // Allow right-click in development
        if (import.meta.env.DEV) return;
        e.preventDefault();
      };

      document.addEventListener('contextmenu', handleContextMenu);

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
      };
    }
  }, [location, user]);

  // Disable F12 and inspect element on production (optional)
  useEffect(() => {
    if (import.meta.env.PROD && user) {
      const handleKeyDown = (e) => {
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [user]);

  return children;
};

export default SecurityWrapper;
