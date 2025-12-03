import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const productsPerPage = 12;

  const categories = ['All', 'Handicrafts', 'Food Products', 'Textiles', 'Home Decor', 'Accessories'];

  const products = [
    {
      id: 1,
      name: 'Handwoven Banig Mat',
      description: 'Traditional handwoven mat made from natural materials by local artisans',
      price: '850.00',
      rating: '4.9',
      vendor: 'NACBA Indigenous Crafts',
      vendorEmail: 'nacba@gmail.com',
      category: 'Handicrafts',
      badge: 'Featured',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Bamboo Basket Set',
      description: 'Handcrafted bamboo baskets perfect for storage and home organization',
      price: '650.00',
      rating: '5.0',
      vendor: 'NACBA Indigenous Crafts',
      vendorEmail: 'nacba@gmail.com',
      category: 'Handicrafts',
      badge: 'New',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Coconut Shell Bowl',
      description: 'Eco-friendly bowls made from natural coconut shells',
      price: '380.00',
      rating: '4.8',
      vendor: 'NACBA Indigenous Crafts',
      vendorEmail: 'nacba@gmail.com',
      category: 'Home Decor',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Organic Wild Honey',
      description: 'Pure organic wild honey harvested from local forests',
      price: '450.00',
      rating: '5.0',
      vendor: 'NACBA Indigenous Crafts',
      vendorEmail: 'nacba@gmail.com',
      category: 'Food Products',
      badge: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=400&h=400&fit=crop'
    },
    {
      id: 5,
      name: 'Rattan Handbag',
      description: 'Stylish handwoven rattan handbag, perfect for any occasion',
      price: '720.00',
      rating: '4.9',
      vendor: 'NACBA Indigenous Crafts',
      vendorEmail: 'nacba@gmail.com',
      category: 'Accessories',
      badge: 'Eco-Friendly',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop'
    },
    {
      id: 6,
      name: 'Coconut Shell Bowl Set',
      description: 'Eco-friendly decorative bowls from coconut shells',
      price: '450.00',
      rating: '5.0',
      vendor: 'Juan Dela Cruz',
      vendorEmail: 'juan@example.com',
      category: 'Handicrafts',
      image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc768?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 7,
      name: 'Traditional Banig',
      description: 'Traditional sleeping mat made from indigenous materials',
      price: '850.00',
      rating: '4.9',
      vendor: 'Maria Santos',
      vendorEmail: 'maria@example.com',
      category: 'Textiles',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 8,
      name: 'Bamboo Woven Baskets',
      description: 'Handcrafted storage baskets',
      price: '650.00',
      rating: '4.9',
      vendor: 'Local Artisans',
      category: 'Handicrafts',
      badge: 'Popular',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 9,
      name: 'Abaca Woven Bags',
      description: 'Sustainable handwoven bags from abaca fiber',
      price: '750.00',
      rating: '4.7',
      vendor: 'Weaving Collective',
      category: 'Accessories',
      badge: 'Eco-Friendly',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 10,
      name: 'Wooden Carved Utensils',
      description: 'Traditional hand-carved kitchen utensils',
      price: '280.00',
      rating: '4.9',
      vendor: 'Pedro Craftsman',
      category: 'Handicrafts',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 11,
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
      id: 12,
      name: 'Rattan Furniture Set',
      description: 'Handmade rattan chairs and tables',
      price: '2500.00',
      rating: '4.8',
      vendor: 'Furniture Masters',
      category: 'Home Decor',
      badge: 'Premium',
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 13,
      name: 'Palm Leaf Hats',
      description: 'Traditional woven hats for sun protection',
      price: '320.00',
      rating: '4.6',
      vendor: 'Hat Weavers Guild',
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 14,
      name: 'Handmade Pottery',
      description: 'Clay pots and vases made by local potters',
      price: '580.00',
      rating: '4.9',
      vendor: 'Clay Artists',
      category: 'Home Decor',
      badge: 'Artisan Made',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 15,
      name: 'Dried Fish Products',
      description: 'Locally caught and sun-dried fish',
      price: '250.00',
      rating: '4.7',
      vendor: 'Fishermen Cooperative',
      category: 'Food Products',
      image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 16,
      name: 'Woven Table Runners',
      description: 'Decorative table runners with indigenous patterns',
      price: '480.00',
      rating: '4.8',
      vendor: 'Textile Artisans',
      category: 'Textiles',
      badge: 'Handwoven',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2070&auto=format&fit=crop'
    },
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-soft-white pt-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-sea-blue text-white py-16 pattern-overlay relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop')`,
          }}
        ></div>
        <div className="absolute inset-0 woven-texture opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-playfair font-bold mb-4">Indigenous Products</h1>
            <p className="text-xl text-coconut-tan max-w-2xl mx-auto">
              Discover authentic handcrafted items from local artisans of Bulalacao
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters & Search */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-brown" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, vendors, or artisans..."
                className="w-full pl-12 pr-4 py-3 border-2 border-coconut-tan rounded-full focus:border-dawn-orange focus:outline-none"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-4">
              <button className="btn-organic border-2 border-coconut-tan text-earth-brown px-6 py-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <div className="flex gap-2 bg-light-cream rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === 'grid' ? 'bg-dawn-orange text-white' : 'text-earth-brown'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === 'list' ? 'bg-dawn-orange text-white' : 'text-earth-brown'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-earth-brown mb-2">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`btn-organic px-6 py-2 transition-all ${
                    selectedCategory === category
                      ? 'bg-dawn-orange text-white border-2 border-dawn-orange'
                      : 'border-2 border-coconut-tan hover:border-dawn-orange hover:bg-dawn-orange hover:text-white text-earth-brown'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-earth-brown">
            Showing <span className="font-semibold text-forest-green">{indexOfFirstProduct + 1}</span> to{' '}
            <span className="font-semibold text-forest-green">
              {Math.min(indexOfLastProduct, filteredProducts.length)}
            </span>{' '}
            of <span className="font-semibold text-forest-green">{filteredProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-earth-brown mb-4">No products found</p>
            <p className="text-earth-brown mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="btn-organic bg-dawn-orange text-white px-6 py-3"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center items-center gap-2 mt-12 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`btn-organic px-6 py-2 border-2 transition-all ${
                currentPage === 1
                  ? 'border-coconut-tan/50 text-earth-brown/50 cursor-not-allowed'
                  : 'border-coconut-tan text-earth-brown hover:border-dawn-orange hover:bg-dawn-orange hover:text-white'
              }`}
            >
              Previous
            </motion.button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageChange(page)}
                className={`w-12 h-12 rounded-full font-semibold transition-all ${
                  page === currentPage
                    ? 'bg-dawn-orange text-white shadow-lg scale-110'
                    : 'border-2 border-coconut-tan text-earth-brown hover:border-dawn-orange hover:bg-dawn-orange/10'
                }`}
              >
                {page}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`btn-organic px-6 py-2 border-2 transition-all ${
                currentPage === totalPages
                  ? 'border-coconut-tan/50 text-earth-brown/50 cursor-not-allowed'
                  : 'border-coconut-tan text-earth-brown hover:border-dawn-orange hover:bg-dawn-orange hover:text-white'
              }`}
            >
              Next
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
