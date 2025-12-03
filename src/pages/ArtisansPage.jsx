import { motion } from 'framer-motion';
import { MapPin, Star, Package, Award } from 'lucide-react';
import { useState } from 'react';

const ArtisansPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Weaving', 'Woodwork', 'Pottery', 'Food Products', 'Furniture'];

  const artisans = [
    {
      id: 1,
      name: 'Maria Santos',
      specialty: 'Traditional Weaving',
      category: 'Weaving',
      location: 'Barangay San Juan, Bulalacao',
      rating: 4.9,
      products: 45,
      sales: 320,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
      description: 'Master weaver specializing in traditional banig mats and abaca products',
      badge: 'Top Seller'
    },
    {
      id: 2,
      name: 'Juan Dela Cruz',
      specialty: 'Coconut Shell Crafts',
      category: 'Woodwork',
      location: 'Barangay Poblacion, Bulalacao',
      rating: 5.0,
      products: 32,
      sales: 280,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070&auto=format&fit=crop',
      description: 'Expert in creating eco-friendly items from coconut shells',
      badge: 'Eco Champion'
    },
    {
      id: 3,
      name: 'Rosa Reyes',
      specialty: 'Bamboo Weaving',
      category: 'Weaving',
      location: 'Barangay Maasin, Bulalacao',
      rating: 4.8,
      products: 38,
      sales: 295,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2070&auto=format&fit=crop',
      description: 'Skilled artisan creating beautiful bamboo baskets and containers',
      badge: 'Featured'
    },
    {
      id: 4,
      name: 'Pedro Craftsman',
      specialty: 'Wood Carving',
      category: 'Woodwork',
      location: 'Barangay Bagong Sikat, Bulalacao',
      rating: 4.9,
      products: 28,
      sales: 210,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop',
      description: 'Traditional wood carver specializing in kitchen utensils and decor',
      badge: 'Master Craftsman'
    },
    {
      id: 5,
      name: 'Bulalacao Farms Collective',
      specialty: 'Organic Products',
      category: 'Food Products',
      location: 'Barangay San Roque, Bulalacao',
      rating: 4.7,
      products: 52,
      sales: 450,
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=2070&auto=format&fit=crop',
      description: 'Local farmers producing organic honey, coffee, and dried goods',
      badge: 'Organic Certified'
    },
    {
      id: 6,
      name: 'Furniture Masters',
      specialty: 'Rattan Furniture',
      category: 'Furniture',
      location: 'Barangay Maujao, Bulalacao',
      rating: 4.8,
      products: 24,
      sales: 180,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2070&auto=format&fit=crop',
      description: 'Expert furniture makers crafting premium rattan pieces',
      badge: 'Premium Quality'
    },
    {
      id: 7,
      name: 'Clay Artists Collective',
      specialty: 'Pottery & Ceramics',
      category: 'Pottery',
      location: 'Barangay Cabugao, Bulalacao',
      rating: 4.9,
      products: 41,
      sales: 265,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2070&auto=format&fit=crop',
      description: 'Traditional potters creating functional and decorative clay items',
      badge: 'Artisan Made'
    },
    {
      id: 8,
      name: 'Weaving Collective',
      specialty: 'Textile Arts',
      category: 'Weaving',
      location: 'Barangay Milagrosa, Bulalacao',
      rating: 5.0,
      products: 36,
      sales: 310,
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2070&auto=format&fit=crop',
      description: 'Group of weavers preserving traditional textile patterns',
      badge: 'Heritage Keeper'
    },
    {
      id: 9,
      name: 'Mountain Coffee Co.',
      specialty: 'Coffee Production',
      category: 'Food Products',
      location: 'Barangay Nasukob, Bulalacao',
      rating: 5.0,
      products: 18,
      sales: 520,
      image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=2070&auto=format&fit=crop',
      description: 'Local coffee growers and roasters producing premium beans',
      badge: 'Best Seller'
    }
  ];

  const filteredArtisans = selectedCategory === 'All' 
    ? artisans 
    : artisans.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-soft-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2070&auto=format&fit=crop')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-forest-green/90 to-earth-brown/90"></div>
        <div className="absolute inset-0 woven-texture opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              Meet Our Artisans
            </h1>
            <p className="text-xl md:text-2xl text-coconut-tan leading-relaxed">
              The talented craftspeople behind our authentic indigenous products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-light-cream sticky top-20 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`btn-organic px-6 py-2 transition-all ${
                  selectedCategory === category
                    ? 'bg-dawn-orange text-white'
                    : 'border-2 border-coconut-tan text-earth-brown hover:border-dawn-orange'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Artisans Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtisans.map((artisan, index) => (
              <motion.div
                key={artisan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="basket-card overflow-hidden group cursor-pointer"
              >
                {/* Artisan Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {artisan.badge && (
                    <div className="absolute top-4 right-4 bg-dawn-orange text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {artisan.badge}
                    </div>
                  )}
                </div>

                {/* Artisan Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-playfair font-bold text-forest-green mb-2">
                    {artisan.name}
                  </h3>
                  <p className="text-dawn-orange font-semibold mb-3">
                    {artisan.specialty}
                  </p>
                  <p className="text-earth-brown text-sm mb-4 line-clamp-2">
                    {artisan.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-earth-brown mb-4">
                    <MapPin className="w-4 h-4 text-sea-blue" />
                    <span>{artisan.location}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-coconut-tan/30">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-warm-gold fill-warm-gold" />
                        <span className="font-bold text-forest-green">{artisan.rating}</span>
                      </div>
                      <span className="text-xs text-earth-brown">Rating</span>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-forest-green mb-1">{artisan.products}</div>
                      <span className="text-xs text-earth-brown">Products</span>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-forest-green mb-1">{artisan.sales}</div>
                      <span className="text-xs text-earth-brown">Sales</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <a href={`/artisans/${artisan.id}`}>
                    <button className="w-full btn-organic bg-dawn-orange hover:bg-warm-gold text-white py-3 font-semibold">
                      View Products
                    </button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sea-blue to-forest-green text-white relative overflow-hidden">
        <div className="absolute inset-0 woven-texture opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-playfair font-bold mb-6">
              Become an Artisan Partner
            </h2>
            <p className="text-xl text-coconut-tan mb-8">
              Join our community of talented craftspeople and showcase your products to customers worldwide
            </p>
            <a href="/vendor/register">
              <button className="btn-organic bg-dawn-orange hover:bg-warm-gold text-white px-8 py-4 text-lg font-semibold">
                Apply Now
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ArtisansPage;
