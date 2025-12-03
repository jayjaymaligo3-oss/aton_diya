import { motion } from 'framer-motion';
import { Heart, Users, Leaf, Award, Target, Eye } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Community First',
      description: 'Supporting local artisans and their families through fair trade practices'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Promoting eco-friendly products and traditional sustainable methods'
    },
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      description: 'Preserving authentic indigenous techniques and high-quality standards'
    },
    {
      icon: Users,
      title: 'Cultural Heritage',
      description: 'Celebrating and preserving the rich traditions of Bulalacao'
    }
  ];

  const stats = [
    { number: '500+', label: 'Local Artisans' },
    { number: '2,000+', label: 'Products Listed' },
    { number: '₱5M+', label: 'Revenue Generated' },
    { number: '98%', label: 'Customer Satisfaction' }
  ];

  return (
    <div className="min-h-screen bg-soft-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop')`,
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
              About Aton Diya
            </h1>
            <p className="text-xl md:text-2xl text-coconut-tan leading-relaxed">
              Empowering local artisans and preserving the rich cultural heritage of Bulalacao, Oriental Mindoro
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-light-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="basket-card p-8"
            >
              <div className="tribal-icon w-16 h-16 mb-6">
                <Target className="w-8 h-8 text-dawn-orange" />
              </div>
              <h2 className="text-3xl font-playfair font-bold text-forest-green mb-4">
                Our Mission
              </h2>
              <p className="text-earth-brown leading-relaxed">
                To create a sustainable digital marketplace that connects indigenous artisans of Bulalacao 
                with customers worldwide, ensuring fair compensation, preserving traditional crafts, and 
                promoting eco-friendly practices that benefit both the community and the environment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="basket-card p-8"
            >
              <div className="tribal-icon w-16 h-16 mb-6">
                <Eye className="w-8 h-8 text-dawn-orange" />
              </div>
              <h2 className="text-3xl font-playfair font-bold text-forest-green mb-4">
                Our Vision
              </h2>
              <p className="text-earth-brown leading-relaxed">
                To become the leading platform for indigenous and local products in the Philippines, 
                recognized for empowering communities, preserving cultural heritage, and setting the 
                standard for ethical e-commerce that celebrates Filipino craftsmanship.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-forest-green mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-earth-brown max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="basket-card p-6 text-center"
              >
                <div className="tribal-icon w-16 h-16 mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-dawn-orange" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-forest-green mb-3">
                  {value.title}
                </h3>
                <p className="text-earth-brown text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-sea-blue to-forest-green text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')`,
          }}
        ></div>
        <div className="absolute inset-0 woven-texture opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-coconut-tan">
              Making a difference in the Bulalacao community
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-dawn-orange mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-coconut-tan">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-soft-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-forest-green mb-6">
                Our Story
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="basket-card p-8 md:p-12"
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-earth-brown leading-relaxed mb-6">
                  Aton Diya E-Palengke Bulalacao was born from a simple yet powerful vision: to create a bridge 
                  between the talented artisans of Bulalacao, Oriental Mindoro, and customers who appreciate 
                  authentic, handcrafted products.
                </p>
                <p className="text-earth-brown leading-relaxed mb-6">
                  Bulalacao is home to skilled craftspeople who have preserved traditional techniques passed down 
                  through generations. From intricate woven textiles to beautifully carved wooden items, each 
                  product tells a story of cultural heritage and dedication to craftsmanship.
                </p>
                <p className="text-earth-brown leading-relaxed mb-6">
                  However, these artisans faced challenges in reaching wider markets. That's where Aton Diya 
                  comes in. Our platform provides them with the tools and visibility needed to showcase their 
                  work to the world, while ensuring they receive fair compensation for their skills and labor.
                </p>
                <p className="text-earth-brown leading-relaxed">
                  Today, we're proud to support over 500 local artisans, helping them build sustainable 
                  livelihoods while preserving the rich cultural heritage of Bulalacao for future generations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-light-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-playfair font-bold text-forest-green mb-6">
              Join Our Community
            </h2>
            <p className="text-lg text-earth-brown mb-8">
              Whether you're an artisan looking to showcase your work or a customer seeking authentic products, 
              we welcome you to be part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register?role=vendor">
                <button className="btn-organic bg-dawn-orange hover:bg-warm-gold text-white px-8 py-4 text-lg font-semibold">
                  Become a Vendor
                </button>
              </a>
              <a href="/products">
                <button className="btn-organic border-2 border-forest-green text-forest-green hover:bg-forest-green hover:text-white px-8 py-4 text-lg font-semibold">
                  Shop Products
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
