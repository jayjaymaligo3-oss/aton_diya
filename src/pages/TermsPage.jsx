import { motion } from 'framer-motion';

const TermsPage = () => {
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
            <h1 className="font-playfair text-5xl font-bold mb-4">Terms of Service</h1>
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
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Agreement to Terms</h2>
                <p>
                  By accessing and using Aton Diya E-Palengke Bulalacao ("the Platform"), you agree to be bound by 
                  these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Use of Services</h2>
                <h3 className="font-semibold text-lg mb-2">Eligibility</h3>
                <p className="mb-4">
                  You must be at least 18 years old to use our services. By using the Platform, you represent and 
                  warrant that you meet this age requirement.
                </p>
                
                <h3 className="font-semibold text-lg mb-2">Account Registration</h3>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>You must notify us immediately of any unauthorized access</li>
                  <li>One person or entity may not maintain multiple accounts</li>
                </ul>

                <h3 className="font-semibold text-lg mb-2">Prohibited Activities</h3>
                <p className="mb-2">You agree not to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Post false, misleading, or fraudulent content</li>
                  <li>Interfere with the Platform's operation</li>
                  <li>Attempt to gain unauthorized access to systems</li>
                  <li>Use automated systems to access the Platform</li>
                </ul>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Vendor Terms</h2>
                <h3 className="font-semibold text-lg mb-2">Vendor Responsibilities</h3>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>Provide accurate product descriptions and pricing</li>
                  <li>Fulfill orders in a timely manner</li>
                  <li>Maintain product quality standards</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Handle customer service inquiries professionally</li>
                </ul>

                <h3 className="font-semibold text-lg mb-2">Commission and Fees</h3>
                <p>
                  Vendors agree to pay the platform commission on each sale as outlined in the vendor agreement. 
                  Commission rates and payment terms will be provided during vendor registration.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Orders and Payments</h2>
                <h3 className="font-semibold text-lg mb-2">Order Processing</h3>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>All orders are subject to acceptance and availability</li>
                  <li>We reserve the right to refuse or cancel any order</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Payment must be received before order processing</li>
                </ul>

                <h3 className="font-semibold text-lg mb-2">Payment Methods</h3>
                <p>
                  We accept various payment methods including GCash, PayMaya, bank transfers, and cash on delivery 
                  (where available). All payments are processed securely through third-party payment providers.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Shipping and Delivery</h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>Risk of loss passes to you upon delivery</li>
                  <li>You must provide accurate delivery information</li>
                  <li>Additional charges may apply for remote locations</li>
                  <li>We are not responsible for delays caused by shipping carriers</li>
                </ul>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Returns and Refunds</h2>
                <p className="mb-4">
                  Our return policy allows returns within 7 days of delivery for eligible items. Please refer to 
                  our Returns page for complete details. Refunds will be processed according to our refund policy.
                </p>
                <p>
                  Certain items are non-returnable, including perishable goods, custom products, and items marked 
                  as final sale.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Intellectual Property</h2>
                <p className="mb-4">
                  All content on the Platform, including text, graphics, logos, images, and software, is the property 
                  of Aton Diya or its content suppliers and is protected by intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, or create derivative works without our express written permission.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Disclaimer of Warranties</h2>
                <p>
                  The Platform is provided "as is" and "as available" without warranties of any kind, either express 
                  or implied. We do not warrant that the Platform will be uninterrupted, secure, or error-free.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Aton Diya shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages arising from your use of the Platform.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Aton Diya, its affiliates, and their respective officers, 
                  directors, employees, and agents from any claims, damages, losses, or expenses arising from your 
                  use of the Platform or violation of these Terms.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the Republic of the 
                  Philippines, without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes 
                  by posting the updated Terms on the Platform. Your continued use of the Platform after changes 
                  constitutes acceptance of the modified Terms.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Termination</h2>
                <p>
                  We may terminate or suspend your account and access to the Platform immediately, without prior notice, 
                  for any reason, including breach of these Terms.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-forest-green mb-4">Contact Information</h2>
                <p className="mb-2">For questions about these Terms of Service, please contact us:</p>
                <ul className="space-y-1">
                  <li>Email: info@atondiya.ph</li>
                  <li>Phone: +63 XXX XXX XXXX</li>
                  <li>Address: Bulalacao, Oriental Mindoro, Philippines</li>
                </ul>
              </div>

              <div className="mt-8 p-6 bg-coconut-tan/10 rounded-lg">
                <p className="text-sm">
                  By using Aton Diya E-Palengke Bulalacao, you acknowledge that you have read, understood, and agree 
                  to be bound by these Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
