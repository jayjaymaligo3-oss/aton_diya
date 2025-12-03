import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Start loading bar
    const loadingBar = document.getElementById('loading-bar');
    if (loadingBar) {
      loadingBar.style.width = '0%';
      loadingBar.classList.remove('hidden');
      loadingBar.style.width = '30%';
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (loadingBar) loadingBar.style.width = '70%';
      
      // In demo mode, just show success
      setIsSubmitted(true);
      
      if (loadingBar) loadingBar.style.width = '100%';
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
      
      // Complete loading bar
      if (loadingBar) {
        setTimeout(() => {
          loadingBar.classList.add('hidden');
          loadingBar.style.width = '0%';
        }, 300);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-white via-coconut-tan/20 to-warm-gold/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="basket-card p-8">
          {/* Back to Login */}
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-earth-brown hover:text-dawn-orange transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Login</span>
          </Link>

          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-dawn-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-dawn-orange" />
                </div>
                <h1 className="text-3xl font-playfair font-bold text-forest-green mb-2">
                  Forgot Password?
                </h1>
                <p className="text-earth-brown">
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-forest-green mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-brown/50" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-coconut-tan rounded-lg focus:outline-none focus:ring-2 focus:ring-dawn-orange/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-organic bg-dawn-orange text-white py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-playfair font-bold text-forest-green mb-2">
                  Check Your Email
                </h2>
                <p className="text-earth-brown mb-6">
                  We've sent password reset instructions to:
                </p>
                <p className="text-dawn-orange font-semibold mb-8">
                  {email}
                </p>
                <p className="text-sm text-earth-brown/70 mb-6">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full btn-organic border-2 border-dawn-orange text-dawn-orange py-3 font-semibold"
                  >
                    Try Another Email
                  </button>
                  <Link
                    to="/login"
                    className="block w-full text-center text-earth-brown hover:text-dawn-orange transition-colors py-2"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* Additional Help */}
          {!isSubmitted && (
            <div className="mt-6 text-center">
              <p className="text-sm text-earth-brown">
                Need help?{' '}
                <Link to="/support" className="text-dawn-orange hover:text-warm-gold font-medium">
                  Contact Support
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-coconut-tan"
        >
          <p className="text-sm text-earth-brown text-center">
            🔒 Your security is our priority. Reset links expire after 1 hour.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
