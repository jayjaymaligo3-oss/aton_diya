import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Bulalacao, Oriental Mindoro', 'Philippines, 5210'],
      link: 'https://maps.google.com/?q=Bulalacao,Oriental+Mindoro'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+63 XXX XXX XXXX', 'Mon-Sat: 8AM - 6PM'],
      link: 'tel:+63XXXXXXXXX'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@atondiya.ph', 'support@atondiya.ph'],
      link: 'mailto:info@atondiya.ph'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Saturday', '8:00 AM - 6:00 PM'],
      link: null
    }
  ];

  const faqs = [
    {
      icon: HelpCircle,
      question: 'How do I become a vendor?',
      answer: 'Click on "Become a Vendor" and fill out the registration form. Our team will review your application within 2-3 business days.'
    },
    {
      icon: MessageCircle,
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including credit/debit cards, GCash, PayMaya, and bank transfers.'
    },
    {
      icon: HelpCircle,
      question: 'How long does delivery take?',
      answer: 'Delivery within Bulalacao takes 1-2 days. For other areas in Oriental Mindoro, 3-5 days. Metro Manila and nearby provinces: 5-7 days.'
    }
  ];

  return (
    <div className="min-h-screen bg-soft-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-forest-green/90 to-earth-brown/90"></div>
        <div className="absolute inset-0 woven-texture opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-coconut-tan leading-relaxed">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-light-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="basket-card p-6 text-center"
              >
                <div className="tribal-icon w-16 h-16 mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-dawn-orange" />
                </div>
                <h3 className="text-lg font-playfair font-semibold text-forest-green mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-earth-brown text-sm mb-1">
                    {info.link && i === 0 ? (
                      <a href={info.link} className="hover:text-dawn-orange transition-colors">
                        {detail}
                      </a>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="basket-card p-8">
                <h2 className="text-3xl font-playfair font-bold text-forest-green mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-forest-green mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors"
                      placeholder="Juan Dela Cruz"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-forest-green mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-forest-green mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors"
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-forest-green mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows="5"
                      className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-organic bg-dawn-orange hover:bg-warm-gold text-white py-4 font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Map & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map */}
              <div className="basket-card overflow-hidden h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125045.89474831!2d121.28!3d12.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a5b0e5e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sBulalacao%2C%20Oriental%20Mindoro!5e0!3m2!1sen!2sph!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bulalacao Location"
                ></iframe>
              </div>

              {/* Quick FAQs */}
              <div className="basket-card p-6">
                <h3 className="text-2xl font-playfair font-bold text-forest-green mb-4">
                  Quick Answers
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-coconut-tan/30 pb-4 last:border-0">
                      <div className="flex items-start gap-3">
                        <faq.icon className="w-5 h-5 text-dawn-orange flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-forest-green mb-1">
                            {faq.question}
                          </h4>
                          <p className="text-sm text-earth-brown">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="/faqs" className="block mt-4">
                  <button className="w-full btn-organic border-2 border-dawn-orange text-dawn-orange hover:bg-dawn-orange hover:text-white py-2">
                    View All FAQs
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-light-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-playfair font-bold text-forest-green mb-4">
              Follow Us on Social Media
            </h2>
            <p className="text-lg text-earth-brown mb-8">
              Stay updated with our latest products, artisan stories, and community events
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://facebook.com/atondiya" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="btn-organic bg-dawn-orange text-white px-8 py-3 font-semibold"
                >
                  Facebook
                </motion.button>
              </a>
              <a href="https://instagram.com/atondiya" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="btn-organic bg-dawn-orange text-white px-8 py-3 font-semibold"
                >
                  Instagram
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
