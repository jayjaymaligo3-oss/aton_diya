import { motion } from 'framer-motion';
import { BookOpen, Package, TrendingUp, Users, CheckCircle } from 'lucide-react';

const VendorGuidePage = () => {
  const steps = [
    {
      icon: Users,
      title: 'Register Your Business',
      description: 'Complete the vendor registration form with your business details and product information.',
    },
    {
      icon: CheckCircle,
      title: 'Verification Process',
      description: 'Our team will review your application and verify your business credentials.',
    },
    {
      icon: Package,
      title: 'List Your Products',
      description: 'Add your products with photos, descriptions, and pricing through the vendor dashboard.',
    },
    {
      icon: TrendingUp,
      title: 'Start Selling',
      description: 'Once approved, your products will be visible to customers and you can start receiving orders.',
    },
  ];

  return (
    <div className="min-h-screen bg-soft-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <BookOpen className="w-16 h-16 text-dawn-orange mx-auto mb-4" />
          <h1 className="text-5xl font-playfair font-bold text-forest-green mb-4">
            Seller Guide
          </h1>
          <p className="text-xl text-earth-brown max-w-2xl mx-auto">
            Everything you need to know about selling on Aton Diya
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-dawn-orange/10 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-dawn-orange" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-playfair font-bold text-forest-green mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-earth-brown">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-forest-green to-sea-blue text-white rounded-xl p-8 text-center"
          >
            <h2 className="text-3xl font-playfair font-bold mb-4">Ready to Start?</h2>
            <p className="mb-6">Join our community of local artisans and vendors today!</p>
            <a
              href="/vendor/register"
              className="inline-block bg-dawn-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-dawn-orange/90 transition-colors"
            >
              Become a Vendor
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VendorGuidePage;
