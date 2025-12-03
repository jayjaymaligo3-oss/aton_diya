import api from '../services/api';

/**
 * Sync localStorage users to database
 * This is useful when users were registered in demo mode (offline)
 * and need to be synced to the database when backend becomes available
 */
export const syncUsersToDatabase = async () => {
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  
  if (registeredUsers.length === 0) {
    console.log('No users to sync');
    return { success: true, synced: 0, failed: 0 };
  }

  console.log(`🔄 Syncing ${registeredUsers.length} users to database...`);
  
  let synced = 0;
  let failed = 0;
  const results = [];

  for (const user of registeredUsers) {
    try {
      // Check if user already exists in database
      const checkResponse = await api.post('/login', {
        email: user.email,
        password: user.password
      });
      
      // If login succeeds, user already exists in database
      console.log(`✅ User ${user.email} already in database`);
      synced++;
      results.push({ email: user.email, status: 'already_exists' });
      
    } catch (loginError) {
      // User doesn't exist or password wrong, try to register
      try {
        const registerData = {
          name: user.name,
          email: user.email,
          password: user.password,
          password_confirmation: user.password,
          role: user.role || 'customer',
          phone: user.phone,
          address: user.address,
          business_name: user.business_name,
          business_description: user.business_description,
          category: user.category
        };

        await api.post('/register', registerData);
        console.log(`✅ Synced ${user.email} to database`);
        synced++;
        results.push({ email: user.email, status: 'synced' });
        
      } catch (registerError) {
        console.error(`❌ Failed to sync ${user.email}:`, registerError.response?.data?.message || registerError.message);
        failed++;
        results.push({ 
          email: user.email, 
          status: 'failed',
          error: registerError.response?.data?.message || registerError.message
        });
      }
    }
  }

  console.log(`\n📊 Sync complete: ${synced} synced, ${failed} failed`);
  
  return {
    success: failed === 0,
    synced,
    failed,
    results
  };
};

/**
 * Check if backend is available
 */
export const checkBackendStatus = async () => {
  try {
    await api.get('/user');
    return true;
  } catch (error) {
    if (error.response) {
      // Backend is available but returned an error (e.g., 401 Unauthorized)
      return true;
    }
    // Network error - backend not available
    return false;
  }
};
