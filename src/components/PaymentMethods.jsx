import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, CreditCard, Smartphone, Building2, 
  Check, AlertCircle, QrCode, Copy, CheckCircle 
} from 'lucide-react';

const PaymentMethods = ({ selectedMethod, onMethodChange, amount }) => {
  const [gcashNumber, setGcashNumber] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [copied, setCopied] = useState(false);

  const merchantGcashNumber = '09123456789';
  const merchantPayMayaNumber = '09987654321';

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: Wallet,
      description: 'Pay when you receive your order',
      color: 'green',
      available: true
    },
    {
      id: 'gcash',
      name: 'GCash',
      icon: Smartphone,
      description: 'Pay via GCash mobile wallet',
      color: 'blue',
      available: true
    },
    {
      id: 'paymaya',
      name: 'PayMaya',
      icon: CreditCard,
      description: 'Pay via PayMaya digital wallet',
      color: 'purple',
      available: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay with Visa, Mastercard, or JCB',
      color: 'orange',
      available: true
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Direct bank transfer',
      color: 'indigo',
      available: true
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-forest-green mb-4">Select Payment Method</h3>
      
      {/* Payment Method Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onMethodChange(method.id)}
            disabled={!method.available}
            className={`relative p-4 rounded-xl border-2 transition-all text-left ${
              selectedMethod === method.id
                ? `border-${method.color}-500 bg-${method.color}-50`
                : 'border-gray-200 bg-white hover:border-gray-300'
            } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                selectedMethod === method.id
                  ? `bg-${method.color}-500`
                  : 'bg-gray-100'
              }`}>
                <method.icon className={`w-6 h-6 ${
                  selectedMethod === method.id ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-800">{method.name}</h4>
                  {selectedMethod === method.id && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{method.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Payment Details Forms */}
      <AnimatePresence mode="wait">
        {/* GCash Payment */}
        {selectedMethod === 'gcash' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900">GCash Payment</h4>
                <p className="text-sm text-blue-700">Send payment to our GCash number</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-gray-600 mb-2">Send ₱{amount.toFixed(2)} to:</p>
              <div className="flex items-center justify-between bg-blue-100 p-3 rounded-lg">
                <div>
                  <p className="text-xs text-blue-600">GCash Number</p>
                  <p className="text-xl font-bold text-blue-900">{merchantGcashNumber}</p>
                  <p className="text-sm text-blue-700 mt-1">Aton Diya E-Palengke</p>
                </div>
                <button
                  onClick={() => copyToClipboard(merchantGcashNumber)}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your GCash Number
                </label>
                <input
                  type="tel"
                  value={gcashNumber}
                  onChange={(e) => setGcashNumber(e.target.value)}
                  placeholder="09XX XXX XXXX"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reference Number
                </label>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="Enter GCash reference number"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 bg-blue-100 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Please send the exact amount and enter the reference number after payment. 
                Your order will be processed once payment is verified.
              </p>
            </div>
          </motion.div>
        )}

        {/* PayMaya Payment */}
        {selectedMethod === 'paymaya' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-purple-900">PayMaya Payment</h4>
                <p className="text-sm text-purple-700">Send payment to our PayMaya account</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600 mb-2">Send ₱{amount.toFixed(2)} to:</p>
              <div className="flex items-center justify-between bg-purple-100 p-3 rounded-lg">
                <div>
                  <p className="text-xs text-purple-600">PayMaya Number</p>
                  <p className="text-xl font-bold text-purple-900">{merchantPayMayaNumber}</p>
                  <p className="text-sm text-purple-700 mt-1">Aton Diya E-Palengke</p>
                </div>
                <button
                  onClick={() => copyToClipboard(merchantPayMayaNumber)}
                  className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reference Number
              </label>
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Enter PayMaya reference number"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
          </motion.div>
        )}

        {/* Credit/Debit Card */}
        {selectedMethod === 'card' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-orange-900">Card Payment</h4>
                <p className="text-sm text-orange-700">Enter your card details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({...cardDetails, number: formatCardNumber(e.target.value)})}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({...cardDetails, name: e.target.value.toUpperCase()})}
                  placeholder="JUAN DELA CRUZ"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({...cardDetails, expiry: formatExpiry(e.target.value)})}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '')})}
                    placeholder="123"
                    maxLength="4"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-orange-100 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-orange-800">
                Your card information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </motion.div>
        )}

        {/* Bank Transfer */}
        {selectedMethod === 'bank' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6 space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-indigo-900">Bank Transfer</h4>
                <p className="text-sm text-indigo-700">Transfer to our bank account</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-indigo-200 space-y-3">
              <div>
                <p className="text-xs text-gray-600">Bank Name</p>
                <p className="font-bold text-gray-800">BDO Unibank</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Account Name</p>
                <p className="font-bold text-gray-800">Aton Diya E-Palengke</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Account Number</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-indigo-900">1234-5678-9012</p>
                  <button
                    onClick={() => copyToClipboard('123456789012')}
                    className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600">Amount to Transfer</p>
                <p className="text-2xl font-bold text-indigo-900">₱{amount.toFixed(2)}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reference Number
              </label>
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Enter bank reference number"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </motion.div>
        )}

        {/* Cash on Delivery */}
        {selectedMethod === 'cod' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-green-50 border-2 border-green-200 rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-green-900">Cash on Delivery</h4>
                <p className="text-sm text-green-700">Pay ₱{amount.toFixed(2)} when you receive your order</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-2 bg-green-100 p-3 rounded-lg">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">
                Please prepare the exact amount. Our delivery rider will collect payment upon delivery.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentMethods;
