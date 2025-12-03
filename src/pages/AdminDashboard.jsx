import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, Package, DollarSign, TrendingUp, BarChart3, 
  Bell, LogOut, Home, Store, Shield, Eye, Edit, 
  Search, Menu, ChevronLeft, Clock, ShoppingCart, Settings, User, X, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import NotificationCenter from '../components/NotificationCenter';
import Pagination from '../components/Pagination';
import { usePagination } from '../hooks/usePagination';
import AdminSettingsModal from '../components/AdminSettingsModal';
import ImageCacheManager from '../components/ImageCacheManager';
import StorageDebugger from '../components/StorageDebugger';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('all'); // all, customer, vendor, admin
  const [orderFilter, setOrderFilter] = useState('all'); // all, pending, processing, delivered
  const [dateRange, setDateRange] = useState('30'); // 7, 30, 90, all
  const [sortBy, setSortBy] = useState('date-desc'); // date-desc, date-asc, amount-desc, amount-asc
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is not an admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      console.log('⚠️ Wrong dashboard! Redirecting to correct dashboard for role:', user.role);
      if (user.role === 'customer') {
        navigate('/customer/dashboard', { replace: true });
      } else if (user.role === 'vendor') {
        navigate('/vendor/dashboard', { replace: true });
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load Real Data from MySQL Database via Laravel API
  const [usersData, setUsersData] = useState([]);
  const [vendorsData, setVendorsData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from database when tab changes or filters change
  useEffect(() => {
    loadAdminData();
  }, [activeTab, searchQuery, userFilter, orderFilter, dateRange, sortBy]);

  const loadAdminData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Load from MySQL database via Laravel API
      const [dashboardRes, usersRes, vendorsRes, ordersRes, productsRes] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/admin/users', { params: { role: userFilter, search: searchQuery } }),
        api.get('/admin/vendors', { params: { search: searchQuery } }),
        api.get('/admin/orders', { params: { status: orderFilter, search: searchQuery, date_range: dateRange, sort_by: sortBy } }),
        api.get('/admin/products')
      ]);
      
      // Set dashboard stats from database
      setDashboardStats(dashboardRes.data.stats);
      
      // Set users data from database
      setUsersData(usersRes.data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status || 'active',
        orders: user.orders_count || 0,
        joinDate: new Date(user.created_at).toLocaleDateString()
      })));
      
      // Set vendors data from database
      setVendorsData(vendorsRes.data.map(vendor => ({
        id: vendor.id,
        name: vendor.business_name || vendor.name,
        email: vendor.email,
        status: vendor.vendor_status || 'pending',
        products: vendor.products_count || 0,
        revenue: '0' // Will be calculated from orders
      })));
      
      // Set orders data from database
      setOrdersData(ordersRes.data.map(order => ({
        id: order.order_number || order.id,
        date: new Date(order.created_at).toLocaleDateString(),
        dateTime: order.created_at,
        customer: order.customer?.name || 'Unknown',
        total: (order.total_amount || order.total || 0).toString(),
        status: order.status || 'pending',
        items: order.items?.length || 0
      })));
      
      console.log('✅ Admin data loaded from MySQL database');
      setLoading(false);
    } catch (err) {
      console.error('❌ Error loading from database:', err);
      setError('Failed to load data from database. Please check your connection.');
      
      // Fallback to localStorage if database fails
      const globalUsers = JSON.parse(localStorage.getItem('global_users') || '[]');
      const globalVendors = JSON.parse(localStorage.getItem('global_vendors') || '[]');
      const globalOrders = JSON.parse(localStorage.getItem('global_orders') || '[]');
      const globalProducts = JSON.parse(localStorage.getItem('global_products') || '[]');
      
      // Calculate stats from localStorage as fallback
      const totalRevenue = globalOrders.reduce((sum, order) => {
        const total = parseFloat(order.total?.toString().replace(/,/g, '') || 0);
        return sum + total;
      }, 0);
      
      const pendingVendors = globalVendors.filter(v => v.status === 'pending').length;
      const activeProducts = globalProducts.filter(p => p.status === 'active').length;
      
      // Set dashboard stats from localStorage
      setDashboardStats({
        total_users: globalUsers.length,
        total_vendors: globalVendors.length,
        total_orders: globalOrders.length,
        total_revenue: totalRevenue,
        pending_vendors: pendingVendors,
        active_products: activeProducts
      });
      
      // Set users data from localStorage
      setUsersData(globalUsers.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status || 'active',
        orders: user.orders || 0,
        joinDate: user.joinDate || (user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A')
      })));
      
      // Set vendors data from localStorage
      setVendorsData(globalVendors.map(vendor => {
        const vendorUser = globalUsers.find(u => u.id === vendor.userId);
        const vendorProducts = globalProducts.filter(p => p.vendorId === vendor.userId);
        const vendorOrders = globalOrders.filter(o => 
          o.products?.some(p => vendorProducts.find(vp => vp.id === p.id))
        );
        const vendorRevenue = vendorOrders.reduce((sum, order) => {
          return sum + parseFloat(order.total?.toString().replace(/,/g, '') || 0);
        }, 0);
        
        return {
          id: vendor.id,
          name: vendor.businessName || vendorUser?.business_name || 'Unknown',
          email: vendorUser?.email || 'N/A',
          status: vendor.status || 'active',
          products: vendorProducts.length,
          revenue: vendorRevenue.toFixed(2)
        };
      }));
      
      // Set orders data from localStorage
      setOrdersData(globalOrders.map(order => ({
        id: order.id,
        date: order.date || (order.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString()),
        dateTime: order.dateTime || order.createdAt || new Date().toISOString(),
        customer: order.customerName || order.customer || 'Unknown',
        total: order.total?.toString() || '0',
        status: order.status || 'Pending',
        items: Array.isArray(order.products) ? order.products.length : (order.items || 0)
      })));
      
      console.log('⚠️ Using localStorage as fallback');
      setLoading(false);
    }
  };

  // Use stats from localStorage (instant, no loading)
  const stats = dashboardStats ? {
    totalUsers: dashboardStats.total_users || 0,
    totalVendors: dashboardStats.total_vendors || 0,
    totalOrders: dashboardStats.total_orders || 0,
    totalRevenue: dashboardStats.total_revenue || 0,
    pendingOrders: ordersData.filter(o => o.status === 'Pending').length,
    activeProducts: dashboardStats.active_products || 0,
    deliveredOrders: ordersData.filter(o => o.status === 'Delivered').length,
    shippedOrders: ordersData.filter(o => o.status === 'Shipped').length,
    processingOrders: ordersData.filter(o => o.status === 'Processing').length
  } : {
    totalUsers: 0,
    totalVendors: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    activeProducts: 0,
    deliveredOrders: 0,
    shippedOrders: 0,
    processingOrders: 0
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'vendors', label: 'Vendors', icon: Store },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const handleLogout = async () => {
    try { await logout(); navigate('/'); } 
    catch (error) { console.error(error); }
  };

  // Advanced Search and Filter Functions
  const filterUsers = () => {
    let filtered = [...usersData];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(u => 
        u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Role filter
    if (userFilter !== 'all') {
      filtered = filtered.filter(u => u.role === userFilter);
    }
    
    return filtered;
  };

  const filterVendors = () => {
    let filtered = [...vendorsData];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(v => 
        v.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filterOrders = () => {
    let filtered = [...ordersData];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(o => 
        o.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Status filter
    if (orderFilter !== 'all') {
      filtered = filtered.filter(o => o.status?.toLowerCase() === orderFilter.toLowerCase());
    }
    
    // Date range filter
    if (dateRange !== 'all') {
      const days = parseInt(dateRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filtered = filtered.filter(o => {
        const orderDate = new Date(o.dateTime || o.date);
        return orderDate >= cutoffDate;
      });
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.dateTime || b.date) - new Date(a.dateTime || a.date);
        case 'date-asc':
          return new Date(a.dateTime || a.date) - new Date(b.dateTime || b.date);
        case 'amount-desc':
          return parseFloat(b.total.replace(/,/g, '')) - parseFloat(a.total.replace(/,/g, ''));
        case 'amount-asc':
          return parseFloat(a.total.replace(/,/g, '')) - parseFloat(b.total.replace(/,/g, ''));
        default:
          return 0;
      }
    });
    
    return filtered;
  };

  const filteredUsers = filterUsers();
  const filteredVendors = filterVendors();
  const filteredOrders = filterOrders();

  // Pagination for each tab
  const usersPagination = usePagination(filteredUsers, 10);
  const vendorsPagination = usePagination(filteredVendors, 9);
  const ordersPagination = usePagination(filteredOrders, 10);

  return (
    <div className="flex h-screen bg-soft-white overflow-hidden">
      {/* Sidebar - Properly Docked */}
      {sidebarOpen && (
        <aside className={`${isMobile ? 'fixed z-50 left-0 top-0' : 'relative flex-shrink-0'} 
          w-64 h-screen bg-gradient-to-b from-forest-green to-sea-blue text-white shadow-2xl`}>
          <div className="h-full flex flex-col w-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                  <img src="/logo.jpg" alt="Aton Diya" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h1 className="font-playfair font-bold text-lg">Aton Diya</h1>
                  <p className="text-xs text-coconut-tan">Admin Portal</p>
                </div>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-dawn-orange flex items-center justify-center font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{user?.name || 'Administrator'}</p>
                <p className="text-xs text-coconut-tan truncate">{user?.email || 'admin@atondiya.com'}</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); if (isMobile) setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id ? 'bg-dawn-orange text-white shadow-lg' : 'text-coconut-tan hover:bg-white/10'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
          </nav>
          {/* Bottom Actions */}
          <div className="p-4 border-t border-white/20 space-y-2">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
          </div>
        </aside>
      )}
      
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}
      
      {/* Main Content - Adjusts based on sidebar */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-soft-white rounded-lg transition-colors">
              <Menu className="w-6 h-6 text-forest-green" />
            </button>
            <h2 className="hidden md:block text-lg font-bold text-gray-800 capitalize">{activeTab}</h2>
            
            {/* Real-time Notifications */}
            <NotificationCenter />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-green mx-auto mb-4"></div>
                <p className="text-gray-600">Loading data from database...</p>
              </div>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <div>
                  <h3 className="font-bold text-red-800">Database Connection Error</h3>
                  <p className="text-sm text-red-600">{error}</p>
                  <p className="text-xs text-red-500 mt-1">Using cached data from localStorage as fallback.</p>
                </div>
              </div>
            </div>
          )}

          {!loading && activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-gradient-to-r from-forest-green via-sea-blue to-forest-green text-white rounded-2xl p-6 md:p-8 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-dawn-orange/30 flex items-center justify-center">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-playfair font-bold">Welcome, Administrator!</h1>
                    <p className="text-coconut-tan text-sm">Manage your platform and monitor performance</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="basket-card p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-xs text-green-600 font-bold">+12%</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">{stats.totalUsers}</h3>
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
                <div className="basket-card p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Store className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-xs text-green-600 font-bold">+8%</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">{stats.totalVendors}</h3>
                  <p className="text-sm text-gray-600">Vendors</p>
                </div>
                <div className="basket-card p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-600" />
                    </div>
                    <span className="text-xs text-green-600 font-bold">+15%</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">{stats.totalOrders}</h3>
                  <p className="text-sm text-gray-600">Orders</p>
                </div>
                <div className="basket-card p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-xs text-green-600 font-bold">+20%</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">₱{stats.totalRevenue.toLocaleString()}</h3>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="basket-card p-6">
                  <h3 className="text-lg font-bold text-forest-green mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />Recent Orders
                  </h3>
                  <div className="space-y-3">
                    {ordersData.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center gap-3 p-3 bg-soft-white rounded-lg hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-dawn-orange rounded-lg flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">Order #{order.id}</p>
                          <p className="text-xs text-gray-500">{order.date} • {order.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-dawn-orange">₱{order.total}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    {ordersData.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No orders yet</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="basket-card p-6">
                  <h3 className="text-lg font-bold text-forest-green mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-soft-white rounded-lg">
                      <span className="text-sm text-gray-700">Pending Orders</span>
                      <span className="text-2xl font-bold text-dawn-orange">{stats.pendingOrders}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-soft-white rounded-lg">
                      <span className="text-sm text-gray-700">Active Products</span>
                      <span className="text-2xl font-bold text-forest-green">{stats.activeProducts}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-soft-white rounded-lg">
                      <span className="text-sm text-gray-700">Total Vendors</span>
                      <span className="text-2xl font-bold text-sea-blue">{stats.totalVendors}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* USERS TAB */}
          {!loading && activeTab === 'users' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="basket-card p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-playfair font-bold text-forest-green">User Management ({filteredUsers.length})</h2>
                <button className="btn-organic px-4 py-2 bg-dawn-orange text-white">+ Add User</button>
              </div>
              
              {/* Search and Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green/50"
                  />
                </div>
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green/50"
                >
                  <option value="all">All Roles</option>
                  <option value="customer">Customers</option>
                  <option value="vendor">Vendors</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-soft-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-forest-green">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-forest-green">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-forest-green">Role</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-forest-green">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-forest-green">Orders</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-forest-green">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersPagination.paginatedItems.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      usersPagination.paginatedItems.map((user) => (
                      <tr key={user.id} className="border-b border-gray-200 hover:bg-soft-white">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">{user.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{user.orders}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <Pagination
                currentPage={usersPagination.currentPage}
                totalPages={usersPagination.totalPages}
                onPageChange={usersPagination.goToPage}
                itemsPerPage={usersPagination.itemsPerPage}
                totalItems={usersPagination.totalItems}
              />
            </motion.div>
          )}

          {/* VENDORS TAB */}
          {!loading && activeTab === 'vendors' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="basket-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-playfair font-bold text-forest-green">Vendor Management ({filteredVendors.length})</h2>
                  <button className="btn-organic px-4 py-2 bg-dawn-orange text-white">+ Add Vendor</button>
                </div>
                
                {/* Search */}
                <div className="mb-6 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search vendors by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green/50"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vendorsPagination.paginatedItems.length === 0 ? (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      No vendors found
                    </div>
                  ) : (
                    vendorsPagination.paginatedItems.map((vendor) => (
                    <div key={vendor.id} className="bg-soft-white rounded-xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-forest-green rounded-xl flex items-center justify-center">
                          <Store className="w-6 h-6 text-white" />
                        </div>
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                          vendor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {vendor.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{vendor.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{vendor.email}</p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-600">Products</p>
                          <p className="text-xl font-bold text-gray-800">{vendor.products}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-600">Revenue</p>
                          <p className="text-lg font-bold text-forest-green">₱{vendor.revenue}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100">
                          View
                        </button>
                        <button className="flex-1 py-2 bg-orange-50 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-100">
                          Edit
                        </button>
                      </div>
                    </div>
                  )))}
                </div>
                
                {/* Pagination */}
                <Pagination
                  currentPage={vendorsPagination.currentPage}
                  totalPages={vendorsPagination.totalPages}
                  onPageChange={vendorsPagination.goToPage}
                  itemsPerPage={vendorsPagination.itemsPerPage}
                  totalItems={vendorsPagination.totalItems}
                />
              </div>
            </motion.div>
          )}

          {/* ORDERS TAB */}
          {!loading && activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="basket-card p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-playfair font-bold text-forest-green">Order Management ({filteredOrders.length})</h2>
              </div>
              
              {/* Advanced Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green/50"
                  />
                </div>
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green/50"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green/50"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="all">All time</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green/50"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="amount-desc">Highest Amount</option>
                  <option value="amount-asc">Lowest Amount</option>
                </select>
              </div>
              
              <div className="space-y-3">
                {ordersPagination.paginatedItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No orders found
                  </div>
                ) : (
                  ordersPagination.paginatedItems.map((order) => (
                  <div key={order.id} className="bg-soft-white rounded-xl p-4 border-2 border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-forest-green rounded-xl flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-800">{order.id}</h3>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{order.customer} • {order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Total</p>
                          <p className="text-2xl font-bold text-forest-green">₱{order.total}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100">
                            <Edit className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )))}
              </div>
              
              {/* Pagination */}
              <Pagination
                currentPage={ordersPagination.currentPage}
                totalPages={ordersPagination.totalPages}
                onPageChange={ordersPagination.goToPage}
                itemsPerPage={ordersPagination.itemsPerPage}
                totalItems={ordersPagination.totalItems}
              />
            </motion.div>
          )}

          {/* ANALYTICS TAB */}
          {!loading && activeTab === 'analytics' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="basket-card p-6">
                <h2 className="text-2xl font-playfair font-bold text-forest-green mb-2">Analytics Overview</h2>
                <p className="text-gray-600 mb-6">Monitor your platform performance and trends</p>
                
                {/* Status Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl">✅</span>
                    </div>
                    <p className="text-sm text-green-700 font-semibold mb-1">Delivered</p>
                    <p className="text-3xl font-bold text-green-800">{stats.deliveredOrders}</p>
                    <p className="text-xs text-green-600 mt-2">
                      {stats.totalOrders > 0 ? Math.round((stats.deliveredOrders / stats.totalOrders) * 100) : 0}% of total
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-2 border-yellow-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl">⏳</span>
                    </div>
                    <p className="text-sm text-yellow-700 font-semibold mb-1">Processing</p>
                    <p className="text-3xl font-bold text-yellow-800">{stats.processingOrders}</p>
                    <p className="text-xs text-yellow-600 mt-2">
                      {stats.totalOrders > 0 ? Math.round((stats.processingOrders / stats.totalOrders) * 100) : 0}% of total
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl">🚚</span>
                    </div>
                    <p className="text-sm text-blue-700 font-semibold mb-1">Shipped</p>
                    <p className="text-3xl font-bold text-blue-800">{stats.shippedOrders}</p>
                    <p className="text-xs text-blue-600 mt-2">
                      {stats.totalOrders > 0 ? Math.round((stats.shippedOrders / stats.totalOrders) * 100) : 0}% of total
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl">💰</span>
                    </div>
                    <p className="text-sm text-purple-700 font-semibold mb-1">Revenue</p>
                    <p className="text-3xl font-bold text-purple-800">₱{stats.totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-purple-600 mt-2">Total earnings</p>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Bar Chart */}
                  <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-forest-green" />
                      Monthly Revenue
                    </h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, idx) => {
                        const heights = [60, 75, 65, 85, 80, 90];
                        return (
                          <div key={month} className="flex-1 flex flex-col items-center gap-2">
                            <div className="relative w-full group">
                              <div 
                                className="w-full bg-gradient-to-t from-forest-green to-sea-blue rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                                style={{ height: `${heights[idx] * 2}px` }}
                              ></div>
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                ₱{(heights[idx] * 100).toLocaleString()}
                              </div>
                            </div>
                            <span className="text-xs text-gray-600 font-semibold">{month}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pie Chart */}
                  <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Order Status Distribution</h3>
                    <div className="flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <svg viewBox="0 0 100 100" className="transform -rotate-90">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="62.8 251.2" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="62.8 251.2" strokeDashoffset="-62.8" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="62.8 251.2" strokeDashoffset="-125.6" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="62.8 251.2" strokeDashoffset="-188.4" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">Delivered</span>
                        </div>
                        <span className="text-sm font-bold text-gray-800">25%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">Processing</span>
                        </div>
                        <span className="text-sm font-bold text-gray-800">25%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">Shipped</span>
                        </div>
                        <span className="text-sm font-bold text-gray-800">25%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">Pending</span>
                        </div>
                        <span className="text-sm font-bold text-gray-800">25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
      
      {/* Settings Modal */}
      <AdminSettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)}
        user={user}
      />
      
      {/* Image Cache Manager */}
      <ImageCacheManager products={[...usersData, ...vendorsData, ...ordersData]} />
      
      {/* Storage Debugger - Development Only */}
      <StorageDebugger />
    </div>
  );
};

export default AdminDashboard;
