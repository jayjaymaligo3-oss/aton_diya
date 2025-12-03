import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store, User, Mail, Phone, MapPin, FileText, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const VendorRegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    description: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    
    try {
      // Register vendor with pending status
      const vendorData = {
        name: formData.ownerName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        role: 'vendor',
        businessName: formData.businessName,
        businessDescription: formData.description,
        category: formData.category,
        status: 'pending', // Requires admin approval
      };
      
      await register(vendorData);
      
      // Store vendor application in localStorage for demo
      const applications = JSON.parse(localStorage.getItem('vendorApplications') || '[]');
      applications.push({
        id: Date.now(),
        ...vendorData,
        appliedAt: new Date().toISOString(),
        status: 'pending'
      });
      localStorage.setItem('vendorApplications', JSON.stringify(applications));
      
      setSuccess(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-soft-white pt-24 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-playfair font-bold text-forest-green mb-4">
            Application Submitted!
          </h2>
          <p className="text-earth-brown mb-4">
            Thank you for your interest in becoming a vendor. Your application is now pending admin approval.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            We will review your application and contact you via email within 2-3 business days.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-left">
            <p className="font-semibold text-blue-900 mb-2">What happens next?</p>
            <ul className="space-y-1 text-blue-800">
              <li>✓ Admin reviews your application</li>
              <li>✓ You receive approval notification</li>
              <li>✓ Login and start selling!</li>
            </ul>
          </div>
          <p className="text-xs text-gray-500 mt-4">Redirecting to login page...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <Store className="w-16 h-16 text-dawn-orange mx-auto mb-4" />
            <h1 className="text-4xl font-playfair font-bold text-forest-green mb-2">
              Become a Vendor
            </h1>
            <p className="text-earth-brown">
              Join our marketplace and showcase your indigenous products
            </p>
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
              <strong>Note:</strong> Your application will be reviewed by our admin team before approval.
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-earth-brown font-semibold mb-2">
                <Store className="w-4 h-4 inline mr-2" />
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                placeholder="Your business name"
              />
            </div>

            <div>
              <label className="block text-earth-brown font-semibold mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Owner Name
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-earth-brown font-semibold mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-earth-brown font-semibold mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="8"
                  className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                  placeholder="Min. 8 characters"
                />
              </div>

              <div>
                <label className="block text-earth-brown font-semibold mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength="8"
                  className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div>
              <label className="block text-earth-brown font-semibold mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                placeholder="+63 XXX XXX XXXX"
              />
            </div>

            <div>
              <label className="block text-earth-brown font-semibold mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                placeholder="Your business address"
              />
            </div>

            <div>
              <label className="block text-earth-brown font-semibold mb-2">
                Product Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
              >
                <option value="">Select a category</option>
                <option value="handicrafts">Handicrafts</option>
                <option value="food">Food Products</option>
                <option value="textiles">Textiles</option>
                <option value="home-decor">Home Decor</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-earth-brown font-semibold mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Business Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                placeholder="Tell us about your products and business..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-dawn-orange text-white py-4 rounded-lg font-semibold text-lg hover:bg-dawn-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </motion.button>
            
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-dawn-orange hover:underline font-semibold"
              >
                Login here
              </button>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorRegisterPage;
