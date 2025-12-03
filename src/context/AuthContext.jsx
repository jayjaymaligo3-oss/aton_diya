import { createContext, useContext, useState, useEffect } from 'react';
import api, { getCsrfCookie } from '../services/api';
import dataService from '../services/dataService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const authenticated = localStorage.getItem('authenticated');
      const token = localStorage.getItem('token');
      
      // If authenticated with token, try to get user from database first
      if (authenticated && token) {
        try {
          console.log('🔍 Checking auth from database...');
          const response = await api.get('/user');
          console.log('✅ User from database:', response.data);
          console.log('📋 Role:', response.data.role);
          
          // Clear any demo data
          localStorage.removeItem('demoUser');
          
          setUser(response.data);
          return;
        } catch (error) {
          console.warn('⚠️ Database auth failed, checking demo mode');
          // If database fails, check demo mode
        }
      }
      
      // Fallback to demo mode
      const demoUser = localStorage.getItem('demoUser');
      if (demoUser) {
        console.log('📦 Using demo mode');
        setUser(JSON.parse(demoUser));
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('authenticated');
      localStorage.removeItem('token');
      localStorage.removeItem('demoUser');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const saveUserToGlobalUsers = (user) => {
    // Save to global_users for admin dashboard
    const globalUsers = JSON.parse(localStorage.getItem('global_users') || '[]');
    const existingIndex = globalUsers.findIndex(u => u.email === user.email);
    
    const userWithTimestamp = {
      ...user,
      lastLogin: new Date().toISOString(),
      createdAt: user.createdAt || new Date().toISOString(),
      orders: user.orders || 0,
      status: user.status || 'active'
    };
    
    if (existingIndex >= 0) {
      // Update existing user
      globalUsers[existingIndex] = { ...globalUsers[existingIndex], ...userWithTimestamp };
    } else {
      // Add new user
      globalUsers.push(userWithTimestamp);
    }
    
    localStorage.setItem('global_users', JSON.stringify(globalUsers));
    console.log('✅ User saved to global_users:', user.email);
    
    // Also sync to database
    syncUserToDatabase(userWithTimestamp);
  };

  const syncUserToDatabase = async (user) => {
    // Disabled for now - using localStorage only
    // try {
    //   await api.post('/admin/users/sync', { user });
    //   console.log('✅ User synced to database:', user.email);
    // } catch (error) {
    //   console.warn('⚠️ Failed to sync user to database:', error.message);
    // }
  };

  const login = async (credentials) => {
    try {
      // Try Laravel backend first
      console.log('🔐 Logging in to database:', credentials.email);
      
      // Get CSRF cookie first for stateful authentication
      try {
        await getCsrfCookie();
      } catch (csrfError) {
        console.warn('⚠️ CSRF cookie fetch failed, continuing with token auth');
      }
      
      // Attempt login
      const response = await api.post('/login', credentials);
      
      console.log('✅ Login successful from database:', response.data.user);
      console.log('📋 User role:', response.data.user.role);
      console.log('🏪 Business name:', response.data.user.business_name);
      
      // Clear any old demo/localStorage data first
      localStorage.removeItem('demoUser');
      localStorage.removeItem('registeredUsers');
      
      // Store token for API authentication
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      localStorage.setItem('authenticated', 'true');
      
      // Save to global users (for admin dashboard)
      saveUserToGlobalUsers(response.data.user);
      
      // Set user from database (this is the source of truth)
      setUser(response.data.user);
      
      // Sync data from database based on user role
      console.log('🔄 Syncing data for user role:', response.data.user.role);
      dataService.syncAllData(response.data.user.role).catch(err => {
        console.warn('⚠️ Data sync failed:', err.message);
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Login failed:', error);
      // Check if it's a pending vendor error
      if (error.response?.status === 403 && error.response?.data?.status === 'pending') {
        throw error;
      }

      // Fallback to demo mode if backend is not available
      console.warn('Backend not available, using demo mode');
      
      // Check for admin credentials (case-insensitive)
      const emailLower = credentials.email.toLowerCase();
      if ((emailLower === 'admin@gmail.com' || emailLower === 'admin@example.com') && 
          (credentials.password === 'Admin123456789' || credentials.password === 'password' || credentials.password === 'admin123')) {
        const adminUser = {
          id: 'admin-001',
          name: 'Administrator',
          email: credentials.email,
          role: 'admin',
          status: 'active'
        };
        localStorage.setItem('demoUser', JSON.stringify(adminUser));
        localStorage.setItem('token', 'admin-token-' + Date.now());
        saveUserToGlobalUsers(adminUser);
        setUser(adminUser);
        return { user: adminUser, token: 'admin-token' };
      }

      // Check for demo vendor credentials (with sample data)
      if (credentials.email === 'vendor@demo.com' && credentials.password === 'vendor123') {
        const vendorUser = {
          id: 'vendor-demo-001',
          name: 'Demo Vendor',
          email: 'vendor@demo.com',
          role: 'vendor',
          vendor_status: 'approved',
          status: 'active',
          business_name: 'Indigenous Crafts Store',
          business_description: 'Authentic handmade indigenous products from local artisans',
          category: 'Handicrafts',
          phone: '+63 912 345 6789',
          address: 'Davao City, Philippines',
          orders: 15,
          createdAt: new Date('2024-01-10').toISOString()
        };
        localStorage.setItem('demoUser', JSON.stringify(vendorUser));
        localStorage.setItem('token', 'vendor-token-' + Date.now());
        saveUserToGlobalUsers(vendorUser);
        setUser(vendorUser);
        return { user: vendorUser, token: 'vendor-token' };
      }

      // Check for NACBA vendor account
      if (credentials.email === 'nacba@gmail.com' && credentials.password === 'nacba123456789') {
        const nacbaUser = {
          id: 919,
          name: 'Nacba Vendor',
          email: 'nacba@gmail.com',
          role: 'vendor',
          vendor_status: 'approved',
          status: 'active',
          phone: '+63 917 123 4567',
          address: 'Bulalacao, Oriental Mindoro',
          business_name: 'NACBA Indigenous Crafts',
          businessName: 'NACBA Indigenous Crafts',
          business_description: 'Quality handmade indigenous products from local artisans in Oriental Mindoro',
          businessDescription: 'Quality handmade indigenous products from local artisans in Oriental Mindoro',
          category: 'Handicrafts',
          orders: 4,
          createdAt: new Date('2024-01-10').toISOString()
        };
        localStorage.setItem('demoUser', JSON.stringify(nacbaUser));
        localStorage.setItem('token', 'nacba-token-' + Date.now());
        saveUserToGlobalUsers(nacbaUser);
        setUser(nacbaUser);
        return { user: nacbaUser, token: 'nacba-token' };
      }

      // Check for demo customer credentials (with sample data)
      if (credentials.email === 'customer@demo.com' && credentials.password === 'customer123') {
        const customerUser = {
          id: 'customer-demo-001',
          name: 'Demo Customer',
          email: 'customer@demo.com',
          role: 'customer',
          status: 'active',
          phone: '+63 923 456 7890',
          address: 'Manila, Philippines',
          orders: 8,
          createdAt: new Date('2024-02-15').toISOString()
        };
        localStorage.setItem('demoUser', JSON.stringify(customerUser));
        localStorage.setItem('token', 'customer-token-' + Date.now());
        saveUserToGlobalUsers(customerUser);
        setUser(customerUser);
        return { user: customerUser, token: 'customer-token' };
      }

      // Check if user exists in localStorage (from previous registration)
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = existingUsers.find(u => u.email === credentials.email);
      
      if (existingUser) {
        // Verify password (simple check for demo mode)
        // In demo mode, we accept any password or check if stored password matches
        const passwordMatch = !existingUser.password || existingUser.password === credentials.password;
        
        if (passwordMatch) {
          // User found and password matches - use their stored data with preserved role
          console.log('✅ Found registered user:', existingUser.email, 'Role:', existingUser.role);
          localStorage.setItem('demoUser', JSON.stringify(existingUser));
          localStorage.setItem('token', 'demo-token-' + Date.now());
          saveUserToGlobalUsers(existingUser);
          setUser(existingUser);
          return { user: existingUser, token: 'demo-token' };
        } else {
          // Password doesn't match
          throw new Error('Invalid credentials');
        }
      }
      
      // If no existing user found, throw error instead of creating new customer
      throw new Error('User not found. Please register first.');
    }
  };

  const register = async (userData) => {
    try {
      // Try Laravel backend first
      console.log('📝 Registering user to database:', userData.email);
      const response = await api.post('/register', userData);
      
      console.log('✅ User registered to database:', response.data);
      
      // Store token if provided
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      // Save to global users (for admin dashboard)
      saveUserToGlobalUsers(response.data.user);
      
      if (response.data.requires_approval) {
        // Vendor pending approval - don't set user
        console.log('⏳ Vendor pending approval');
        return response.data;
      }
      
      localStorage.setItem('authenticated', 'true');
      localStorage.removeItem('demoUser'); // Clear demo mode
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error('❌ Registration failed:', error);
      // Fallback to demo mode if backend is not available
      console.warn('Backend not available, using demo mode');
      const demoUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        role: userData.role || 'customer',
        vendor_status: userData.role === 'vendor' ? 'pending' : 'approved',
        status: 'active',
        business_name: userData.business_name,
        business_description: userData.business_description,
        category: userData.category,
        password: userData.password, // Store password for demo mode login verification
        orders: 0,
        joinDate: new Date().toLocaleDateString(),
        createdAt: new Date().toISOString()
      };
      
      console.log('📝 Registering demo user:', demoUser.email, 'as', demoUser.role);
      
      // Store all registered users for future logins
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      // Check if user already exists
      const existingIndex = registeredUsers.findIndex(u => u.email === demoUser.email);
      if (existingIndex >= 0) {
        // Update existing user but preserve their role
        registeredUsers[existingIndex] = { ...registeredUsers[existingIndex], ...demoUser };
        console.log('✅ Updated existing user:', demoUser.email);
      } else {
        // Add new user
        registeredUsers.push(demoUser);
        console.log('✅ Added new user:', demoUser.email);
      }
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      // Save to global users for admin dashboard
      saveUserToGlobalUsers(demoUser);
      
      // Store vendor applications for demo mode
      if (userData.role === 'vendor') {
        const applications = JSON.parse(localStorage.getItem('vendorApplications') || '[]');
        applications.push({
          ...demoUser,
          appliedAt: new Date().toISOString(),
        });
        localStorage.setItem('vendorApplications', JSON.stringify(applications));
        
        // Also save to global_vendors
        const globalVendors = JSON.parse(localStorage.getItem('global_vendors') || '[]');
        globalVendors.push({
          id: demoUser.id,
          userId: demoUser.id,
          businessName: demoUser.business_name,
          businessDescription: demoUser.business_description,
          category: demoUser.category,
          phone: demoUser.phone,
          address: demoUser.address,
          status: 'pending',
          createdAt: demoUser.createdAt
        });
        localStorage.setItem('global_vendors', JSON.stringify(globalVendors));
      }
      
      localStorage.setItem('demoUser', JSON.stringify(demoUser));
      localStorage.setItem('token', 'demo-token-' + Date.now());
      setUser(demoUser);
      return { user: demoUser, token: 'demo-token', requires_approval: userData.role === 'vendor' };
    }
  };

  const logout = async () => {
    // Check if demo mode
    const isDemoMode = localStorage.getItem('demoUser');
    
    // Start loading bar
    const loadingBar = document.getElementById('loading-bar');
    if (loadingBar) {
      loadingBar.style.width = '0%';
      loadingBar.classList.remove('hidden');
      loadingBar.style.width = '30%';
    }

    // Clear data immediately for instant response
    localStorage.removeItem('authenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('demoUser');
    
    // Set logout flag for security
    sessionStorage.setItem('loggedOut', 'true');
    sessionStorage.setItem('logoutTime', Date.now().toString());
    
    setUser(null);

    // Only try API call if not in demo mode
    if (!isDemoMode) {
      try {
        // Progress to 60%
        if (loadingBar) loadingBar.style.width = '60%';
        
        // Set a short timeout for API call
        await Promise.race([
          api.post('/logout'),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 1000))
        ]);
        
        // Progress to 90%
        if (loadingBar) loadingBar.style.width = '90%';
      } catch (error) {
        // Silently handle logout error
        // console.warn('Logout error:', error);
      }
    }
    
    // Complete loading bar
    if (loadingBar) {
      loadingBar.style.width = '100%';
      setTimeout(() => {
        loadingBar.classList.add('hidden');
        loadingBar.style.width = '0%';
      }, 200);
    }
    
    // Clear browser history to prevent back button
    window.history.pushState(null, '', '/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
