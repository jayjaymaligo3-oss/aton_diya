import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, Store, Mail, Lock, Phone, MapPin, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { orientalMindoroData, getBarangaysByMunicipality, getSitiosByBarangay } from '../data/orientalMindoroLocations';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get('role') || 'customer';
  const { register } = useAuth();
  
  const [role, setRole] = useState(roleFromUrl);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    businessName: '',
    businessDescription: '',
    municipality: '',
    barangay: '',
    sitio: ''
  });

  const [availableBarangays, setAvailableBarangays] = useState([]);
  const [availableSitios, setAvailableSitios] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      // Register with backend
      const response = await register({
        ...formData,
        role
      });

      console.log('Registration successful:', response);
      
      // Redirect based on role
      if (response.user.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Handle municipality change
    if (name === 'municipality') {
      const barangays = getBarangaysByMunicipality(value);
      setAvailableBarangays(barangays);
      setAvailableSitios([]);
      setFormData(prev => ({
        ...prev,
        municipality: value,
        barangay: '',
        sitio: ''
      }));
    }

    // Handle barangay change
    if (name === 'barangay') {
      const sitios = getSitiosByBarangay(value);
      setAvailableSitios(sitios);
      setFormData(prev => ({
        ...prev,
        barangay: value,
        sitio: ''
      }));
    }

    // Update full address when location changes
    if (name === 'municipality' || name === 'barangay' || name === 'sitio') {
      setTimeout(() => {
        const municipalityName = orientalMindoroData.municipalities.find(m => m.code === formData.municipality)?.name || '';
        const barangayName = availableBarangays.find(b => b.code === formData.barangay)?.name || '';
        const sitioName = formData.sitio || '';
        
        const addressParts = [sitioName, barangayName, municipalityName, 'Oriental Mindoro'].filter(Boolean);
        setFormData(prev => ({
          ...prev,
          address: addressParts.join(', ')
        }));
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-cream via-soft-white to-coconut-tan/20 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-forest-green mb-4">
              Create Account
            </h1>
            <p className="text-lg text-earth-brown">
              Join Aton Diya E-Palengke Bulalacao
            </p>
          </div>

          {/* Role Selection */}
          <div className="basket-card p-8 mb-6">
            <h3 className="text-xl font-playfair font-bold text-forest-green mb-4 text-center">
              I want to register as:
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setRole('customer')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  role === 'customer'
                    ? 'border-dawn-orange bg-dawn-orange/10'
                    : 'border-coconut-tan hover:border-dawn-orange'
                }`}
              >
                <User className={`w-12 h-12 mx-auto mb-3 ${
                  role === 'customer' ? 'text-dawn-orange' : 'text-earth-brown'
                }`} />
                <h4 className="font-bold text-forest-green mb-1">Customer</h4>
                <p className="text-sm text-earth-brown">Buy products</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setRole('vendor')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  role === 'vendor'
                    ? 'border-dawn-orange bg-dawn-orange/10'
                    : 'border-coconut-tan hover:border-dawn-orange'
                }`}
              >
                <Store className={`w-12 h-12 mx-auto mb-3 ${
                  role === 'vendor' ? 'text-dawn-orange' : 'text-earth-brown'
                }`} />
                <h4 className="font-bold text-forest-green mb-1">Vendor</h4>
                <p className="text-sm text-earth-brown">Sell products</p>
              </motion.button>
            </div>
          </div>

          {/* Registration Form */}
          <div className="basket-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-forest-green mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-brown" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors"
                    placeholder="Juan Dela Cruz"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-forest-green mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-brown" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-forest-green mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-brown" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors"
                    placeholder="+63 XXX XXX XXXX"
                    required
                  />
                </div>
              </div>

              {/* Location Selection */}
              <div className="space-y-4 p-4 bg-soft-white rounded-lg border-2 border-coconut-tan">
                <h3 className="font-semibold text-forest-green flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location Details
                </h3>

                {/* Municipality */}
                <div>
                  <label className="block text-sm font-semibold text-forest-green mb-2">
                    Municipality *
                  </label>
                  <select
                    name="municipality"
                    value={formData.municipality}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select Municipality</option>
                    {orientalMindoroData.municipalities.map((mun) => (
                      <option key={mun.code} value={mun.code}>
                        {mun.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Barangay */}
                <div>
                  <label className="block text-sm font-semibold text-forest-green mb-2">
                    Barangay *
                  </label>
                  <select
                    name="barangay"
                    value={formData.barangay}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors"
                    required
                    disabled={!formData.municipality}
                  >
                    <option value="">Select Barangay</option>
                    {availableBarangays.map((brgy) => (
                      <option key={brgy.code} value={brgy.code}>
                        {brgy.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sitio */}
                {availableSitios.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-forest-green mb-2">
                      Sitio (Optional)
                    </label>
                    <select
                      name="sitio"
                      value={formData.sitio}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors"
                    >
                      <option value="">Select Sitio (Optional)</option>
                      {availableSitios.map((sitio, idx) => (
                        <option key={idx} value={sitio}>
                          {sitio}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Full Address Display */}
                {formData.address && (
                  <div className="mt-2 p-3 bg-white rounded-lg border border-dawn-orange/30">
                    <p className="text-xs font-semibold text-earth-brown mb-1">Complete Address:</p>
                    <p className="text-sm text-forest-green">{formData.address}</p>
                  </div>
                )}
              </div>

              {/* Vendor-specific fields */}
              {role === 'vendor' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-forest-green mb-2">
                      Business Name *
                    </label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-brown" />
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors"
                        placeholder="Your Business Name"
                        required={role === 'vendor'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-forest-green mb-2">
                      Business Description *
                    </label>
                    <textarea
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your products and crafts..."
                      required={role === 'vendor'}
                    ></textarea>
                  </div>
                </>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-forest-green mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-brown" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-brown hover:text-dawn-orange"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-forest-green mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-brown" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-brown hover:text-dawn-orange"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full btn-organic bg-dawn-orange hover:bg-warm-gold text-white py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : `Create ${role === 'vendor' ? 'Vendor' : 'Customer'} Account`}
              </motion.button>

              {/* Login Link */}
              <p className="text-center text-earth-brown">
                Already have an account?{' '}
                <a href="/login" className="text-dawn-orange font-semibold hover:underline">
                  Login here
                </a>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
