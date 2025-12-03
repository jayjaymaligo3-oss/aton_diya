import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TestAuthPage = () => {
  const { user, loading, login, register, logout } = useAuth();
  const navigate = useNavigate();

  const handleTestRegister = async () => {
    try {
      const result = await register({
        name: 'Test Customer',
        email: 'test@customer.com',
        phone: '09123456789',
        address: 'Bulalacao',
        password: 'password123',
        role: 'customer'
      });
      console.log('Register result:', result);
      alert('Registration successful! Check console.');
    } catch (error) {
      console.error('Register error:', error);
      alert('Registration error: ' + error.message);
    }
  };

  const handleTestLogin = async () => {
    try {
      const result = await login({
        email: 'test@customer.com',
        password: 'password123'
      });
      console.log('Login result:', result);
      alert('Login successful! Check console.');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error: ' + error.message);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/customer/dashboard');
  };

  const handleLogout = async () => {
    await logout();
    alert('Logged out!');
  };

  return (
    <div className="min-h-screen bg-soft-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-playfair font-bold text-forest-green mb-8">
          Authentication Test Page
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="bg-blue-100 border-2 border-blue-500 p-4 rounded-lg mb-4">
            <p className="text-blue-700 font-semibold">Loading authentication...</p>
          </div>
        )}

        {/* User Info */}
        <div className="basket-card p-6 mb-6">
          <h2 className="text-xl font-semibold text-forest-green mb-4">Current User</h2>
          {user ? (
            <div className="space-y-2">
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
              <p><strong>Address:</strong> {user.address || 'N/A'}</p>
            </div>
          ) : (
            <p className="text-earth-brown">No user logged in</p>
          )}
        </div>

        {/* LocalStorage Info */}
        <div className="basket-card p-6 mb-6">
          <h2 className="text-xl font-semibold text-forest-green mb-4">LocalStorage Data</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Token:</strong> {localStorage.getItem('token') || 'None'}</p>
            <p><strong>Demo User:</strong></p>
            <pre className="bg-gray-100 p-2 rounded overflow-auto">
              {localStorage.getItem('demoUser') || 'None'}
            </pre>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleTestRegister}
            className="w-full btn-organic bg-green-600 text-white py-3 font-semibold"
          >
            Test Register (Demo Mode)
          </button>

          <button
            onClick={handleTestLogin}
            className="w-full btn-organic bg-blue-600 text-white py-3 font-semibold"
          >
            Test Login (Demo Mode)
          </button>

          <button
            onClick={handleGoToDashboard}
            disabled={!user}
            className="w-full btn-organic bg-dawn-orange text-white py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Go to Customer Dashboard
          </button>

          <button
            onClick={handleLogout}
            disabled={!user}
            className="w-full btn-organic bg-red-600 text-white py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Logout
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="w-full btn-organic border-2 border-red-500 text-red-600 py-3 font-semibold"
          >
            Clear All Data & Reload
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-500 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700">
            <li>Click "Test Register" to create a demo user</li>
            <li>Check the "Current User" section above</li>
            <li>Click "Go to Customer Dashboard"</li>
            <li>If error, check browser console (F12)</li>
            <li>Use "Clear All Data" to reset</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestAuthPage;
