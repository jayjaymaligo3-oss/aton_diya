import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, User, Search, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth();
  const { getCartCount, wishlist } = useCart();
  const navigate = useNavigate();
  
  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Artisans', path: '/artisans' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-navbar transition-all duration-300 ${
        isScrolled 
          ? 'bg-soft-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-soft-white/90 backdrop-blur-sm shadow-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-dawn-orange shadow-lg">
              <img 
                src="/logo.jpg" 
                alt="Aton Diya Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="font-playfair font-bold text-xl text-forest-green transition-colors">
                Aton Diya
              </h1>
              <p className="text-xs text-earth-brown">
                E-Palengke Bulalacao
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-poppins font-medium text-forest-green hover:text-dawn-orange transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dawn-orange transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-light-cream transition-colors"
            >
              <Search className="w-5 h-5 text-forest-green" />
            </motion.button>

            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/wishlist')}
              className={`p-2 rounded-full transition-colors relative ${
                isScrolled ? 'hover:bg-light-cream' : 'hover:bg-white/10'
              }`}
            >
              <Heart className="w-5 h-5 text-forest-green" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-dawn-orange text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )}
            </motion.button>

            {/* User Menu */}
            {user ? (
              <Link to={user.role === 'vendor' ? '/vendor/dashboard' : '/customer/dashboard'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="btn-organic bg-dawn-orange text-white px-4 py-2 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">Dashboard</span>
                </motion.button>
              </Link>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="btn-organic bg-dawn-orange text-white px-6 py-2"
                >
                  Login
                </motion.button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-forest-green"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-soft-white border-t border-b border-coconut-tan/30 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-brown" />
                <input
                  type="text"
                  placeholder="Search for products, artisans, or categories..."
                  autoFocus
                  className="w-full pl-12 pr-4 py-3 border-2 border-coconut-tan rounded-full focus:border-dawn-orange focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigate(`/products?search=${e.target.value}`);
                      setIsSearchOpen(false);
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-soft-white border-t border-coconut-tan/30"
          >
            <div className="container mx-auto px-4 py-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 text-forest-green hover:text-dawn-orange font-poppins font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
