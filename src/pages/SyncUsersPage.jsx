import { useState } from 'react';
import { syncUsersToDatabase, checkBackendStatus } from '../utils/syncUsersToDatabase';
import { Database, RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const SyncUsersPage = () => {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState(null);
  const [backendStatus, setBackendStatus] = useState(null);

  const handleCheckBackend = async () => {
    const isAvailable = await checkBackendStatus();
    setBackendStatus(isAvailable);
  };

  const handleSync = async () => {
    setSyncing(true);
    setResult(null);
    
    try {
      const syncResult = await syncUsersToDatabase();
      setResult(syncResult);
    } catch (error) {
      setResult({
        success: false,
        error: error.message
      });
    } finally {
      setSyncing(false);
    }
  };

  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

  return (
    <div className="min-h-screen bg-soft-white flex items-center justify-center p-4">
      <div className="basket-card p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <Database className="w-16 h-16 text-dawn-orange mx-auto mb-4" />
          <h1 className="text-3xl font-playfair font-bold text-forest-green mb-2">
            Sync Users to Database
          </h1>
          <p className="text-earth-brown">
            Sync localStorage users to MySQL database
          </p>
        </div>

        {/* Backend Status */}
        <div className="mb-6 p-4 bg-soft-white rounded-lg border-2 border-coconut-tan">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-forest-green">Backend Status</h3>
            <button
              onClick={handleCheckBackend}
              className="text-sm text-dawn-orange hover:underline"
            >
              Check
            </button>
          </div>
          {backendStatus === null && (
            <p className="text-sm text-earth-brown">Click "Check" to test backend connection</p>
          )}
          {backendStatus === true && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Backend is available</span>
            </div>
          )}
          {backendStatus === false && (
            <div className="flex items-center gap-2 text-red-600">
              <XCircle className="w-5 h-5" />
              <span className="font-semibold">Backend is not available</span>
              <p className="text-sm text-earth-brown ml-2">
                Make sure Laravel is running: <code>php artisan serve</code>
              </p>
            </div>
          )}
        </div>

        {/* Users to Sync */}
        <div className="mb-6 p-4 bg-soft-white rounded-lg border-2 border-coconut-tan">
          <h3 className="font-semibold text-forest-green mb-2">
            Users in LocalStorage: {registeredUsers.length}
          </h3>
          {registeredUsers.length === 0 ? (
            <p className="text-sm text-earth-brown">No users to sync</p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {registeredUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between text-sm p-2 bg-white rounded">
                  <span className="text-earth-brown">{user.email}</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    user.role === 'vendor' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sync Button */}
        <button
          onClick={handleSync}
          disabled={syncing || registeredUsers.length === 0}
          className="w-full btn-organic bg-dawn-orange text-white py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Sync to Database'}
        </button>

        {/* Result */}
        {result && (
          <div className={`p-4 rounded-lg border-2 ${
            result.success 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <h3 className={`font-semibold ${
                result.success ? 'text-green-700' : 'text-red-700'
              }`}>
                {result.success ? 'Sync Successful!' : 'Sync Failed'}
              </h3>
            </div>
            
            {result.synced !== undefined && (
              <div className="text-sm space-y-1">
                <p className="text-green-700">✅ Synced: {result.synced}</p>
                {result.failed > 0 && (
                  <p className="text-red-700">❌ Failed: {result.failed}</p>
                )}
              </div>
            )}

            {result.results && result.results.length > 0 && (
              <div className="mt-3 space-y-1 max-h-32 overflow-y-auto">
                {result.results.map((r, i) => (
                  <div key={i} className="text-xs flex items-center justify-between p-2 bg-white rounded">
                    <span>{r.email}</span>
                    <span className={`px-2 py-1 rounded font-semibold ${
                      r.status === 'synced' ? 'bg-green-100 text-green-700' :
                      r.status === 'already_exists' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {result.error && (
              <p className="text-sm text-red-700 mt-2">{result.error}</p>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">📝 Instructions</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Make sure Laravel backend is running</li>
            <li>Check backend status first</li>
            <li>Click "Sync to Database" to sync all users</li>
            <li>Users will be registered in MySQL database</li>
          </ol>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a href="/" className="text-dawn-orange hover:underline">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default SyncUsersPage;
