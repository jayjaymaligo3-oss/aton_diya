import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Trash2, Image as ImageIcon, CheckCircle, XCircle, Loader } from 'lucide-react';
import { useImageCache } from '../hooks/useImageCache';

const ImageCacheManager = ({ products = [] }) => {
  const [showManager, setShowManager] = useState(false);
  const { caching, cacheStats, progress, cacheProducts, clearCache, updateStats } = useImageCache(products);

  const handleCacheAll = async () => {
    await cacheProducts(products);
  };

  const handleClearCache = () => {
    if (confirm('Clear all cached images? They will be re-downloaded when needed.')) {
      clearCache();
    }
  };

  const cachedCount = cacheStats?.count || 0;
  const totalProducts = products.length;
  const cachePercentage = totalProducts > 0 ? Math.round((cachedCount / totalProducts) * 100) : 0;

  return (
    <>
      {/* Floating Cache Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowManager(!showManager)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-forest-green to-sea-blue text-white rounded-full shadow-2xl flex items-center justify-center"
        title="Image Cache Manager"
      >
        {caching ? (
          <Loader className="w-6 h-6 animate-spin" />
        ) : (
          <ImageIcon className="w-6 h-6" />
        )}
        {cachedCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-dawn-orange text-white text-xs font-bold rounded-full flex items-center justify-center">
            {cachedCount}
          </span>
        )}
      </motion.button>

      {/* Cache Manager Panel */}
      <AnimatePresence>
        {showManager && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowManager(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-24 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-forest-green to-sea-blue text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-6 h-6" />
                    <div>
                      <h3 className="font-bold text-lg">Image Cache</h3>
                      <p className="text-xs text-coconut-tan">Offline image storage</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowManager(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="p-4 space-y-4">
                {/* Cache Status */}
                <div className="bg-soft-white rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Cached Images</span>
                    <span className="text-2xl font-bold text-forest-green">
                      {cachedCount}/{totalProducts}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cachePercentage}%` }}
                      className="h-full bg-gradient-to-r from-forest-green to-dawn-orange"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{cachePercentage}% cached</p>
                </div>

                {/* Storage Info */}
                {cacheStats && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Download className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-900">Storage Used</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                      {cacheStats.totalSizeMB} MB
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      {cacheStats.count} images cached
                    </p>
                  </div>
                )}

                {/* Caching Progress */}
                {caching && (
                  <div className="bg-orange-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Loader className="w-4 h-4 text-orange-600 animate-spin" />
                      <span className="text-sm font-semibold text-orange-900">Caching...</span>
                    </div>
                    <p className="text-sm text-orange-700">
                      {progress.current} of {progress.total} images
                    </p>
                    <div className="w-full h-1 bg-orange-200 rounded-full overflow-hidden mt-2">
                      <motion.div
                        animate={{ 
                          width: progress.total > 0 
                            ? `${(progress.current / progress.total) * 100}%` 
                            : '0%' 
                        }}
                        className="h-full bg-orange-500"
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={handleCacheAll}
                    disabled={caching || cachedCount === totalProducts}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-forest-green text-white rounded-lg font-semibold hover:bg-forest-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    {caching ? 'Caching...' : cachedCount === totalProducts ? 'All Cached' : 'Cache All Images'}
                  </button>

                  <button
                    onClick={handleClearCache}
                    disabled={caching || cachedCount === 0}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                    Clear Cache
                  </button>
                </div>

                {/* Info */}
                <div className="bg-green-50 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-green-800">
                      Cached images work offline and load faster. Cache expires after 7 days.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageCacheManager;
