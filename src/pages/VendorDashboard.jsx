import { motion, AnimatePresence } from 'framer-motion';
import { Package, TrendingUp, ShoppingCart, DollarSign, Eye, Edit, Trash2, Plus, Store, BarChart3, Settings, LogOut, X, Upload, Save, Calendar, ArrowUp, ArrowDown, Bell, Filter, SortDesc, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import NotificationCenter from '../components/NotificationCenter';
import OrderNotification from '../components/OrderNotification';
import Pagination from '../components/Pagination';
import { usePagination } from '../hooks/usePagination';
import ImageCacheManager from '../components/ImageCacheManager';
import { syncVendorData, showSuccessNotification, showErrorNotification, showConfirmDialog } from '../utils/syncVendorData';
import { printOrderReceipt, exportOrderToExcel, exportOrdersToExcel } from '../utils/orderExport';
import api from '../services/api';
import Swal from 'sweetalert2';
import '../utils/productImageHelper'; // Load helper for debugging
import '../styles/vendorDashboard.css'; // Enhanced styles

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get active tab from URL, default to 'overview'
  const activeTab = searchParams.get('tab') || 'overview';
  
  // Function to change tab and update URL
  const setActiveTab = (tab) => {
    setSearchParams({ tab });
  };
  
  // Redirect if user is not a vendor
  useEffect(() => {
    if (user && user.role !== 'vendor') {
      console.log('⚠️ Wrong dashboard! Redirecting to correct dashboard for role:', user.role);
      if (user.role === 'customer') {
        navigate('/customer/dashboard', { replace: true });
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      }
    }
  }, [user, navigate]);

  // Sync data from backend on mount (silent - no popup)
  useEffect(() => {
    if (user?.id && user?.role === 'vendor') {
      const syncData = async () => {
        try {
          console.log('🔄 Silently syncing vendor data...');
          const { getCsrfCookie } = await import('../services/api');
          await getCsrfCookie();
          
          const response = await api.get('/vendor/dashboard');
          if (response.data) {
            const { products, orders } = response.data;
            if (products) setProducts(products);
            if (orders) setOrders(orders);
            console.log('✅ Data synced successfully');
          }
        } catch (error) {
          console.log('⚠️ Backend not available, using cached data');
          // Silently fail - user can manually refresh if needed
        }
      };
      syncData();
    }
  }, [user?.id]);
  
  // Modal states from URL
  const showProductModal = searchParams.get('modal') === 'product';
  const showProfileModal = searchParams.get('modal') === 'profile';
  const showOrderDetailsModal = searchParams.get('modal') === 'order';
  
  const setShowProductModal = (show) => {
    if (show) {
      setSearchParams({ tab: activeTab, modal: 'product' });
    } else {
      setSearchParams({ tab: activeTab });
    }
  };
  
  const setShowProfileModal = (show) => {
    if (show) {
      setSearchParams({ tab: activeTab, modal: 'profile' });
    } else {
      setSearchParams({ tab: activeTab });
    }
  };
  
  const setShowOrderDetailsModal = (show) => {
    if (show) {
      setSearchParams({ tab: activeTab, modal: 'order' });
    } else {
      setSearchParams({ tab: activeTab });
    }
  };
  
  const [editingProduct, setEditingProduct] = useState(null);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderSortBy, setOrderSortBy] = useState('newest'); // newest, oldest, amount-high, amount-low
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  
  // Handle modal close on browser back button
  useEffect(() => {
    const modal = searchParams.get('modal');
    if (!modal) {
      setEditingProduct(null);
      setSelectedOrder(null);
    }
  }, [searchParams]);
  
  // Advanced Features - New State
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [productStatusFilter, setProductStatusFilter] = useState('all');
  const [productSortBy, setProductSortBy] = useState('name');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderDateFilter, setOrderDateFilter] = useState('all');
  const [showLowStockAlert, setShowLowStockAlert] = useState(true);
  
  // Initialize products from localStorage
  const getInitialProducts = () => {
    if (user?.id) {
      const savedProducts = localStorage.getItem(`vendor_products_${user.id}`);
      if (savedProducts) {
        try {
          return JSON.parse(savedProducts);
        } catch (error) {
          console.error('Error loading products:', error);
        }
      }
    }
    
    // Get vendor/business name
    const vendorName = user?.business_name || user?.businessName || user?.name || 'My Store';
    
    // Sample data for NACBA Indigenous Crafts
    if (user?.email === 'nacba@gmail.com') {
      return [
        { 
          id: 1, 
          name: 'Handwoven Banig Mat', 
          price: 850, 
          stock: 25, 
          sales: 45, 
          status: 'active', 
          category: 'Handicrafts', 
          vendor: 'NACBA Indigenous Crafts',
          image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop',
          description: 'Traditional handwoven mat made from natural materials by local artisans'
        },
        { 
          id: 2, 
          name: 'Bamboo Basket Set', 
          price: 650, 
          stock: 18, 
          sales: 32, 
          status: 'active', 
          category: 'Handicrafts', 
          vendor: 'NACBA Indigenous Crafts',
          image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=400&fit=crop',
          description: 'Handcrafted bamboo baskets perfect for storage and home organization'
        },
        { 
          id: 3, 
          name: 'Coconut Shell Bowl', 
          price: 380, 
          stock: 30, 
          sales: 28, 
          status: 'active', 
          category: 'Home Decor', 
          vendor: 'NACBA Indigenous Crafts',
          image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop',
          description: 'Eco-friendly bowls made from natural coconut shells'
        },
        { 
          id: 4, 
          name: 'Organic Wild Honey', 
          price: 450, 
          stock: 15, 
          sales: 52, 
          status: 'active', 
          category: 'Food Products', 
          vendor: 'NACBA Indigenous Crafts',
          image: 'https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=400&h=400&fit=crop',
          description: 'Pure organic wild honey harvested from local forests'
        },
        { 
          id: 5, 
          name: 'Rattan Handbag', 
          price: 720, 
          stock: 12, 
          sales: 18, 
          status: 'active', 
          category: 'Accessories', 
          vendor: 'NACBA Indigenous Crafts',
          image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
          description: 'Stylish handwoven rattan handbag, perfect for any occasion'
        },
      ];
    }
    
    // Sample data for demo vendor account
    if (user?.email === 'vendor@gmail.com' || user?.email === 'vendor@demo.com') {
      return [
        { 
          id: 1, 
          name: 'Handwoven Banig Mat', 
          price: 850, 
          stock: 15, 
          sales: 45, 
          status: 'active', 
          category: 'Handicrafts',
          vendor: vendorName,
          image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop',
          description: 'Traditional handwoven mat made from natural materials'
        },
        { 
          id: 2, 
          name: 'Coconut Shell Crafts', 
          price: 450, 
          stock: 8, 
          sales: 32, 
          status: 'active', 
          category: 'Home Decor',
          vendor: vendorName,
          image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop',
          description: 'Eco-friendly crafts made from coconut shells'
        },
        { 
          id: 3, 
          name: 'Bamboo Baskets', 
          price: 650, 
          stock: 12, 
          sales: 28, 
          status: 'active', 
          category: 'Handicrafts',
          vendor: vendorName,
          image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=400&fit=crop',
          description: 'Handcrafted bamboo baskets for storage'
        },
      ];
    }
    
    // New vendors start with empty products
    return [];
  };

  const [products, setProducts] = useState(getInitialProducts());

  // Initialize orders from localStorage
  const getInitialOrders = () => {
    if (user?.id) {
      const savedOrders = localStorage.getItem(`vendor_orders_${user.id}`);
      if (savedOrders) {
        try {
          return JSON.parse(savedOrders);
        } catch (error) {
          console.error('Error loading orders:', error);
        }
      }
    }
    
    // Only show sample data for demo vendor account
    if (user?.email === 'vendor@gmail.com') {
      return [
        { id: 1001, customer: 'Juan Dela Cruz', product: 'Handwoven Banig Mat', quantity: 2, total: 1700, status: 'pending', date: '2024-11-20' },
        { id: 1002, customer: 'Maria Santos', product: 'Coconut Shell Crafts', quantity: 3, total: 1350, status: 'processing', date: '2024-11-21' },
        { id: 1003, customer: 'Pedro Garcia', product: 'Bamboo Baskets', quantity: 1, total: 650, status: 'shipped', date: '2024-11-22' },
        { id: 1004, customer: 'Ana Reyes', product: 'Handwoven Banig Mat', quantity: 1, total: 850, status: 'delivered', date: '2024-11-15' },
        { id: 1005, customer: 'Carlos Lopez', product: 'Coconut Shell Crafts', quantity: 2, total: 900, status: 'delivered', date: '2024-11-10' },
        { id: 1006, customer: 'Elena Cruz', product: 'Bamboo Baskets', quantity: 3, total: 1950, status: 'delivered', date: '2024-11-05' },
        { id: 1007, customer: 'Miguel Santos', product: 'Handwoven Banig Mat', quantity: 1, total: 850, status: 'delivered', date: '2024-10-28' },
        { id: 1008, customer: 'Rosa Garcia', product: 'Coconut Shell Crafts', quantity: 4, total: 1800, status: 'delivered', date: '2024-10-20' },
      ];
    }
    
    // New vendors start with empty orders
    return [];
  };

  const [orders, setOrders] = useState(getInitialOrders());

  // Monthly sales data for charts
  // Calculate monthly sales data from real orders
  const calculateMonthlySalesData = () => {
    const monthlyData = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Get last 6 months
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = monthNames[date.getMonth()];
      
      monthlyData[monthKey] = {
        month: monthName,
        revenue: 0,
        orders: 0,
        profit: 0
      };
    }
    
    // Aggregate orders by month
    orders.forEach(order => {
      const orderDate = new Date(order.date);
      const monthKey = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
      
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].revenue += order.total;
        monthlyData[monthKey].orders += 1;
        // Assume 50% profit margin
        monthlyData[monthKey].profit += order.total * 0.5;
      }
    });
    
    return Object.values(monthlyData);
  };
  
  const monthlySalesData = calculateMonthlySalesData();

  // Initialize storeProfile from localStorage first, then fallback to user data
  const getInitialStoreProfile = () => {
    if (user?.id) {
      const savedProfile = localStorage.getItem(`vendor_profile_${user.id}`);
      if (savedProfile) {
        try {
          return JSON.parse(savedProfile);
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      }
    }
    // Fallback to user data
    return {
      businessName: user?.businessName || user?.business_name || 'My Store',
      description: user?.businessDescription || user?.business_description || 'Quality indigenous products',
      phone: user?.phone || '',
      address: user?.address || '',
      category: user?.category || 'Handicrafts',
      image: user?.image || null,
    };
  };

  const [storeProfile, setStoreProfile] = useState(getInitialStoreProfile());

  const [productForm, setProductForm] = useState({
    name: '', price: '', stock: '', category: '', description: '', image: null
  });

  // New functional features
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Load from localStorage when user changes
  useEffect(() => {
    if (user?.id) {
      // Load profile
      const savedProfile = localStorage.getItem(`vendor_profile_${user.id}`);
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          setStoreProfile(parsedProfile);
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      } else {
        // Initialize from user data if no saved profile
        setStoreProfile({
          businessName: user?.business_name || user?.businessName || 'My Store',
          description: user?.business_description || user?.businessDescription || 'Quality indigenous products',
          phone: user?.phone || '',
          address: user?.address || '',
          category: user?.category || 'Handicrafts',
          image: user?.image || null,
        });
      }

      // Load products
      const savedProducts = localStorage.getItem(`vendor_products_${user.id}`);
      if (savedProducts) {
        try {
          const parsedProducts = JSON.parse(savedProducts);
          // Ensure all products have images (add default if missing)
          const productsWithImages = parsedProducts.map(p => ({
            ...p,
            image: p.image || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop'
          }));
          setProducts(productsWithImages);
        } catch (error) {
          console.error('Error loading products:', error);
        }
      } else {
        // Initialize with sample products if none exist
        const initialProducts = getInitialProducts();
        setProducts(initialProducts);
        localStorage.setItem(`vendor_products_${user.id}`, JSON.stringify(initialProducts));
      }

      // Load orders
      const savedOrders = localStorage.getItem(`vendor_orders_${user.id}`);
      if (savedOrders) {
        try {
          const parsedOrders = JSON.parse(savedOrders);
          setOrders(parsedOrders);
        } catch (error) {
          console.error('Error loading orders:', error);
        }
      }
    }
  }, [user?.id]);

  // Save to localStorage
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`vendor_products_${user.id}`, JSON.stringify(products));
      localStorage.setItem(`vendor_orders_${user.id}`, JSON.stringify(orders));
      localStorage.setItem(`vendor_profile_${user.id}`, JSON.stringify(storeProfile));
    }
  }, [products, orders, storeProfile, user]);

  // Mark orders as seen when Orders tab is viewed
  useEffect(() => {
    if (activeTab === 'orders' && user?.id && orders.some(o => o.isNew)) {
      console.log('📬 Marking orders as read...');
      const updatedOrders = orders.map(order => ({ ...order, isNew: false }));
      setOrders(updatedOrders);
      localStorage.setItem(`vendor_orders_${user.id}`, JSON.stringify(updatedOrders));
      console.log('✅ Orders marked as read');
    }
  }, [activeTab, user?.id, orders]);

  const stats = [
    { icon: DollarSign, label: 'Total Revenue', value: `₱${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`, change: '+12.5%', color: 'bg-green-500' },
    { icon: ShoppingCart, label: 'Total Orders', value: orders.length, change: '+8.2%', color: 'bg-blue-500' },
    { icon: Package, label: 'Products', value: products.length, change: `${products.filter(p => p.status === 'active').length} active`, color: 'bg-purple-500' },
    { icon: TrendingUp, label: 'Total Sales', value: products.reduce((sum, p) => sum + p.sales, 0), change: '+15%', color: 'bg-orange-500' },
  ];


  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductForm({ name: '', price: '', stock: '', category: '', description: '', image: null });
    setShowProductModal(true);
  };

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm({ ...productForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (id) => {
    const confirmed = await showConfirmDialog(
      'Delete Product?',
      'This action cannot be undone. Are you sure?'
    );
    
    if (confirmed) {
      const productToDelete = products.find(p => p.id === id);
      setProducts(products.filter(p => p.id !== id));
      
      // Record transaction
      const { recordProductTransaction } = await import('../utils/transactionRecorder');
      await recordProductTransaction(productToDelete, user?.id, 'delete');
      
      showSuccessNotification('Deleted!', 'Product has been deleted successfully');
    }
  };

  const handleSaveProduct = async () => {
    // Get vendor name from store profile or user data
    const vendorName = storeProfile.businessName || user?.business_name || user?.businessName || user?.name || 'My Store';
    
    let savedProduct;
    if (editingProduct) {
      savedProduct = { 
        ...productForm, 
        id: editingProduct.id, 
        vendor: vendorName,
        updatedAt: new Date().toISOString() 
      };
      setProducts(products.map(p => p.id === editingProduct.id ? savedProduct : p));
      showSuccessNotification('Updated!', 'Product has been updated successfully');
    } else {
      savedProduct = { 
        ...productForm, 
        id: Date.now(), 
        sales: 0, 
        status: 'active',
        vendor: vendorName,
        createdAt: new Date().toISOString()
      };
      setProducts([...products, savedProduct]);
      showSuccessNotification('Added!', 'New product has been added successfully');
    }
    
    // Record transaction
    const { recordProductTransaction } = await import('../utils/transactionRecorder');
    await recordProductTransaction(savedProduct, user?.id, editingProduct ? 'update' : 'add');
    
    setShowProductModal(false);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showSuccessNotification('Status Updated!', `Order #${orderId} is now ${newStatus}`);
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailsModal(true);
  };

  const handleSaveProfile = () => {
    setShowProfileModal(false);
  };

  // Advanced Features - Filter & Search Functions
  const filterProducts = () => {
    let filtered = [...products];
    
    // Search filter
    if (productSearchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(productSearchQuery.toLowerCase())
      );
    }
    
    // Category filter
    if (productCategoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === productCategoryFilter);
    }
    
    // Status filter
    if (productStatusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === productStatusFilter);
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (productSortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'stock': return b.stock - a.stock;
        case 'sales': return b.sales - a.sales;
        default: return 0;
      }
    });
    
    return filtered;
  };

  const filterOrders = () => {
    // Sort orders first (newest first by default)
    let sortedOrders = [...orders];
    
    switch (orderSortBy) {
      case 'newest':
        sortedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        sortedOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'amount-high':
        sortedOrders.sort((a, b) => b.total - a.total);
        break;
      case 'amount-low':
        sortedOrders.sort((a, b) => a.total - b.total);
        break;
      default:
        sortedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Filter orders based on search query and status
    let filtered = sortedOrders.filter(order => {
      const searchLower = orderSearchQuery.toLowerCase();
      const matchesSearch = (
        order.id.toString().includes(searchLower) ||
        order.customer.toLowerCase().includes(searchLower) ||
        order.product.toLowerCase().includes(searchLower) ||
        order.status.toLowerCase().includes(searchLower)
      );
      
      const matchesStatus = orderStatusFilter === 'all' || order.status === orderStatusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    // Date filter
    if (orderDateFilter !== 'all') {
      const days = parseInt(orderDateFilter);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filtered = filtered.filter(o => new Date(o.date) >= cutoffDate);
    }
    
    return filtered;
  };

  // Pagination
  const filteredProducts = filterProducts();
  const filteredOrders = filterOrders();
  const productsPagination = usePagination(filteredProducts, 10);
  const ordersPagination = usePagination(filteredOrders, 10);

  // Export to CSV
  const exportToCSV = (data, filename) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    const csv = [headers, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportProducts = () => {
    const exportData = filterProducts().map(p => ({
      Name: p.name,
      Category: p.category,
      Price: p.price,
      Stock: p.stock,
      Sales: p.sales,
      Status: p.status
    }));
    exportToCSV(exportData, 'products');
  };

  const handleExportOrders = () => {
    const exportData = filterOrders().map(o => ({
      OrderID: o.id,
      Customer: o.customer,
      Product: o.product,
      Quantity: o.quantity,
      Total: o.total,
      Status: o.status,
      Date: o.date
    }));
    exportToCSV(exportData, 'orders');
  };

  // Bulk Actions
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(filterProducts().map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(pid => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  // New functional features handlers
  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      alert('Please select products to delete');
      return;
    }
    if (confirm(`Delete ${selectedProducts.length} selected products?`)) {
      setProducts(products.filter(p => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
    }
  };

  const handleBulkStatusChange = (newStatus) => {
    if (selectedProducts.length === 0) {
      alert('Please select products first');
      return;
    }
    setProducts(products.map(p => 
      selectedProducts.includes(p.id) ? { ...p, status: newStatus } : p
    ));
    setSelectedProducts([]);
  };

  const handleExportData = (type) => {
    let data, filename;
    if (type === 'products') {
      data = products;
      filename = 'products.json';
    } else if (type === 'orders') {
      data = orders;
      filename = 'orders.json';
    } else if (type === 'sales') {
      data = monthlySalesData;
      filename = 'sales-report.json';
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleQuickAction = (action, productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    switch(action) {
      case 'restock':
        const newStock = prompt('Enter new stock quantity:', product.stock);
        if (newStock !== null) {
          setProducts(products.map(p => 
            p.id === productId ? { ...p, stock: parseInt(newStock), status: parseInt(newStock) > 0 ? 'active' : 'out_of_stock' } : p
          ));
        }
        break;
      case 'duplicate':
        const newProduct = { ...product, id: Date.now(), name: `${product.name} (Copy)`, sales: 0 };
        setProducts([...products, newProduct]);
        break;
      case 'discount':
        const discount = prompt('Enter discount percentage (0-100):', '10');
        if (discount !== null) {
          const discountedPrice = product.price * (1 - parseInt(discount) / 100);
          setProducts(products.map(p => 
            p.id === productId ? { ...p, price: Math.round(discountedPrice) } : p
          ));
        }
        break;
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProfile = { ...storeProfile, image: reader.result };
        setStoreProfile(updatedProfile);
        // Save to localStorage
        if (user?.id) {
          localStorage.setItem(`vendor_profile_${user.id}`, JSON.stringify(updatedProfile));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Store Profile Card at Top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="basket-card p-6 bg-gradient-to-r from-forest-green/5 to-sea-blue/5"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Store Image */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {storeProfile.image ? (
                <img 
                  src={storeProfile.image} 
                  alt={storeProfile.businessName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-dawn-orange to-forest-green flex items-center justify-center">
                  <Store className="w-16 h-16 text-white" />
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-dawn-orange text-white p-2 rounded-full cursor-pointer hover:bg-dawn-orange/90 transition-colors shadow-lg">
              <Upload className="w-4 h-4" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Store Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-playfair font-bold text-forest-green mb-2">
                  {storeProfile.businessName}
                </h2>
                <p className="text-earth-brown mb-3">{storeProfile.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-dawn-orange" />
                    <span className="text-gray-600">{storeProfile.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-dawn-orange" />
                    <span className="text-gray-600">{storeProfile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-dawn-orange" />
                    <span className="text-gray-600">{storeProfile.address}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowProfileModal(true)}
                className="btn-organic bg-dawn-orange text-white px-4 py-2 flex items-center gap-2 hover:bg-dawn-orange/90"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="basket-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-forest-green mb-1">{stat.value}</h3>
            <p className="text-earth-brown text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="basket-card p-6">
          <h3 className="text-xl font-playfair font-bold text-forest-green mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex justify-between items-center p-3 bg-light-cream rounded-lg">
                <div>
                  <p className="font-semibold text-forest-green">#{order.id}</p>
                  <p className="text-sm text-earth-brown">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-forest-green">₱{order.total}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="basket-card p-6">
          <h3 className="text-xl font-playfair font-bold text-forest-green mb-4">Top Products</h3>
          <div className="space-y-3">
            {products.sort((a, b) => b.sales - a.sales).slice(0, 5).map(product => (
              <div key={product.id} className="flex justify-between items-center p-3 bg-light-cream rounded-lg">
                <div>
                  <p className="font-semibold text-forest-green">{product.name}</p>
                  <p className="text-sm text-earth-brown">{product.sales} sold</p>
                </div>
                <p className="font-semibold text-dawn-orange">₱{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );


  const renderProducts = () => (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="basket-card p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-playfair font-bold text-forest-green">Your Products ({filteredProducts.length})</h2>
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={handleAddProduct} 
              className="btn-organic bg-dawn-orange text-white px-6 py-2 flex items-center gap-2 hover:bg-dawn-orange/90 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
            <button onClick={() => handleExportData('products')} className="btn-organic bg-sea-blue text-white px-6 py-2 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {/* Sort Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { value: 'name', label: 'Name' },
            { value: 'price-desc', label: 'Price: High to Low' },
            { value: 'price-asc', label: 'Price: Low to High' },
            { value: 'stock', label: 'Stock' },
            { value: 'sales', label: 'Best Selling' },
          ].map((sort) => (
            <button
              key={sort.value}
              onClick={() => setProductSortBy(sort.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                productSortBy === sort.value
                  ? 'bg-dawn-orange text-white shadow-md'
                  : 'bg-soft-white text-earth-brown hover:bg-light-cream border border-coconut-tan'
              }`}
            >
              {sort.label}
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={productSearchQuery}
              onChange={(e) => setProductSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
            />
          </div>
          <select
            value={productCategoryFilter}
            onChange={(e) => setProductCategoryFilter(e.target.value)}
            className="px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Handicrafts">Handicrafts</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Food">Food</option>
            <option value="Accessories">Accessories</option>
          </select>
          <select
            value={productStatusFilter}
            onChange={(e) => setProductStatusFilter(e.target.value)}
            className="px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg mb-4">
            <span className="text-sm font-semibold text-blue-900">{selectedProducts.length} selected</span>
            <button onClick={() => handleBulkStatusChange('active')} className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
              Mark Active
            </button>
            <button onClick={() => handleBulkStatusChange('out_of_stock')} className="text-sm px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
              Mark Out of Stock
            </button>
            <button onClick={handleBulkDelete} className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Delete Selected
            </button>
            <button onClick={() => setSelectedProducts([])} className="text-sm px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="basket-card p-6">
        <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-coconut-tan">
              <th className="text-left py-3 px-4 font-semibold text-forest-green">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedProducts(filteredProducts.map(p => p.id));
                    } else {
                      setSelectedProducts([]);
                    }
                  }}
                  className="w-4 h-4 rounded border-gray-300"
                />
              </th>
              <th className="text-left py-3 px-4 font-semibold text-forest-green">Image</th>
              <th className="text-left py-3 px-4 font-semibold text-forest-green">Product</th>
              <th className="text-left py-3 px-4 font-semibold text-forest-green">Vendor/Artisan</th>
              <th className="text-left py-3 px-4 font-semibold text-forest-green">Category</th>
              <th className="text-left py-3 px-4 font-semibold text-forest-green">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-forest-green">Stock</th>
              <th className="text-left py-3 px-4 font-semibold text-forest-green">Sales</th>
              <th className="text-left py-3 px-4 font-semibold text-forest-green">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-forest-green">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsPagination.paginatedItems.map((product) => (
              <motion.tr
                key={product.id}
                whileHover={{ backgroundColor: 'rgba(217, 180, 143, 0.1)' }}
                className="border-b border-coconut-tan/30 cursor-pointer"
                onClick={(e) => {
                  // Don't trigger if clicking checkbox
                  if (e.target.type === 'checkbox') return;
                  
                  // Show product details modal with actions
                  Swal.fire({
                    title: product.name,
                    html: `
                      <div class="text-left space-y-3">
                        ${product.image ? `<img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg mb-4" />` : ''}
                        <p><strong>Vendor:</strong> ${product.vendor || storeProfile.businessName || user?.business_name || 'My Store'}</p>
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Price:</strong> ₱${product.price}</p>
                        <p><strong>Stock:</strong> ${product.stock}</p>
                        <p><strong>Sales:</strong> ${product.sales}</p>
                        <p><strong>Status:</strong> <span class="px-2 py-1 rounded ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">${product.status === 'active' ? 'Active' : 'Out of Stock'}</span></p>
                        <p><strong>Description:</strong> ${product.description || 'No description'}</p>
                      </div>
                    `,
                    showCancelButton: true,
                    showDenyButton: true,
                    confirmButtonText: '<i class="fas fa-edit"></i> Edit',
                    denyButtonText: '<i class="fas fa-trash"></i> Delete',
                    cancelButtonText: 'Close',
                    confirmButtonColor: '#E67E22',
                    denyButtonColor: '#dc3545',
                    cancelButtonColor: '#6c757d',
                    width: '600px',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // Edit product
                      handleEditProduct(product);
                    } else if (result.isDenied) {
                      // Delete product
                      handleDeleteProduct(product.id);
                    }
                  });
                }}
              >
                <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts([...selectedProducts, product.id]);
                      } else {
                        setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                      }
                    }}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </td>
                <td className="py-4 px-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-coconut-tan bg-gradient-to-br from-soft-white to-light-cream flex items-center justify-center shadow-sm">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<svg class="w-8 h-8 text-earth-brown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>';
                        }}
                      />
                    ) : (
                      <Package className="w-8 h-8 text-earth-brown/40" />
                    )}
                  </div>
                </td>
                <td className="py-4 px-4 text-earth-brown font-semibold">{product.name}</td>
                <td className="py-4 px-4">
                  <span className="text-dawn-orange font-semibold text-sm">
                    {product.vendor || storeProfile.businessName || user?.business_name || user?.name || 'My Store'}
                  </span>
                </td>
                <td className="py-4 px-4 text-earth-brown">{product.category}</td>
                <td className="py-4 px-4 text-earth-brown">₱{product.price}</td>
                <td className="py-4 px-4">
                  <span className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                    {product.stock}
                  </span>
                </td>
                <td className="py-4 px-4 text-earth-brown">{product.sales}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {product.status === 'active' ? 'Active' : 'Out of Stock'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2 items-center justify-center">
                    <Eye className="w-4 h-4 text-sea-blue" />
                    <Edit className="w-4 h-4 text-dawn-orange" />
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        </div>
        
        {/* Pagination */}
        <Pagination
          currentPage={productsPagination.currentPage}
          totalPages={productsPagination.totalPages}
          onPageChange={productsPagination.goToPage}
          itemsPerPage={productsPagination.itemsPerPage}
          totalItems={productsPagination.totalItems}
        />
      </div>
    </div>
  );

  const renderOrders = () => {
    // Count new orders (orders from today)
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.date === today);

    return (
      <div className="space-y-6">
        {/* Header with Stats */}
        <div className="basket-card p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-playfair font-bold text-forest-green mb-2">Order Management</h2>
              <div className="flex items-center gap-4 text-sm text-earth-brown">
                <span>Total: {orders.length} orders</span>
                {todayOrders.length > 0 && (
                  <span className="flex items-center gap-1 text-dawn-orange font-semibold">
                    <Bell className="w-4 h-4" />
                    {todayOrders.length} new today
                  </span>
                )}
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-3">
              <div className="bg-yellow-50 px-4 py-2 rounded-lg">
                <div className="text-xs text-yellow-700">Pending</div>
                <div className="text-lg font-bold text-yellow-800">
                  {orders.filter(o => o.status === 'pending').length}
                </div>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <div className="text-xs text-blue-700">Processing</div>
                <div className="text-lg font-bold text-blue-800">
                  {orders.filter(o => o.status === 'processing').length}
                </div>
              </div>
              <div className="bg-green-50 px-4 py-2 rounded-lg">
                <div className="text-xs text-green-700">Delivered</div>
                <div className="text-lg font-bold text-green-800">
                  {orders.filter(o => o.status === 'delivered').length}
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <input
                type="text"
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                placeholder="Search by Order ID, Customer, Product..."
                className="w-full px-4 py-3 pl-12 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none transition-colors"
              />
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-brown" />
              {orderSearchQuery && (
                <button
                  onClick={() => setOrderSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-earth-brown hover:text-dawn-orange"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <select
              value={orderStatusFilter}
              onChange={(e) => setOrderStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2 mb-4">
            <SortDesc className="w-5 h-5 text-earth-brown" />
            <span className="text-sm text-earth-brown font-medium">Sort by:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'newest', label: 'Newest First' },
                { value: 'oldest', label: 'Oldest First' },
                { value: 'amount-high', label: 'Highest Amount' },
                { value: 'amount-low', label: 'Lowest Amount' },
              ].map((sort) => (
                <button
                  key={sort.value}
                  onClick={() => setOrderSortBy(sort.value)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    orderSortBy === sort.value
                      ? 'bg-dawn-orange text-white shadow-md'
                      : 'bg-soft-white text-earth-brown hover:bg-light-cream border border-coconut-tan'
                  }`}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="basket-card p-6">
          {ordersPagination.totalItems === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-earth-brown/30 mx-auto mb-4" />
              <p className="text-earth-brown text-lg mb-2">No orders found</p>
              <p className="text-earth-brown/60">
                {orderSearchQuery ? 'Try a different search term' : 'Orders will appear here when customers place them'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-coconut-tan">
                      <th className="text-left py-3 px-4 font-semibold text-forest-green">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-forest-green">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-forest-green">Product</th>
                      <th className="text-left py-3 px-4 font-semibold text-forest-green">Qty</th>
                      <th className="text-left py-3 px-4 font-semibold text-forest-green">Total</th>
                      <th className="text-left py-3 px-4 font-semibold text-forest-green">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-forest-green">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersPagination.paginatedItems.map((order, index) => {
                      const isNew = order.date === today;
                      return (
                        <motion.tr 
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleViewOrderDetails(order)}
                          className={`border-b border-coconut-tan/30 hover:bg-light-cream transition-colors cursor-pointer ${
                            isNew ? 'bg-dawn-orange/5' : ''
                          }`}
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-earth-brown font-semibold">#{order.id}</span>
                              {isNew && (
                                <span className="bg-dawn-orange text-white text-xs px-2 py-0.5 rounded-full">
                                  NEW
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-earth-brown">{order.customer}</td>
                          <td className="py-4 px-4 text-earth-brown">{order.product}</td>
                          <td className="py-4 px-4 text-earth-brown">{order.quantity}</td>
                          <td className="py-4 px-4 text-forest-green font-semibold">₱{order.total.toLocaleString()}</td>
                          <td className="py-4 px-4 text-earth-brown text-sm">{order.date}</td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'shipped' || order.status === 'in_transit' ? 'bg-blue-100 text-blue-700' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="mt-6">
                <Pagination
                  currentPage={ordersPagination.currentPage}
                  totalPages={ordersPagination.totalPages}
                  onPageChange={ordersPagination.goToPage}
                  itemsPerPage={ordersPagination.itemsPerPage}
                  totalItems={ordersPagination.totalItems}
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderSalesReports = () => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const avgOrderValue = totalRevenue / totalOrders || 0;
    const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

    // Calculate this month vs last month
    const currentMonth = monthlySalesData[monthlySalesData.length - 1];
    const lastMonth = monthlySalesData[monthlySalesData.length - 2];
    const revenueGrowth = ((currentMonth.revenue - lastMonth.revenue) / lastMonth.revenue * 100).toFixed(1);
    const ordersGrowth = ((currentMonth.orders - lastMonth.orders) / lastMonth.orders * 100).toFixed(1);

    // Product sales data for pie chart
    const productSalesData = products.map(product => ({
      name: product.name,
      value: product.sales * product.price,
      sales: product.sales
    }));

    const COLORS = ['#E67E22', '#2D5016', '#3498DB', '#F39C12', '#27AE60'];

    return (
      <div className="space-y-6">
        {/* Summary Cards with Growth Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="basket-card p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-earth-brown">Total Revenue</h3>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-forest-green mb-1">₱{totalRevenue.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-sm">
              {revenueGrowth > 0 ? (
                <>
                  <ArrowUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-semibold">{revenueGrowth}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="w-4 h-4 text-red-600" />
                  <span className="text-red-600 font-semibold">{Math.abs(revenueGrowth)}%</span>
                </>
              )}
              <span className="text-gray-500">vs last month</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="basket-card p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-earth-brown">Total Orders</h3>
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-forest-green mb-1">{totalOrders}</p>
            <div className="flex items-center gap-1 text-sm">
              {ordersGrowth > 0 ? (
                <>
                  <ArrowUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-semibold">{ordersGrowth}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="w-4 h-4 text-red-600" />
                  <span className="text-red-600 font-semibold">{Math.abs(ordersGrowth)}%</span>
                </>
              )}
              <span className="text-gray-500">vs last month</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="basket-card p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-earth-brown">Avg Order Value</h3>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-forest-green mb-1">₱{avgOrderValue.toFixed(0)}</p>
            <p className="text-sm text-gray-500">Per transaction</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="basket-card p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-earth-brown">Completed Orders</h3>
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-forest-green mb-1">{deliveredOrders}</p>
            <p className="text-sm text-gray-500">{((deliveredOrders / totalOrders) * 100).toFixed(0)}% completion rate</p>
          </motion.div>
        </div>

        {/* Revenue Trend Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="basket-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-playfair font-bold text-forest-green">Revenue Trend</h3>
              <p className="text-sm text-earth-brown">Monthly revenue performance (Last 6 months)</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Jun - Nov 2024</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlySalesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E67E22" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#E67E22" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#8B7355" />
              <YAxis stroke="#8B7355" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #D9B48F', borderRadius: '8px' }}
                formatter={(value) => `₱${value.toLocaleString()}`}
              />
              <Area type="monotone" dataKey="revenue" stroke="#E67E22" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-coconut-tan/30">
            <div className="text-center">
              <p className="text-sm text-earth-brown">Highest Month</p>
              <p className="text-lg font-bold text-forest-green">Nov - ₱45,250</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-earth-brown">Average</p>
              <p className="text-lg font-bold text-forest-green">₱{(monthlySalesData.reduce((sum, m) => sum + m.revenue, 0) / monthlySalesData.length).toFixed(0)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-earth-brown">Growth Rate</p>
              <p className="text-lg font-bold text-green-600">+{revenueGrowth}%</p>
            </div>
          </div>
        </motion.div>

        {/* Orders & Profit Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="basket-card p-6"
          >
            <h3 className="text-xl font-playfair font-bold text-forest-green mb-4">Orders & Profit Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#8B7355" />
                <YAxis stroke="#8B7355" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #D9B48F', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="orders" fill="#3498DB" name="Orders" radius={[8, 8, 0, 0]} />
                <Bar dataKey="profit" fill="#27AE60" name="Profit (₱)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="basket-card p-6"
          >
            <h3 className="text-xl font-playfair font-bold text-forest-green mb-4">Sales by Product</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={productSalesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {productSalesData.map((product, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-earth-brown">{product.name}</span>
                  </div>
                  <span className="font-semibold text-forest-green">₱{product.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Order Status Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="basket-card p-6"
        >
          <h3 className="text-xl font-playfair font-bold text-forest-green mb-4">Order Status Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { status: 'pending', color: 'bg-gray-100 text-gray-700', icon: '⏳' },
              { status: 'processing', color: 'bg-yellow-100 text-yellow-700', icon: '⚙️' },
              { status: 'shipped', color: 'bg-blue-100 text-blue-700', icon: '🚚' },
              { status: 'delivered', color: 'bg-green-100 text-green-700', icon: '✅' }
            ].map(({ status, color, icon }) => {
              const count = orders.filter(o => o.status === status).length;
              const percentage = (count / totalOrders * 100) || 0;
              return (
                <div key={status} className={`text-center p-6 rounded-xl ${color} transition-transform hover:scale-105`}>
                  <div className="text-3xl mb-2">{icon}</div>
                  <p className="text-3xl font-bold mb-1">{count}</p>
                  <p className="text-sm font-semibold capitalize mb-1">{status}</p>
                  <p className="text-xs opacity-75">{percentage.toFixed(1)}% of total</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  };

  const renderStoreProfile = () => (
    <div className="basket-card p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-playfair font-bold text-forest-green">Store Profile</h2>
        <button onClick={() => setShowProfileModal(true)} className="btn-organic bg-dawn-orange text-white px-6 py-2 flex items-center gap-2">
          <Edit className="w-5 h-5" />
          Edit Profile
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-earth-brown">Business Name</label>
          <p className="text-lg font-semibold text-forest-green">{storeProfile.businessName}</p>
        </div>
        <div>
          <label className="text-sm text-earth-brown">Description</label>
          <p className="text-forest-green">{storeProfile.description}</p>
        </div>
        <div>
          <label className="text-sm text-earth-brown">Category</label>
          <p className="text-forest-green">{storeProfile.category}</p>
        </div>
        <div>
          <label className="text-sm text-earth-brown">Phone</label>
          <p className="text-forest-green">{storeProfile.phone}</p>
        </div>
        <div>
          <label className="text-sm text-earth-brown">Address</label>
          <p className="text-forest-green">{storeProfile.address}</p>
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-light-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-dark-forest text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-playfair font-bold">Vendor Dashboard</h1>
              <p className="text-coconut-tan text-sm">Welcome back, {user?.name || 'Vendor'}!</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Real-time Notifications */}
              <NotificationCenter />
              
              {/* Order Notifications */}
              <OrderNotification orders={orders} />

              {/* Refresh Data Button */}
              <button 
                onClick={async () => {
                  const data = await syncVendorData(user?.id);
                  if (data) {
                    if (data.products) setProducts(data.products);
                    if (data.orders) setOrders(data.orders);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                title="Refresh data from database"
              >
                <RefreshCw className="w-5 h-5" />
                Refresh
              </button>

              <button 
                onClick={handleLogout} 
                disabled={isLoggingOut}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className={`w-5 h-5 ${isLoggingOut ? 'animate-spin' : ''}`} />
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'products', label: 'Products', icon: Package, hasNotification: products.filter(p => {
                const createdDate = new Date(p.createdAt || Date.now());
                const daysSinceCreated = (Date.now() - createdDate) / (1000 * 60 * 60 * 24);
                return daysSinceCreated <= 7; // Products created in last 7 days
              }).length > 0 },
              { id: 'orders', label: 'Orders', icon: ShoppingCart, hasNotification: orders.filter(o => o.isNew).length > 0 },
              { id: 'reports', label: 'Sales Reports', icon: BarChart3 },
              { id: 'profile', label: 'Store Profile', icon: Store },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-4 font-semibold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-dawn-orange border-dawn-orange'
                    : 'text-gray-600 border-transparent hover:text-forest-green'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                {tab.hasNotification && activeTab !== tab.id && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'reports' && renderSalesReports()}
        {activeTab === 'profile' && renderStoreProfile()}
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {showProductModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowProductModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-playfair font-bold text-forest-green">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button onClick={() => setShowProductModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Product Image Upload */}
                <div>
                  <label className="block text-earth-brown font-semibold mb-2">Product Image</label>
                  <div className="flex flex-col gap-3">
                    {/* Clickable Image Preview */}
                    <label className="cursor-pointer group">
                      <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-coconut-tan bg-gradient-to-br from-soft-white to-light-cream flex items-center justify-center hover:border-dawn-orange transition-all relative">
                        {productForm.image ? (
                          <>
                            <img 
                              src={productForm.image} 
                              alt="Product preview"
                              className="w-full h-full object-cover"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="text-center text-white">
                                <Upload className="w-12 h-12 mx-auto mb-2" />
                                <p className="text-sm font-semibold">Click to change image</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center group-hover:scale-110 transition-transform">
                            <Upload className="w-16 h-16 text-earth-brown/30 mx-auto mb-2 group-hover:text-dawn-orange transition-colors" />
                            <p className="text-sm text-earth-brown/60 group-hover:text-dawn-orange font-semibold transition-colors">Click to upload image</p>
                            <p className="text-xs text-earth-brown/40 mt-1">JPG or PNG, max 2MB</p>
                          </div>
                        )}
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleProductImageUpload}
                        className="hidden"
                      />
                    </label>
                    
                    {/* Remove Button (only show if image exists) */}
                    {productForm.image && (
                      <button
                        type="button"
                        onClick={() => setProductForm({ ...productForm, image: null })}
                        className="w-full px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-semibold flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove Image
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-earth-brown font-semibold mb-2">Product Name</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-earth-brown font-semibold mb-2">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                  >
                    <option value="">Select category</option>
                    <option value="Handicrafts">Handicrafts</option>
                    <option value="Food Products">Food Products</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-earth-brown font-semibold mb-2">Price (₱)</label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-earth-brown font-semibold mb-2">Stock</label>
                    <input
                      type="number"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-earth-brown font-semibold mb-2">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                    placeholder="Product description"
                  />
                </div>

                <button
                  onClick={handleSaveProduct}
                  className="w-full bg-dawn-orange text-white py-3 rounded-lg font-semibold hover:bg-dawn-orange/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-playfair font-bold text-forest-green">Edit Store Profile</h3>
                <button onClick={() => setShowProfileModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Store Image Upload */}
                <div>
                  <label className="block text-earth-brown font-semibold mb-2">Store Image</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-coconut-tan">
                      {storeProfile.image ? (
                        <img 
                          src={storeProfile.image} 
                          alt="Store"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-dawn-orange to-forest-green flex items-center justify-center">
                          <Store className="w-12 h-12 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="btn-organic bg-sea-blue text-white px-4 py-2 cursor-pointer inline-flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Image
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">Recommended: Square image, max 2MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-earth-brown font-semibold mb-2">Business Name</label>
                  <input
                    type="text"
                    value={storeProfile.businessName}
                    onChange={(e) => setStoreProfile({ ...storeProfile, businessName: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-earth-brown font-semibold mb-2">Description</label>
                  <textarea
                    value={storeProfile.description}
                    onChange={(e) => setStoreProfile({ ...storeProfile, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-earth-brown font-semibold mb-2">Category</label>
                  <select
                    value={storeProfile.category}
                    onChange={(e) => setStoreProfile({ ...storeProfile, category: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                  >
                    <option value="Handicrafts">Handicrafts</option>
                    <option value="Food Products">Food Products</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-earth-brown font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    value={storeProfile.phone}
                    onChange={(e) => setStoreProfile({ ...storeProfile, phone: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-earth-brown font-semibold mb-2">Address</label>
                  <textarea
                    value={storeProfile.address}
                    onChange={(e) => setStoreProfile({ ...storeProfile, address: e.target.value })}
                    rows="2"
                    className="w-full px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="w-full bg-dawn-orange text-white py-3 rounded-lg font-semibold hover:bg-dawn-orange/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Details Modal */}
      <AnimatePresence>
        {showOrderDetailsModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowOrderDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-playfair font-bold text-forest-green">
                  Order Details
                </h3>
                <button 
                  onClick={() => setShowOrderDetailsModal(false)} 
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Order ID and Status */}
                <div className="flex items-center justify-between p-4 bg-soft-white rounded-lg">
                  <div>
                    <p className="text-sm text-earth-brown">Order ID</p>
                    <p className="text-xl font-bold text-forest-green">#{selectedOrder.id}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    selectedOrder.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    selectedOrder.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    selectedOrder.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>

                {/* Customer Information */}
                <div className="border-2 border-coconut-tan rounded-lg p-4">
                  <h4 className="font-semibold text-forest-green mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Customer Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-earth-brown">Name:</span>
                      <span className="font-semibold text-forest-green">{selectedOrder.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-earth-brown">Order Date:</span>
                      <span className="font-semibold text-forest-green">{selectedOrder.date}</span>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="border-2 border-coconut-tan rounded-lg p-4">
                  <h4 className="font-semibold text-forest-green mb-3 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Product Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-earth-brown">Product:</span>
                      <span className="font-semibold text-forest-green">{selectedOrder.product}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-earth-brown">Quantity:</span>
                      <span className="font-semibold text-forest-green">{selectedOrder.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-earth-brown">Unit Price:</span>
                      <span className="font-semibold text-forest-green">
                        ₱{(selectedOrder.total / selectedOrder.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Total */}
                <div className="bg-dawn-orange/10 border-2 border-dawn-orange rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-forest-green">Total Amount:</span>
                    <span className="text-2xl font-bold text-dawn-orange">₱{selectedOrder.total}</span>
                  </div>
                </div>

                {/* Update Status */}
                <div className="border-2 border-dawn-orange/30 rounded-lg p-4 bg-dawn-orange/5">
                  <label className="block text-forest-green font-semibold mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Update Order Status
                  </label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      handleUpdateOrderStatus(selectedOrder.id, e.target.value);
                      setSelectedOrder({ ...selectedOrder, status: e.target.value });
                    }}
                    className="w-full px-4 py-3 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none text-forest-green font-semibold"
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="processing">⚙️ Processing</option>
                    <option value="shipped">📦 Shipped</option>
                    <option value="in_transit">🚚 In Transit</option>
                    <option value="delivered">✅ Delivered</option>
                    <option value="cancelled">❌ Cancelled</option>
                  </select>
                  <p className="text-xs text-earth-brown mt-2">
                    💡 Status will be updated immediately
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => setShowOrderDetailsModal(false)}
                    className="bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      exportOrderToExcel(selectedOrder, storeProfile);
                      showSuccessNotification('Exported!', 'Order exported to Excel successfully');
                    }}
                    className="bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Export Excel
                  </button>
                  <button
                    onClick={() => {
                      printOrderReceipt(selectedOrder, storeProfile);
                      showSuccessNotification('Printing!', 'Receipt sent to printer');
                    }}
                    className="bg-dawn-orange text-white py-3 rounded-lg font-semibold hover:bg-dawn-orange/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Package className="w-5 h-5" />
                    Print Receipt
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Image Cache Manager */}
      <ImageCacheManager products={products} />
    </div>
  );
};

export default VendorDashboard;
