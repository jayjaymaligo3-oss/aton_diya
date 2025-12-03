import { motion } from 'framer-motion';
import { ShoppingBag, Users, MapPin, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShoppingBag,
      title: 'Indigenous Products',
      description: 'Authentic local crafts and goods',
      link: '/products'
    },
    {
      icon: Users,
      title: 'Local Artisans',
      description: 'Support community vendors',
      link: '/artisans'
    },
    {
      icon: MapPin,
      title: 'Delivery Tracking',
      description: 'Real-time order monitoring',
      link: '/track'
    },
    {
      icon: TrendingUp,
      title: 'Sales Analytics',
      description: 'Vendor insights and reports',
      link: '/vendor/dashboard'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden pattern-overlay">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop')`,
        }}
      ></div>
      
      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-green/90 via-dark-forest/85 to-earth-brown/90"></div>
      
      {/* Animated Pattern Overlay */}
      <div className="absolute inset-0 woven-texture opacity-10"></div>
      
      {/* Cinematic Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-dawn-orange opacity-10 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          {/* Main Title with Woven Pattern */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight drop-shadow-2xl"
            style={{ textShadow: '3px 3px 10px rgba(0, 0, 0, 0.7)' }}
          >
            <span className="inline-block">Aton Diya</span>
            <br />
            <span className="text-dawn-orange drop-shadow-2xl" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>E-Palengke Bulalacao</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-white font-poppins max-w-3xl mx-auto mb-8 font-medium drop-shadow-lg"
            style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)' }}
          >
            A Digital Marketplace for Indigenous and Local Products of Bulalacao, Oriental Mindoro
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="/products">
              <button className="btn-organic bg-dawn-orange hover:bg-warm-gold text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105">
                Explore Products
              </button>
            </a>
            <a href="/register?role=vendor">
              <button className="btn-organic bg-transparent border-2 border-white text-white hover:bg-white hover:text-dark-forest px-8 py-4 text-lg font-semibold shadow-2xl">
                Become a Vendor
              </button>
            </a>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              onClick={() => navigate(feature.link)}
              className="basket-card p-6 text-center cursor-pointer"
            >
              <div className="tribal-icon mx-auto mb-4 gentle-float" style={{ animationDelay: `${index * 0.2}s` }}>
                <feature.icon className="w-6 h-6 text-dawn-orange" />
              </div>
              <h3 className="text-lg font-playfair font-semibold text-forest-green mb-2 drop-shadow-sm">
                {feature.title}
              </h3>
              <p className="text-sm text-earth-brown font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-coconut-tan rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-dawn-orange rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
