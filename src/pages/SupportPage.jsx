import { motion } from 'framer-motion';
import { Headphones, Mail, Phone, MessageCircle } from 'lucide-react';

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-soft-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Headphones className="w-16 h-16 text-dawn-orange mx-auto mb-4" />
          <h1 className="text-5xl font-playfair font-bold text-forest-green mb-4">
            Support Center
          </h1>
          <p className="text-xl text-earth-brown max-w-2xl mx-auto">
            We're here to help! Contact us through any of these channels
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <Mail className="w-12 h-12 text-dawn-orange mx-auto mb-4" />
            <h3 className="text-2xl font-playfair font-bold text-forest-green mb-2">Email Us</h3>
            <p className="text-earth-brown mb-4">Get a response within 24 hours</p>
            <a
              href="mailto:support@atondiya.ph"
              className="text-dawn-orange hover:underline font-semibold"
            >
              support@atondiya.ph
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <Phone className="w-12 h-12 text-dawn-orange mx-auto mb-4" />
            <h3 className="text-2xl font-playfair font-bold text-forest-green mb-2">Call Us</h3>
            <p className="text-earth-brown mb-4">Mon-Fri, 9AM-5PM</p>
            <a
              href="tel:+63XXXXXXXXX"
              className="text-dawn-orange hover:underline font-semibold"
            >
              +63 XXX XXX XXXX
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center md:col-span-2"
          >
            <MessageCircle className="w-12 h-12 text-dawn-orange mx-auto mb-4" />
            <h3 className="text-2xl font-playfair font-bold text-forest-green mb-2">
              Live Chat
            </h3>
            <p className="text-earth-brown mb-4">Chat with our support team in real-time</p>
            <button className="bg-dawn-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-dawn-orange/90 transition-colors">
              Start Chat
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
