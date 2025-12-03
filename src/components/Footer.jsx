import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    'Quick Links': [
      { name: 'About Us', path: '/about' },
      { name: 'Products', path: '/products' },
      { name: 'Artisans', path: '/artisans' },
      { name: 'Contact', path: '/contact' },
    ],
    'For Vendors': [
      { name: 'Become a Vendor', path: '/vendor/register' },
      { name: 'Vendor Dashboard', path: '/vendor/dashboard' },
      { name: 'Seller Guide', path: '/vendor/guide' },
      { name: 'Support', path: '/support' },
    ],
    'Customer Care': [
      { name: 'Help Center', path: '/help' },
      { name: 'Track Order', path: '/track' },
      { name: 'Returns', path: '/returns' },
      { name: 'FAQs', path: '/faqs' },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-br from-dark-forest via-forest-green to-earth-brown text-soft-white pattern-overlay">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-dawn-orange shadow-lg">
                <img 
                  src="/logo.jpg" 
                  alt="Aton Diya Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-playfair font-bold text-2xl">Aton Diya</h3>
                <p className="text-coconut-tan text-sm">E-Palengke Bulalacao</p>
              </div>
            </div>
            <p className="text-coconut-tan mb-6 leading-relaxed">
              A Digital Marketplace celebrating the indigenous and local products of Bulalacao, Oriental Mindoro. 
              Supporting local artisans and preserving cultural heritage.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href="https://facebook.com/atondiya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dawn-orange/20 hover:bg-dawn-orange flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href="https://instagram.com/atondiya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dawn-orange/20 hover:bg-dawn-orange flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href="mailto:info@atondiya.ph"
                className="w-10 h-10 rounded-full bg-dawn-orange/20 hover:bg-dawn-orange flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-playfair font-semibold text-lg mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <motion.li 
                    key={link.path}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={link.path}
                      className="text-coconut-tan hover:text-dawn-orange transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-dawn-orange group-hover:w-3 transition-all duration-300"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-coconut-tan/30 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-dawn-orange flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold mb-1">Address</h5>
                <a 
                  href="https://maps.google.com/?q=Bulalacao,Oriental+Mindoro,Philippines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-coconut-tan hover:text-dawn-orange transition-colors text-sm"
                >
                  Bulalacao, Oriental Mindoro, Philippines
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-dawn-orange flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold mb-1">Phone</h5>
                <a 
                  href="tel:+63XXXXXXXXX" 
                  className="text-coconut-tan hover:text-dawn-orange transition-colors text-sm"
                >
                  +63 XXX XXX XXXX
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-dawn-orange flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold mb-1">Email</h5>
                <a 
                  href="mailto:info@atondiya.ph" 
                  className="text-coconut-tan hover:text-dawn-orange transition-colors text-sm"
                >
                  info@atondiya.ph
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-coconut-tan/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-coconut-tan text-sm text-center md:text-left">
            © {new Date().getFullYear()} Aton Diya E-Palengke Bulalacao. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-coconut-tan hover:text-dawn-orange transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-coconut-tan hover:text-dawn-orange transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-dawn-orange via-warm-gold to-dawn-orange"></div>
    </footer>
  );
};

export default Footer;
