import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { X, Clock } from 'lucide-react';

/**
 * Inactivity logout component
 * - Tracks user activity
 * - Shows warning before auto-logout
 * - Logs out after inactivity timeout
 */
const InactivityLogout = ({ 
  timeout = 30 * 60 * 1000, // 30 minutes
  warningTime = 2 * 60 * 1000 // 2 minutes warning
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timeoutRef = useRef(null);
  const warningTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const clearAllTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
  };

  const handleLogout = async () => {
    clearAllTimers();
    setShowWarning(false);
    await logout();
    navigate('/login', { 
      replace: true,
      state: { message: 'You have been logged out due to inactivity.' }
    });
  };

  const resetTimer = () => {
    if (!user) return;

    clearAllTimers();
    setShowWarning(false);

    // Set warning timeout
    warningTimeoutRef.current = setTimeout(() => {
      setShowWarning(true);
      setCountdown(Math.floor(warningTime / 1000));

      // Start countdown
      countdownIntervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, timeout - warningTime);

    // Set logout timeout
    timeoutRef.current = setTimeout(handleLogout, timeout);
  };

  const handleStayLoggedIn = () => {
    resetTimer();
  };

  useEffect(() => {
    if (!user) return;

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click', 'mousemove'];

    const handleActivity = () => {
      if (!showWarning) {
        resetTimer();
      }
    };

    // Set initial timer
    resetTimer();

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Cleanup
    return () => {
      clearAllTimers();
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [user, showWarning]);

  if (!user || !showWarning) return null;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Session Timeout Warning</h3>
              <p className="text-sm text-gray-600">You will be logged out soon</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            You have been inactive for a while. For your security, you will be automatically logged out in:
          </p>
          
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 text-center">
            <div className="text-5xl font-bold text-orange-600 mb-2">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
            <p className="text-sm text-orange-700">minutes remaining</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleStayLoggedIn}
            className="flex-1 bg-forest-green text-white py-3 px-6 rounded-lg font-semibold hover:bg-forest-green/90 transition-colors"
          >
            Stay Logged In
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Logout Now
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Click "Stay Logged In" to continue your session
        </p>
      </div>
    </div>
  );
};

export default InactivityLogout;
