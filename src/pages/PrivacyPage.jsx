import { motion } from 'framer-motion';

const PrivacyPage = () => {
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
            <h1 className="font-playfair text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-coconut-tan">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-earth-brown">
              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Introduction</h2>
                <p>
                  Aton Diya E-Palengke Bulalacao ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                  you visit our website and use our services.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Information We Collect</h2>
                <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                <p className="mb-4">We may collect personal information that you provide to us, including:</p>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>Name and contact information (email, phone number, address)</li>
                  <li>Account credentials (username, password)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Order history and preferences</li>
                </ul>
                
                <h3 className="font-semibold text-lg mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Browser type and version</li>
                  <li>IP address and device information</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your account and orders</li>
                  <li>Improve our website and services</li>
                  <li>Send promotional materials (with your consent)</li>
                  <li>Prevent fraud and enhance security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Information Sharing</h2>
                <p className="mb-4">We may share your information with:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Vendors to fulfill your orders</li>
                  <li>Payment processors for transaction processing</li>
                  <li>Shipping partners for delivery services</li>
                  <li>Service providers who assist in operating our platform</li>
                  <li>Law enforcement when required by law</li>
                </ul>
                <p className="mt-4">We do not sell your personal information to third parties.</p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information. 
                  However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Cookies</h2>
                <p>
                  We use cookies and similar technologies to enhance your experience, analyze usage, and deliver 
                  personalized content. You can control cookies through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Children's Privacy</h2>
                <p>
                  Our services are not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Contact Us</h2>
                <p className="mb-2">If you have questions about this Privacy Policy, please contact us:</p>
                <ul className="space-y-1">
                  <li>Email: info@atondiya.ph</li>
                  <li>Address: Bulalacao, Oriental Mindoro, Philippines</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
