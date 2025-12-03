import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className={`${sizes[size]} relative`}
      >
        {/* Outer Circle */}
        <div className="absolute inset-0 rounded-full border-4 border-coconut-tan opacity-20"></div>
        
        {/* Spinning Arc */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-dawn-orange border-r-dawn-orange"></div>
        
        {/* Inner Pattern */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-2 border-transparent border-b-forest-green border-l-forest-green"
        ></motion.div>
      </motion.div>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-earth-brown font-poppins"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
