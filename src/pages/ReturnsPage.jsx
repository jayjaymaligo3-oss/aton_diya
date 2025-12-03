import { motion } from 'framer-motion';
import { Package, RefreshCw, Clock, CheckCircle } from 'lucide-react';

const ReturnsPage = () => {
  const returnSteps = [
    {
      icon: Package,
      title: 'Check Eligibility',
      description: 'Items must be unused and in original packaging within 7 days of delivery.'
    },
    {
      icon: RefreshCw,
      title: 'Request Return',
      description: 'Go to your order history and click "Request Return" on eligible items.'
    },
    {
      icon: Clock,
      title: 'Wait for Approval',
      description: 'Our team will review your request within 24-48 hours.'
    },
    {
      icon: CheckCircle,
      title: 'Get Refund',
      description: 'Once approved, refund will be processed within 5-7 business days.'
    }
  ];

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark-forest to-forest-green text-soft-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-playfair text-5xl font-bold mb-4">Returns & Refunds</h1>
            <p className="text-xl text-coconut-tan max-w-2xl mx-auto">
              We want you to be completely satisfied with your purchase
            </p>
          </motion.div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl font-bold text-forest-green text-center mb-12">
            How to Return an Item
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {returnSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-dawn-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-dawn-orange" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-earth-brown">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Return Policy */}
      <section className="py-16 bg-coconut-tan/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-playfair text-3xl font-bold text-forest-green mb-8">Return Policy</h2>
          <div className="space-y-6 text-earth-brown">
            <div>
              <h3 className="font-semibold text-lg mb-2">Eligible Items</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Items must be unused and in original condition</li>
                <li>Original packaging must be intact</li>
                <li>Return request within 7 days of delivery</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Non-Returnable Items</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Perishable goods (food items)</li>
                <li>Custom or personalized products</li>
                <li>Items marked as final sale</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Refund Process</h3>
              <p>Refunds will be issued to the original payment method within 5-7 business days after approval.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReturnsPage;
