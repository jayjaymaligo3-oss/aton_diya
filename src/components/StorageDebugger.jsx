import { useState, useEffect } from 'react';
import { RefreshCw, Database, Trash2 } from 'lucide-react';

/**
 * Storage Debugger - Shows localStorage status
 * Only visible in development
 */
const StorageDebugger = () => {
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  const loadData = () => {
    const users = JSON.parse(localStorage.getItem('global_users') || '[]');
    const vendors = JSON.parse(localStorage.getItem('global_vendors') || '[]');
    const orders = JSON.parse(localStorage.getItem('global_orders') || '[]');
    const products = JSON.parse(localStorage.getItem('global_products') || '[]');
    const initialized = localStorage.getItem('transactions_initialized');

    setData({
      initialized,
      users: users.length,
      vendors: vendors.length,
      orders: orders.length,
      products: products.length
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReinitialize = () => {
    if (confirm('Reinitialize all data? This will reset everything.')) {
      localStorage.removeItem('transactions_initialized');
      window.location.reload();
    }
  };

  const handleClear = () => {
    if (confirm('Clear all localStorage data?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  if (!data) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
          title="Storage Debugger"
        >
          <Database className="w-5 h-5" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl p-4 w-80 border-2 border-gray-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Storage Debug
            </h3>
            <button
              onClick={() => setShow(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Initialized:</span>
              <span className={`font-bold ${data.initialized ? 'text-green-600' : 'text-red-600'}`}>
                {data.initialized ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Users:</span>
              <span className="font-bold text-blue-600">{data.users}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Vendors:</span>
              <span className="font-bold text-green-600">{data.vendors}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Orders:</span>
              <span className="font-bold text-orange-600">{data.orders}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Products:</span>
              <span className="font-bold text-purple-600">{data.products}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={loadData}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={handleReinitialize}
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600"
            >
              <Database className="w-4 h-4" />
              Reinit
            </button>
            <button
              onClick={handleClear}
              className="flex items-center justify-center gap-2 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageDebugger;
