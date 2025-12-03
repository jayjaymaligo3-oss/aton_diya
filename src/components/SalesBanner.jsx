import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, TrendingDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCurrentSale, getCountdownToNextSale, hasSaleToday } from '../utils/salesCalendar';

const SalesBanner = () => {
  const [currentSale, setCurrentSale] = useState(null);
  const [nextSale, setNextSale] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // Check for current sale
    const sale = getCurrentSale();
    setCurrentSale(sale);

    // If no current sale, get next sale countdown
    if (!sale) {
      const next = getCountdownToNextSale();
      setNextSale(next);
    }

    // Update countdown every minute
    const interval = setInterval(() => {
      if (!hasSaleToday()) {
        const next = getCountdownToNextSale();
        setNextSale(next);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!showBanner) return null;

  // Current Sale Banner
  if (currentSale) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className={`${currentSale.color} text-white py-3 px-4 relative overflow-hidden`}
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="w-full h-full"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)',
                backgroundSize: '200% 200%',
              }}
            />
          </div>

          <div className="container mx-auto flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4 flex-1">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-3xl"
              >
                {currentSale.emoji}
              </motion.span>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-bold text-lg">{currentSale.name}</h3>
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="bg-white text-red-600 px-3 py-1 rounded-full font-bold text-sm"
                  >
                    {currentSale.discount}% OFF
                  </motion.span>
                </div>
                <p className="text-sm opacity-90">{currentSale.description}</p>
              </div>
            </div>

            <button
              onClick={() => setShowBanner(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Upcoming Sale Countdown Banner
  if (nextSale && nextSale.countdown.days <= 7) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4"
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <Clock className="w-6 h-6" />
              
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-bold">
                    {nextSale.sale.emoji} {nextSale.sale.name} Coming Soon!
                  </h3>
                  <span className="bg-white text-purple-600 px-3 py-1 rounded-full font-bold text-sm">
                    {nextSale.sale.discount}% OFF
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm">
                  <span>Starts in:</span>
                  <div className="flex gap-2">
                    <span className="bg-white/20 px-2 py-1 rounded">
                      {nextSale.countdown.days}d
                    </span>
                    <span className="bg-white/20 px-2 py-1 rounded">
                      {nextSale.countdown.hours}h
                    </span>
                    <span className="bg-white/20 px-2 py-1 rounded">
                      {nextSale.countdown.minutes}m
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowBanner(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return null;
};

export default SalesBanner;
