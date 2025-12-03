import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is Aton Diya?',
          a: 'Aton Diya is a digital marketplace celebrating indigenous and local products from Bulalacao, Oriental Mindoro. We connect local artisans and vendors with customers who appreciate authentic, handcrafted goods.'
        },
        {
          q: 'How do I create an account?',
          a: 'Click on "Register" in the top menu, choose your account type (Customer or Vendor), and fill out the registration form. You\'ll receive a confirmation email to activate your account.'
        },
        {
          q: 'Is my payment information secure?',
          a: 'Yes, we use industry-standard encryption and secure payment gateways to protect your information. We never store your complete payment details on our servers.'
        }
      ]
    },
    {
      category: 'Orders & Shipping',
      questions: [
        {
          q: 'How can I track my order?',
          a: 'After placing an order, you\'ll receive a tracking number via email. You can also track your order by logging into your account and visiting the "Track Order" page.'
        },
        {
          q: 'What are the shipping options?',
          a: 'We offer standard shipping (5-7 business days) and express shipping (2-3 business days) within the Philippines. Shipping costs vary based on location and order weight.'
        },
        {
          q: 'Do you ship internationally?',
          a: 'Currently, we only ship within the Philippines. We\'re working on expanding our shipping options in the future.'
        }
      ]
    },
    {
      category: 'Vendors',
      questions: [
        {
          q: 'How do I become a vendor?',
          a: 'Click on "Become a Vendor" and fill out the registration form. Our team will review your application within 2-3 business days and contact you with next steps.'
        },
        {
          q: 'What are the fees for selling?',
          a: 'We charge a small commission on each sale to maintain the platform. There are no upfront fees or monthly charges. Contact us for detailed pricing information.'
        },
        {
          q: 'How do I get paid?',
          a: 'Payments are processed weekly to your registered bank account or e-wallet. You can view your earnings and payment history in your vendor dashboard.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'Items can be returned within 7 days of delivery if unused and in original packaging. Perishable goods and custom items are non-returnable. See our Returns page for full details.'
        },
        {
          q: 'How long do refunds take?',
          a: 'Once your return is approved, refunds are processed within 5-7 business days to your original payment method.'
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

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
            <h1 className="font-playfair text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-coconut-tan max-w-2xl mx-auto">
              Find answers to common questions about Aton Diya
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-forest-green mb-6">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === index;
                  
                  return (
                    <motion.div
                      key={questionIndex}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: questionIndex * 0.05 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-coconut-tan/5 transition-colors"
                      >
                        <span className="font-semibold text-forest-green pr-4">{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-dawn-orange flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-dawn-orange flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-4"
                        >
                          <p className="text-earth-brown">{faq.a}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-coconut-tan/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold text-forest-green mb-4">
            Still Have Questions?
          </h2>
          <p className="text-earth-brown mb-8">
            Can't find what you're looking for? Contact our support team.
          </p>
          <a
            href="/contact"
            className="inline-block bg-dawn-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-dawn-orange/90 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQsPage;
