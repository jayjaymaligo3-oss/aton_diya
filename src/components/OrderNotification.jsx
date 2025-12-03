import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Package, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

const OrderNotification = ({ orders, onDismiss }) => {
  const [notifications, setNotifications] = useState([]);
  const [lastOrderCount, setLastOrderCount] = useState(orders.length);

  useEffect(() => {
    // Check for new orders
    if (orders.length > lastOrderCount) {
      const newOrders = orders.slice(0, orders.length - lastOrderCount);
      const newNotifications = newOrders.map(order => ({
        id: order.id,
        order,
        timestamp: Date.now(),
      }));
      
      setNotifications(prev => [...newNotifications, ...prev]);
      
      // Play notification sound (optional)
      try {
        const audio = new Audio('/notification.mp3');
        audio.play().catch(() => {});
      } catch (e) {}
      
      // Auto dismiss after 10 seconds
      newNotifications.forEach(notif => {
        setTimeout(() => {
          dismissNotification(notif.id);
        }, 10000);
      });
    }
    
    setLastOrderCount(orders.length);
  }, [orders.length]);

  const dismissNotification = (orderId) => {
    setNotifications(prev => prev.filter(n => n.id !== orderId));
    if (onDismiss) onDismiss(orderId);
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="bg-white rounded-lg shadow-2xl border-l-4 border-dawn-orange p-4 relative"
          >
            <button
              onClick={() => dismissNotification(notif.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-start gap-3">
              <div className="bg-dawn-orange/10 p-2 rounded-full">
                <Bell className="w-5 h-5 text-dawn-orange animate-bounce" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-forest-green mb-1">
                  New Order Received!
                </h4>
                <p className="text-sm text-earth-brown mb-2">
                  Order #{notif.order.id} from {notif.order.customer}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    <span>{notif.order.product}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Just now</span>
                  </div>
                </div>
                <div className="mt-2 text-sm font-semibold text-dawn-orange">
                  ₱{notif.order.total.toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default OrderNotification;
