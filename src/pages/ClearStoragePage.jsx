import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ClearStoragePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const clearEverything = async () => {
      console.log('🗑️ Clearing all storage...');
      
      // Clear localStorage
      localStorage.clear();
      
      // Clear sessionStorage
      sessionStorage.clear();
      
      // Logout
      try {
        await logout();
      } catch (error) {
        console.log('Logout error (ignored):', error);
      }
      
      console.log('✅ Storage cleared!');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    };

    clearEverything();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-white">
      <div className="text-center basket-card p-8 max-w-md">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-dawn-orange mx-auto mb-4"></div>
        <h2 className="text-2xl font-playfair font-bold text-forest-green mb-2">
          Clearing Storage...
        </h2>
        <p className="text-earth-brown mb-4">
          Removing all cached data and logging you out.
        </p>
        <p className="text-sm text-earth-brown/60">
          You will be redirected to login page shortly.
        </p>
      </div>
    </div>
  );
};

export default ClearStoragePage;
