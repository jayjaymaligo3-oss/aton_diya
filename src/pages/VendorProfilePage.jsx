import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, Mail, Star, Package, Award } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, vendorInfo } from '../data/products';

const VendorProfilePage = () => {
  const { vendorSlug } = useParams();
  const navigate = useNavigate();
  
  // Convert slug back to vendor name (find matching vendor)
  const decodedVendorName = Object.keys(vendorInfo).find(name => 
    name.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-') === vendorSlug
  ) || vendorSlug.replace(/-/g, ' ');
  
  // Get vendor info
  const currentVendorInfo = vendorInfo[decodedVendorName] || {
    description: 'Local artisan from Bulalacao',
    location: 'Bulalacao, Oriental Mindoro',
    phone: '+63 900 000 0000',
    email: 'vendor@bulalacao.ph',
    joinedDate: 'January 2023'
  };
  
  // Filter products by vendor
  const vendorProducts = products.filter(p => p.vendor === decodedVendorName);
  
  // Calculate vendor stats
  const totalSales = vendorProducts.length * 100; // Sample calculation
  const avgRating = vendorProducts.length > 0
    ? (vendorProducts.reduce((sum, p) => sum + parseFloat(p.rating), 0) / vendorProducts.length).toFixed(1)
    : '5.0';

  const currentVendor = {
    name: decodedVendorName,
    ...currentVendorInfo,
    rating: avgRating,
    totalSales: totalSales,
    products: vendorProducts
  };

  // Sample vendor data (fallback for old hardcoded vendors)
  const vendorData = {
    'Mountain Coffee Co.': {
      name: 'Mountain Coffee Co.',
      description: 'Premium locally grown and roasted coffee beans from the mountains of Bulalacao. We take pride in our sustainable farming practices and traditional roasting methods.',
      location: 'Bulalacao, Oriental Mindoro',
      phone: '+63 912 345 6789',
      email: 'info@mountaincoffee.ph',
      rating: 4.9,
      totalSales: 1250,
      joinedDate: 'January 2023',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop',
      products: [
        {
          id: 7,
          name: 'Native Coffee Beans',
          description: 'Locally grown and roasted coffee beans',
          price: '420.00',
          rating: '5.0',
          vendor: 'Mountain Coffee Co.',
          category: 'Food Products',
          badge: 'Best Seller',
          image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop'
        },
        {
          id: 101,
          name: 'Arabica Coffee Blend',
          description: 'Premium arabica coffee blend with rich flavor',
          price: '550.00',
          rating: '4.9',
          vendor: 'Mountain Coffee Co.',
          category: 'Food Products',
          badge: 'Premium',
          image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2061&auto=format&fit=crop'
        },
        {
          id: 102,
          name: 'Robusta Coffee Beans',
          description: 'Strong and bold robusta coffee beans',
          price: '380.00',
          rating: '4.8',
          vendor: 'Mountain Coffee Co.',
          category: 'Food Products',
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2087&auto=format&fit=crop'
        },
        {
          id: 103,
          name: 'Ground Coffee Pack',
          description: 'Freshly ground coffee ready to brew',
          price: '320.00',
          rating: '4.9',
          vendor: 'Mountain Coffee Co.',
          category: 'Food Products',
          badge: 'New',
          image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2087&auto=format&fit=crop'
        }
      ]
    },
    'Maria Santos': {
      name: 'Maria Santos',
      description: 'Traditional weaver specializing in handwoven textiles and banig mats. Preserving indigenous weaving techniques passed down through generations.',
      location: 'Bulalacao, Oriental Mindoro',
      phone: '+63 917 234 5678',
      email: 'maria.santos@weaving.ph',
      rating: 4.9,
      totalSales: 890,
      joinedDate: 'March 2023',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop',
      products: [
        {
          id: 1,
          name: 'Handwoven Banig Mat',
          description: 'Traditional sleeping mat made from indigenous materials',
          price: '850.00',
          rating: '4.9',
          vendor: 'Maria Santos',
          category: 'Textiles',
          badge: 'Featured',
          image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop'
        },
        {
          id: 104,
          name: 'Woven Table Runner',
          description: 'Decorative table runner with indigenous patterns',
          price: '480.00',
          rating: '4.8',
          vendor: 'Maria Santos',
          category: 'Textiles',
          badge: 'Handwoven',
          image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2070&auto=format&fit=crop'
        },
        {
          id: 105,
          name: 'Traditional Placemats Set',
          description: 'Set of 6 handwoven placemats',
          price: '650.00',
          rating: '4.9',
          vendor: 'Maria Santos',
          category: 'Textiles',
          image: 'https://images.unsplash.com/photo-1615486511262-41e86e4d1d8e?q=80&w=2070&auto=format&fit=crop'
        }
      ]
    },
    'Juan Dela Cruz': {
      name: 'Juan Dela Cruz',
      description: 'Eco-friendly craftsman creating beautiful products from sustainable materials. Specializing in coconut shell crafts and bamboo products.',
      location: 'Bulalacao, Oriental Mindoro',
      phone: '+63 918 345 6789',
      email: 'juan@ecocrafts.ph',
      rating: 5.0,
      totalSales: 1450,
      joinedDate: 'February 2023',
      image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc768?q=80&w=2070&auto=format&fit=crop',
      products: [
        {
          id: 2,
          name: 'Coconut Shell Bowl Set',
          description: 'Eco-friendly decorative bowls from coconut shells',
          price: '450.00',
          rating: '5.0',
          vendor: 'Juan Dela Cruz',
          category: 'Handicrafts',
          badge: 'New',
          image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc768?q=80&w=2070&auto=format&fit=crop'
        },
        {
          id: 106,
          name: 'Bamboo Utensil Set',
          description: 'Eco-friendly bamboo kitchen utensils',
          price: '380.00',
          rating: '5.0',
          vendor: 'Juan Dela Cruz',
          category: 'Handicrafts',
          badge: 'Eco-Friendly',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop'
        },
        {
          id: 107,
          name: 'Coconut Shell Planters',
          description: 'Natural planters made from coconut shells',
          price: '320.00',
          rating: '4.9',
          vendor: 'Juan Dela Cruz',
          category: 'Handicrafts',
          image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2072&auto=format&fit=crop'
        }
      ]
    }
  };

  // If no products found, show message
  if (vendorProducts.length === 0) {
    return (
      <div className="min-h-screen bg-soft-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-earth-brown hover:text-dawn-orange transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="text-center py-20">
            <h2 className="text-2xl font-playfair font-bold text-forest-green mb-4">
              Vendor Not Found
            </h2>
            <p className="text-earth-brown mb-6">
              No products found for "{decodedVendorName}"
            </p>
            <button
              onClick={() => navigate('/products')}
              className="btn-organic bg-dawn-orange text-white px-6 py-3"
            >
              Browse All Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-earth-brown hover:text-dawn-orange transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Vendor Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="basket-card p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Vendor Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-forest-green flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                {currentVendor.name.charAt(0)}
              </div>
            </div>

            {/* Vendor Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-playfair font-bold text-forest-green mb-2">
                    {currentVendor.name}
                  </h1>
                  <div className="flex items-center gap-4 text-earth-brown mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-warm-gold text-warm-gold" />
                      <span className="font-semibold">{currentVendor.rating} Rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="w-5 h-5 text-dawn-orange" />
                      <span className="font-semibold">{currentVendor.totalSales} Sales</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-5 h-5 text-dawn-orange" />
                      <span className="font-semibold">Verified Vendor</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-earth-brown text-lg leading-relaxed mb-4">
                {currentVendor.description}
              </p>

              {/* Contact Info */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-earth-brown">
                  <MapPin className="w-5 h-5 text-dawn-orange" />
                  <span>{currentVendor.location}</span>
                </div>
                <div className="flex items-center gap-2 text-earth-brown">
                  <Phone className="w-5 h-5 text-dawn-orange" />
                  <span>{currentVendor.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-earth-brown">
                  <Mail className="w-5 h-5 text-dawn-orange" />
                  <span>{currentVendor.email}</span>
                </div>
              </div>

              <div className="mt-4 text-sm text-earth-brown/70">
                Member since {currentVendor.joinedDate}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Section */}
        <div className="mb-6">
          <h2 className="text-3xl font-playfair font-bold text-forest-green mb-2">
            Products by {currentVendor.name}
          </h2>
          <p className="text-earth-brown">
            Showing {currentVendor.products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentVendor.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorProfilePage;
