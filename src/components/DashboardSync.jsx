import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, AlertCircle, Database, Cloud } from 'lucide-react';
import { getTransactionsSummary, syncAllDataToDatabase } from '../utils/transactionRecorder';

/**
 * Dashboard Sync Component
 * Shows sync status between localStorage and database
 * Displays transaction summary across all dashboards
 */
const DashboardSync = () => {
  const [summary, setSummary] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, success, error

  useEffect(() => {
    loadSummary();
    const lastSyncTime = localStorage.getItem('lastSyncTime');
    if (lastSyncTime) {
      setLastSync(new Date(lastSyncTime));
    }
  }, []);

  const loadSummary = () => {
    const data = getTransactionsSummary();
    setSummary(data);
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncStatus('syncing');
    
    try {
      const success = await syncAllDataToDatabase();
      if (success) {
        setSyncStatus('success');
        const now = new Date();
        setLastSync(now);
        localStorage.setItem('lastSyncTime', now.toISOString());
        loadSummary();
        
        setTimeout(() => setSyncStatus('idle'), 3000);
      } else {
        setSyncStatus('error');
        setTimeout(() => setSyncStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Sync error:', error);
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } finally {
      setSyncing(false);
    }
  };

  if (!summary) return null;

  return (
    <div className="basket-card p-6 bg-gradient-to-br from-forest-green/5 to-sea-blue/5 border-2 border-forest-green/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-forest-green rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-forest-green">Dashboard Sync Status</h3>
            <p className="text-xs text-earth-brown">
              {lastSync ? `Last synced: ${lastSync.toLocaleString()}` : 'Never synced'}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleSync}
          disabled={syncing}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            syncing 
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
              : 'bg-dawn-orange text-white hover:bg-warm-gold'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      {/* Sync Status Message */}
      {syncStatus !== 'idle' && (
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
          syncStatus === 'success' ? 'bg-green-100 text-green-800' :
          syncStatus === 'error' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {syncStatus === 'success' && <CheckCircle className="w-5 h-5" />}
          {syncStatus === 'error' && <AlertCircle className="w-5 h-5" />}
          {syncStatus === 'syncing' && <Cloud className="w-5 h-5 animate-pulse" />}
          <span className="text-sm font-semibold">
            {syncStatus === 'success' && 'Data synced successfully!'}
            {syncStatus === 'error' && 'Sync failed. Using cached data.'}
            {syncStatus === 'syncing' && 'Syncing data to database...'}
          </span>
        </div>
      )}

      {/* Transaction Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-coconut-tan">
          <p className="text-xs text-earth-brown mb-1">Total Users</p>
          <p className="text-2xl font-bold text-forest-green">{summary.totalUsers}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-coconut-tan">
          <p className="text-xs text-earth-brown mb-1">Total Vendors</p>
          <p className="text-2xl font-bold text-sea-blue">{summary.totalVendors}</p>
          <p className="text-xs text-green-600 mt-1">{summary.activeVendors} active</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-coconut-tan">
          <p className="text-xs text-earth-brown mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-dawn-orange">{summary.totalOrders}</p>
          <p className="text-xs text-blue-600 mt-1">{summary.pendingOrders} pending</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-coconut-tan">
          <p className="text-xs text-earth-brown mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-warm-gold">₱{summary.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Connection Status */}
      <div className="mt-4 pt-4 border-t border-coconut-tan/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-earth-brown">All dashboards connected</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-earth-brown">
            <span>✅ Admin Dashboard</span>
            <span>✅ Vendor Dashboard</span>
            <span>✅ Customer Dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSync;
