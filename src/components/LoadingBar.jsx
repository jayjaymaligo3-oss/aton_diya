import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.1,
  easing: 'ease',
  speed: 500
});

const LoadingBar = () => {
  const location = useLocation();

  useEffect(() => {
    // Start loading bar on route change
    NProgress.start();
    
    // Complete loading bar after a short delay
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location]);

  return null; // This component doesn't render anything
};

export default LoadingBar;
