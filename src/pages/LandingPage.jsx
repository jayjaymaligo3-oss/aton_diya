import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import { Leaf, Users, Award, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  // Featured products from local artisans
  const featuredProducts = [
    {
      id: 1,
      name: 'Handwoven Banig Mat',
      description: 'Traditional sleeping mat woven by Maria Santos using indigenous pandan leaves',
      price: '850.00',
      originalPrice: '1200.00',
      rating: '4.9',
      vendor: 'Maria Santos',
      badge: 'Featured',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Coconut Shell Bowl Set',
      description: 'Eco-friendly decorative bowls handcrafted by Juan from recycled coconut shells',
      price: '450.00',
      rating: '5.0',
      vendor: 'Juan Dela Cruz',
      badge: 'New',
      image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc768?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Organic Wild Honey',
      description: 'Pure honey harvested by Bulalacao Farms from mountain beekeepers',
      price: '350.00',
      rating: '4.8',
      vendor: 'Bulalacao Farms',
      badge: 'Organic',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784acc?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Bamboo Woven Baskets',
      description: 'Handcrafted storage baskets by Rosa Reyes using sustainable local bamboo',
      price: '650.00',
      rating: '4.9',
      vendor: 'Rosa Reyes',
      badge: 'Popular',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 5,
      name: 'Abaca Woven Bags',
      description: 'Sustainable handwoven bags from abaca fiber by Weaving Collective artisans',
      price: '750.00',
      rating: '4.7',
      vendor: 'Weaving Collective',
      badge: 'Eco-Friendly',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 6,
      name: 'Wooden Carved Utensils',
      description: 'Traditional hand-carved kitchen utensils by master craftsman Pedro',
      price: '280.00',
      rating: '4.9',
      vendor: 'Pedro Craftsman',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 7,
      name: 'Native Coffee Beans',
      description: 'Locally grown and roasted coffee beans from Mountain Coffee Co. farms',
      price: '420.00',
      originalPrice: '550.00',
      rating: '5.0',
      vendor: 'Mountain Coffee Co.',
      badge: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 8,
      name: 'Rattan Furniture Set',
      description: 'Premium handmade rattan chairs and tables by Furniture Masters collective',
      price: '2500.00',
      rating: '4.8',
      vendor: 'Furniture Masters',
      badge: 'Premium',
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 9,
      name: 'Clay Pottery Set',
      description: 'Traditional handmade clay pots and vases by Clay Artists Collective',
      price: '580.00',
      rating: '4.9',
      vendor: 'Clay Artists Collective',
      badge: 'Artisan Made',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 10,
      name: 'Woven Table Runner',
      description: 'Elegant table runner with traditional patterns by Maria Santos',
      price: '380.00',
      rating: '5.0',
      vendor: 'Maria Santos',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 11,
      name: 'Coconut Oil Soap',
      description: 'Natural handmade soap with virgin coconut oil by Bulalacao Farms',
      price: '120.00',
      rating: '4.8',
      vendor: 'Bulalacao Farms',
      badge: 'Natural',
      image: 'https://images.unsplash.com/photo-1600857544200-b9f666a5e2d2?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 12,
      name: 'Bamboo Wind Chimes',
      description: 'Handcrafted bamboo wind chimes with soothing sounds by Rosa Reyes',
      price: '320.00',
      rating: '4.7',
      vendor: 'Rosa Reyes',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 13,
      name: 'Wooden Salad Bowl',
      description: 'Large hand-carved salad bowl from native hardwood by Pedro Craftsman',
      price: '890.00',
      rating: '5.0',
      vendor: 'Pedro Craftsman',
      badge: 'Premium',
      image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 14,
      name: 'Dried Mango Strips',
      description: 'Sweet and chewy dried mango strips from local farms',
      price: '180.00',
      rating: '4.9',
      vendor: 'Bulalacao Farms',
      image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 15,
      name: 'Rattan Lamp Shade',
      description: 'Beautiful woven rattan lamp shade by Furniture Masters',
      price: '680.00',
      rating: '4.8',
      vendor: 'Furniture Masters',
      badge: 'New',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 16,
      name: 'Abaca Placemats Set',
      description: 'Set of 6 handwoven placemats from natural abaca fiber',
      price: '420.00',
      rating: '4.9',
      vendor: 'Weaving Collective',
      image: 'https://images.unsplash.com/photo-1600857062241-98e5e6b78a5f?q=80&w=2070&auto=format&fit=crop'
    },
  ];

  const stats = [
    { icon: Users, value: '500+', label: 'Local Artisans' },
    { icon: Leaf, value: '2000+', label: 'Products' },
    { icon: Award, value: '98%', label: 'Satisfaction' },
    { icon: TrendingUp, value: '₱5M+', label: 'Sales Generated' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-light-cream via-soft-white to-light-cream relative overflow-hidden">
        <div className="absolute inset-0 woven-texture opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-forest-green mb-3">
              Our Impact
            </h2>
            <p className="text-earth-brown">Making a difference in the Bulalacao community</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="basket-card p-6 text-center"
              >
                <div className="tribal-icon w-16 h-16 mx-auto mb-4 gentle-float" style={{ animationDelay: `${index * 0.2}s` }}>
                  <stat.icon className="w-8 h-8 text-dawn-orange" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-forest-green mb-2">{stat.value}</h3>
                <p className="text-earth-brown font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-soft-white pattern-overlay relative">
        <div className="absolute inset-0 woven-texture opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-6 py-2 bg-dawn-orange/10 text-dawn-orange rounded-full text-sm font-semibold">
                ⭐ Featured Collection
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-forest-green mb-4">
              Indigenous Products
            </h2>
            <p className="text-lg text-earth-brown max-w-2xl mx-auto leading-relaxed">
              Discover authentic handcrafted items from local artisans of Bulalacao
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 12).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-organic bg-dawn-orange hover:bg-warm-gold text-white px-8 py-4 text-lg font-semibold shadow-lg"
              >
                View All Products
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission Section - About */}
      <section className="py-20 bg-gradient-to-br from-sea-blue via-forest-green to-dark-forest text-white relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')`,
          }}
        ></div>
        <div className="absolute inset-0 woven-texture opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-white drop-shadow-lg"
            >
              Our Mission
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl leading-relaxed mb-8 text-white drop-shadow-md font-medium"
            >
              To empower local artisans and preserve the rich cultural heritage of Bulalacao, Oriental Mindoro 
              by providing a digital platform that connects indigenous products with customers worldwide, 
              while promoting sustainable and eco-friendly practices.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="/about">
                <button className="btn-organic bg-dawn-orange hover:bg-warm-gold text-white px-8 py-4 text-lg font-semibold shadow-xl">
                  Learn More About Us
                </button>
              </a>
              <a href="/artisans">
                <button className="btn-organic bg-transparent border-2 border-white text-white hover:bg-white hover:text-forest-green px-8 py-4 text-lg font-semibold shadow-xl">
                  Meet Our Artisans
                </button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Artisan Spotlight */}
      <section className="py-20 bg-gradient-to-br from-light-cream via-soft-white to-coconut-tan/20 relative overflow-hidden">
        <div className="absolute inset-0 woven-texture opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-6 py-2 bg-forest-green/10 text-forest-green rounded-full text-sm font-semibold shadow-sm">
                👥 Featured Artisans
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-forest-green mb-4 drop-shadow-sm">
              Meet Our Artisans
            </h2>
            <p className="text-lg text-earth-brown max-w-2xl mx-auto leading-relaxed font-medium">
              The talented craftspeople behind our authentic products
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                name: 'Maria Santos', 
                specialty: 'Traditional Weaving', 
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
                products: featuredProducts.filter(p => p.vendor === 'Maria Santos').length,
                description: 'Expert in banig mats, table runners, and traditional woven textiles'
              },
              { 
                name: 'Juan Dela Cruz', 
                specialty: 'Coconut Shell Crafts', 
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
                products: featuredProducts.filter(p => p.vendor === 'Juan Dela Cruz').length,
                description: 'Creates eco-friendly bowls, decorative items from coconut shells'
              },
              { 
                name: 'Rosa Reyes', 
                specialty: 'Bamboo Crafts', 
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
                products: featuredProducts.filter(p => p.vendor === 'Rosa Reyes').length,
                description: 'Specializes in bamboo baskets, wind chimes, and home decor'
              }
            ].map((artisan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="basket-card p-8 text-center group cursor-pointer"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-dawn-orange to-warm-gold rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-dawn-orange shadow-lg">
                    <img
                      src={artisan.image}
                      alt={artisan.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-forest-green mb-2 drop-shadow-sm">
                  {artisan.name}
                </h3>
                <p className="text-dawn-orange font-bold mb-2 text-lg">
                  {artisan.specialty}
                </p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-forest-green/10 text-forest-green rounded-full text-xs font-bold">
                    {artisan.products} Products
                  </span>
                </div>
                <p className="text-earth-brown mb-6 text-sm leading-relaxed font-medium">
                  {artisan.description}
                </p>
                <a href={`/artisans/${index + 1}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-organic bg-dawn-orange hover:bg-warm-gold text-white px-6 py-3 text-sm font-semibold w-full"
                  >
                    View Products →
                  </motion.button>
                </a>
              </motion.div>
            ))}
          </div>

          {/* View All Artisans Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a href="/artisans">
              <button className="btn-organic border-2 border-forest-green text-forest-green hover:bg-forest-green hover:text-white px-8 py-4 text-lg font-semibold">
                View All Artisans
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Artisan Products Showcase */}
      <section className="py-20 bg-soft-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-forest-green mb-4 drop-shadow-sm">
              Products by Our Artisans
            </h2>
            <p className="text-lg text-earth-brown max-w-2xl mx-auto font-medium">
              Each product tells a story of tradition, skill, and dedication
            </p>
          </motion.div>

          {/* Maria Santos Products */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-dawn-orange shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                  alt="Maria Santos"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-playfair font-bold text-forest-green">Maria Santos</h3>
                <p className="text-dawn-orange font-semibold">Traditional Weaving</p>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.filter(p => p.vendor === 'Maria Santos').map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pedro Craftsman Products */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-dawn-orange shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
                  alt="Pedro Craftsman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-playfair font-bold text-forest-green">Pedro Craftsman</h3>
                <p className="text-dawn-orange font-semibold">Wood Carving</p>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.filter(p => p.vendor === 'Pedro Craftsman').map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bulalacao Farms Products */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-dawn-orange shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200"
                  alt="Bulalacao Farms"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-playfair font-bold text-forest-green">Bulalacao Farms</h3>
                <p className="text-dawn-orange font-semibold">Organic Products</p>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.filter(p => p.vendor === 'Bulalacao Farms').map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-soft-white via-light-cream to-soft-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-forest-green mb-4 drop-shadow-sm">
              Why Choose Aton Diya?
            </h2>
            <p className="text-lg text-earth-brown max-w-2xl mx-auto font-medium">
              More than just a marketplace - we're a community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: '🌿',
                title: 'Authentic & Sustainable',
                description: 'Every product is handcrafted using traditional methods and eco-friendly materials'
              },
              {
                icon: '🤝',
                title: 'Fair Trade Guaranteed',
                description: 'Artisans receive fair compensation for their skills and craftsmanship'
              },
              {
                icon: '🏆',
                title: 'Quality Assured',
                description: 'Each item is carefully inspected to meet our high standards of excellence'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="basket-card p-8 text-center"
              >
                <div className="text-5xl mb-4 drop-shadow-md">{feature.icon}</div>
                <h3 className="text-xl font-playfair font-bold text-forest-green mb-3 drop-shadow-sm">
                  {feature.title}
                </h3>
                <p className="text-earth-brown leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Contact */}
      <section className="py-20 bg-gradient-to-br from-forest-green via-dark-forest to-earth-brown text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop')`,
          }}
        ></div>
        <div className="absolute inset-0 woven-texture opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-white drop-shadow-lg">
              Start Your Journey Today
            </h2>
            <p className="text-xl text-white mb-8 leading-relaxed drop-shadow-md font-medium">
              Join thousands of satisfied customers supporting local artisans and preserving Filipino heritage
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-organic bg-dawn-orange hover:bg-warm-gold text-white px-10 py-4 text-lg font-semibold shadow-2xl"
                >
                  Shop Now
                </motion.button>
              </a>
              <a href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-organic bg-transparent border-2 border-white text-white hover:bg-white hover:text-forest-green px-10 py-4 text-lg font-semibold shadow-2xl"
                >
                  Contact Us
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
