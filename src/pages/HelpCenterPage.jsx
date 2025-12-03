import { motion } from 'framer-motion';
import { HelpCircle, ShoppingCart, Package, CreditCard, Truck } from 'lucide-react';

const HelpCenterPage = () => {
  const faqs = [
    {
      icon: ShoppingCart,
      question: 'How do I place an order?',
      answer: 'Browse products, add items to cart, and proceed to checkout. You can pay via various payment methods.',
    },
    {
      icon: Package,
      question: 'How long does delivery take?',
      answer: 'Delivery typically takes 3-7 business days depending on your location within the Philippines.',
    },
    {
      icon: CreditCard,
      question: 'What payment methods do you accept?',
      answer: 'We accept GCash, PayMaya, bank transfers, and cash on delivery for eligible areas.',
    },
    {
      icon: Truck,
      question: 'Can I track my order?',
      answer: 'Yes! Once your order ships, you will receive a tracking number via email and SMS.',
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
          <HelpCircle className="w-16 h-16 text-dawn-orange mx-auto mb-4" />
          <h1 className="text-5xl font-playfair font-bold text-forest-green mb-4">
            Help Center
          </h1>
          <p className="text-xl text-earth-brown max-w-2xl mx-auto">
            Find answers to commonly asked questions
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-dawn-orange/10 flex items-center justify-center">
                    <faq.icon className="w-6 h-6 text-dawn-orange" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-bold text-forest-green mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-earth-brown">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
