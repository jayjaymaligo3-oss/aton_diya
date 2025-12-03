import { motion } from 'framer-motion';
import { Calendar, TrendingDown, Clock, Gift } from 'lucide-react';
import { SALES_CALENDAR, getCurrentSale, getUpcomingSales, hasSaleToday } from '../utils/salesCalendar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SalesCalendarPage = () => {
  const currentSale = getCurrentSale();
  const upcomingSales = getUpcomingSales();

  // Group sales by month
  const salesByMonth = {};
  Object.entries(SALES_CALENDAR).forEach(([key, sale]) => {
    const [month] = key.split('.');
    if (!salesByMonth[month]) {
      salesByMonth[month] = [];
    }
    salesByMonth[month].push({ date: key, ...sale });
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen bg-light-cream">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-12 h-12 text-dawn-orange" />
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-forest-green">
              Sales Calendar 2024
            </h1>
          </div>
          <p className="text-earth-brown text-lg max-w-2xl mx-auto">
            Mark your calendars! Don't miss out on our amazing sales throughout the year
          </p>
        </motion.div>

        {/* Current Sale Highlight */}
        {currentSale && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${currentSale.color} text-white rounded-2xl p-8 mb-12 relative overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
            </div>
            
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                {currentSale.emoji}
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">🔥 HAPPENING NOW! 🔥</h2>
              <h3 className="text-4xl font-playfair font-bold mb-3">{currentSale.name}</h3>
              <p className="text-xl mb-4">{currentSale.description}</p>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block bg-white text-red-600 px-8 py-4 rounded-full font-bold text-3xl shadow-2xl"
              >
                {currentSale.discount}% OFF
              </motion.div>
              <div className="mt-6">
                <button className="bg-white text-forest-green px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Upcoming Sales */}
        {!hasSaleToday() && upcomingSales.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-playfair font-bold text-forest-green mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Coming Soon
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingSales.map((sale, index) => (
                <motion.div
                  key={sale.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="basket-card p-6 text-center"
                >
                  <div className="text-4xl mb-3">{sale.emoji}</div>
                  <h3 className="font-bold text-forest-green mb-2">{sale.name}</h3>
                  <div className="text-2xl font-bold text-dawn-orange mb-2">
                    {sale.discount}% OFF
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    {sale.description}
                  </div>
                  <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                    In {sale.daysUntil} {sale.daysUntil === 1 ? 'day' : 'days'}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Sales by Month */}
        <div>
          <h2 className="text-2xl font-playfair font-bold text-forest-green mb-6 flex items-center gap-2">
            <Gift className="w-6 h-6" />
            All Sales Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(salesByMonth).map(([month, sales]) => (
              <motion.div
                key={month}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="basket-card p-6"
              >
                <h3 className="text-xl font-bold text-forest-green mb-4 border-b-2 border-coconut-tan pb-2">
                  {monthNames[parseInt(month) - 1]}
                </h3>
                
                <div className="space-y-3">
                  {sales.map((sale) => {
                    const [m, d] = sale.date.split('.');
                    const isToday = hasSaleToday() && getCurrentSale()?.name === sale.name;
                    
                    return (
                      <div
                        key={sale.date}
                        className={`p-3 rounded-lg ${
                          isToday ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{sale.emoji}</span>
                            <span className="font-semibold text-earth-brown">
                              {monthNames[parseInt(m) - 1]} {d}
                            </span>
                          </div>
                          {isToday && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                              LIVE
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-semibold text-forest-green mb-1">
                          {sale.name}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">{sale.description}</span>
                          <span className={`${sale.color} text-white text-xs px-2 py-1 rounded-full font-bold`}>
                            {sale.discount}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-dawn-orange to-forest-green text-white rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4">💡 Shopping Tips</h3>
          <ul className="space-y-2">
            <li>✅ Add items to your wishlist before sale days</li>
            <li>✅ Set reminders for your favorite sale events</li>
            <li>✅ Follow us for exclusive early access</li>
            <li>✅ Biggest discounts: 11.11 (50% OFF) and 12.12 (45% OFF)</li>
            <li>✅ Free shipping on orders over ₱500 during sales</li>
          </ul>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default SalesCalendarPage;
