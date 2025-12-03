import { motion } from 'framer-motion';
import { ShieldX, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AccessDenied = ({ requiredRole }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoBack = () => {
    // Redirect based on user role
    if (user?.role === 'vendor') {
      navigate('/vendor/dashboard');
    } else if (user?.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (user?.role === 'customer') {
      navigate('/customer/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-cream to-coconut-tan flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ShieldX className="w-12 h-12 text-red-600" />
        </motion.div>

        <h1 className="text-3xl font-playfair font-bold text-forest-green mb-4">
          Access Denied
        </h1>

        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
          <p className="text-earth-brown mb-2">
            You don't have permission to access this page.
          </p>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-semibold">Required Role:</span>{' '}
              <span className="text-red-600 font-bold uppercase">{requiredRole}</span>
            </p>
            <p>
              <span className="font-semibold">Your Role:</span>{' '}
              <span className="text-blue-600 font-bold uppercase">{user?.role || 'None'}</span>
            </p>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          This area is restricted to {requiredRole}s only. Please contact support if you believe this is an error.
        </p>

        <button
          onClick={handleGoBack}
          className="w-full btn-organic bg-dawn-orange text-white py-3 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Go to My Dashboard
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-3 btn-organic border-2 border-gray-300 text-gray-700 py-3"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default AccessDenied;
