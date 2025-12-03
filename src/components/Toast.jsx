import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, ShoppingCart } from 'lucide-react';
import { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    cart: <ShoppingCart className="w-5 h-5 text-dawn-orange" />,
    error: <X className="w-5 h-5 text-red-500" />,
  };
  
  const borderColors = {
    success: 'border-green-500',
    cart: 'border-dawn-orange',
    error: 'border-red-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className="fixed top-24 right-4 z-[100] max-w-sm"
    >
      <div className={`basket-card p-4 shadow-2xl bg-white border-2 ${borderColors[type] || 'border-dawn-orange'}`}>
        <div className="flex items-center gap-3">
          {icons[type]}
          <p className="flex-1 text-forest-green font-semibold">{message}</p>
          <button
            onClick={onClose}
            className="text-earth-brown hover:text-forest-green transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Toast;
