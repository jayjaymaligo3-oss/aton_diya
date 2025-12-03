import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './utils/clearStorage'; // Load storage utilities
import { initializeAllTransactions } from './utils/initializeTransactions';
import './utils/initializeNacbaAccount'; // Initialize NACBA test account
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
// import { DataSyncProvider } from './context/DataSyncContext'; // Temporarily disabled
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import CartDebugger from './components/CartDebugger';
import InstallPrompt from './components/InstallPrompt';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import VendorProfilePage from './pages/VendorProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ArtisansPage from './pages/ArtisansPage';
import ContactPage from './pages/ContactPage';
import VendorDashboard from './pages/VendorDashboard';
import VendorRegisterPage from './pages/VendorRegisterPage';
import VendorGuidePage from './pages/VendorGuidePage';
import AuditTrailPage from './pages/AuditTrailPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SupportPage from './pages/SupportPage';
import HelpCenterPage from './pages/HelpCenterPage';
import TrackOrderPage from './pages/TrackOrderPage';
import ReturnsPage from './pages/ReturnsPage';
import FAQsPage from './pages/FAQsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import TestAuthPage from './pages/TestAuthPage';
import DebugPage from './pages/DebugPage';
import ClearStoragePage from './pages/ClearStoragePage';
import SyncUsersPage from './pages/SyncUsersPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import SalesCalendarPage from './pages/SalesCalendarPage';
import SalesBanner from './components/SalesBanner';
import LoadingBar from './components/LoadingBar';
import ScrollToTop from './components/ScrollToTop';
import SecurityWrapper from './components/SecurityWrapper';
import InactivityLogout from './components/InactivityLogout';
import './styles/global.css';
import './styles/nprogress-custom.css';
import './utils/storageDebug';
import { initializeSampleData } from './utils/initializeSampleData';

// Initialize sample data on first load
if (typeof window !== 'undefined') {
  initializeSampleData();
}

function AppContent() {
  const location = useLocation();
  
  // Hide navbar and footer on dashboard pages
  const isDashboardPage = location.pathname.includes('/dashboard');
  const isAdminDashboard = location.pathname.includes('/admin/dashboard');
  const isVendorDashboard = location.pathname.includes('/vendor/dashboard');
  const isCustomerDashboard = location.pathname.includes('/customer/dashboard');
  
  return (
    <SecurityWrapper>
      <InactivityLogout timeout={30 * 60 * 1000} warningTime={2 * 60 * 1000} />
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <LoadingBar />
        <InstallPrompt />
        {!isDashboardPage && <SalesBanner />}
        {!isDashboardPage && <Navbar />}
        <main className="flex-grow">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/:productSlug" element={<ProductDetailsPage />} />
          <Route path="/vendor/:vendorSlug" element={<VendorProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/artisans" element={<ArtisansPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Vendor Routes */}
          <Route path="/vendor/register" element={<VendorRegisterPage />} />
          <Route path="/vendor/dashboard" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/vendor/guide" element={<VendorGuidePage />} />
          <Route path="/vendor/audit-trail" element={
            <ProtectedRoute allowedRoles={['vendor', 'admin']}>
              <AuditTrailPage />
            </ProtectedRoute>
          } />
          
          {/* Customer Routes */}
          <Route path="/customer/dashboard" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboard />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* Support & Help */}
          <Route path="/support" element={<SupportPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/track" element={<TrackOrderPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          
          {/* Legal Pages */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          
          {/* Cart & Wishlist Pages */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Sales Calendar */}
          <Route path="/sales" element={<SalesCalendarPage />} />
          
          {/* Test Pages */}
          <Route path="/test-auth" element={<TestAuthPage />} />
          <Route path="/debug" element={<DebugPage />} />
          <Route path="/clear-storage" element={<ClearStoragePage />} />
          <Route path="/sync-users" element={<SyncUsersPage />} />
        </Routes>
      </main>
      {!isDashboardPage && <Footer />}
      {!isAdminDashboard && !isVendorDashboard && !isCustomerDashboard && <CartDebugger />}
      </div>
    </SecurityWrapper>
  );
}

function App() {
  // Initialize sample transactions on first load
  React.useEffect(() => {
    initializeAllTransactions();
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
          <CartProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <AppContent />
            </Router>
          </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
