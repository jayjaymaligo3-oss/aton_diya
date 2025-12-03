import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, MapPin, Truck, CheckCircle } from 'lucide-react';

const TrackOrderPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setOrderStatus({
        number: trackingNumber,
        status: 'In Transit',
        estimatedDelivery: 'December 25, 2024',
        timeline: [
          { status: 'Order Placed', date: 'Dec 20, 2024', completed: true },
          { status: 'Processing', date: 'Dec 21, 2024', completed: true },
          { status: 'Shipped', date: 'Dec 22, 2024', completed: true },
          { status: 'In Transit', date: 'Dec 23, 2024', completed: true },
          { status: 'Out for Delivery', date: 'Dec 25, 2024', completed: false },
          { status: 'Delivered', date: 'Dec 25, 2024', completed: false },
        ],
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-white via-coconut-tan/20 to-soft-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-dawn-orange to-warm-gold rounded-full flex items-center justify-center">
              <Package className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-dark-forest mb-4">
            Track Your Order
          </h1>
          <p className="text-forest-green text-lg">
            Enter your tracking number to see your order status
          </p>
        </motion.div>

        {/* Tracking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <form onSubmit={handleTrack} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number (e.g., ATD123456789)"
                className="w-full px-6 py-4 border-2 border-coconut-tan/30 rounded-xl focus:border-dawn-orange focus:outline-none transition-colors"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-dawn-orange to-warm-gold text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
              {loading ? 'Tracking...' : 'Track'}
            </motion.button>
          </form>
        </motion.div>

        {/* Order Status */}
        {orderStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* Status Header */}
            <div className="border-b border-coconut-tan/30 pb-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-forest-green mb-1">Tracking Number</p>
                  <p className="font-bold text-xl text-dark-forest">{orderStatus.number}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-forest-green mb-1">Status</p>
                  <p className="font-bold text-xl text-dawn-orange">{orderStatus.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-forest-green">
                <Truck className="w-5 h-5" />
                <p>Estimated Delivery: <span className="font-semibold">{orderStatus.estimatedDelivery}</span></p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              <h3 className="font-playfair text-2xl font-bold text-dark-forest mb-6">Order Timeline</h3>
              {orderStatus.timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.completed 
                        ? 'bg-gradient-to-br from-dawn-orange to-warm-gold' 
                        : 'bg-coconut-tan/30'
                    }`}>
                      {item.completed ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      )}
                    </div>
                    {index < orderStatus.timeline.length - 1 && (
                      <div className={`w-0.5 h-12 ${
                        item.completed ? 'bg-dawn-orange' : 'bg-coconut-tan/30'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <h4 className={`font-semibold text-lg ${
                      item.completed ? 'text-dark-forest' : 'text-forest-green/50'
                    }`}>
                      {item.status}
                    </h4>
                    <p className={`text-sm ${
                      item.completed ? 'text-forest-green' : 'text-forest-green/50'
                    }`}>
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Address */}
            <div className="mt-8 pt-6 border-t border-coconut-tan/30">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-dawn-orange mt-1" />
                <div>
                  <h4 className="font-semibold text-dark-forest mb-1">Delivery Address</h4>
                  <p className="text-forest-green">
                    Bulalacao, Oriental Mindoro, Philippines
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-forest-green">
            Need help with your order?{' '}
            <a href="/contact" className="text-dawn-orange hover:underline font-semibold">
              Contact Support
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
