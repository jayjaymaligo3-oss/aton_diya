# User Role Persistence Fix

## Problem

Pag nag-register ng vendor account, tapos nag-logout, then nag-login ulit using the same account, nag-switch to **customer** role instead of staying as **vendor**.

### Example:
```
1. Register as vendor (email: vendor@example.com, role: vendor)
2. Logout
3. Login again (email: vendor@example.com)
4. ❌ Redirected to Customer Dashboard instead of Vendor Dashboard
```

## Root Cause

Sa `AuthContext.jsx` login function, pag hindi match ang specific test credentials, nag-create ng "generic demo user" na laging **customer** role:

```javascript
// OLD CODE (WRONG)
const demoUser = {
  id: Date.now(),
  name: credentials.email.split('@')[0],
  email: credentials.email,
  role: 'customer'  // ❌ Always customer!
};
```

Hindi niya chineck kung may existing user data from registration.

## Solution

### 1. Store All Registered Users

Sa register function, i-save lahat ng registered users sa localStorage:

```javascript
// Store all registered users for future logins
const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

// Check if user already exists
const existingIndex = registeredUsers.findIndex(u => u.email === demoUser.email);
if (existingIndex >= 0) {
  // Update existing user
  registeredUsers[existingIndex] = demoUser;
} else {
  // Add new user
  registeredUsers.push(demoUser);
}

localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
```

### 2. Check Existing Users on Login

Sa login function, i-check muna kung may existing user:

```javascript
// Check if user exists in localStorage (from previous registration)
const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
const existingUser = existingUsers.find(u => u.email === credentials.email);

if (existingUser) {
  // User found - use their stored data (with correct role!)
  localStorage.setItem('demoUser', JSON.stringify(existingUser));
  localStorage.setItem('token', 'demo-token-' + Date.now());
  setUser(existingUser);
  return { user: existingUser, token: 'demo-token' };
}

// Only create generic customer if user doesn't exist
const demoUser = {
  id: Date.now(),
  name: credentials.email.split('@')[0],
  email: credentials.email,
  role: 'customer'
};
```

## How It Works Now

### Registration Flow:
```
1. User registers as vendor
   ↓
2. Create user object with role: 'vendor'
   ↓
3. Save to registeredUsers array in localStorage
   ↓
4. Save to demoUser for current session
```

### Login Flow:
```
1. User enters credentials
   ↓
2. Check registeredUsers array
   ↓
3. Found? Use stored data (with correct role)
   ↓
4. Not found? Create new customer user
```

## localStorage Structure

### registeredUsers (Array)
```json
[
  {
    "id": 1234567890,
    "name": "Vendor Name",
    "email": "vendor@example.com",
    "role": "vendor",
    "vendor_status": "pending",
    "business_name": "My Store",
    "business_description": "...",
    "category": "Handicrafts",
    "phone": "...",
    "address": "..."
  },
  {
    "id": 1234567891,
    "name": "Customer Name",
    "email": "customer@example.com",
    "role": "customer",
    "phone": "...",
    "address": "..."
  }
]
```

### demoUser (Current Session)
```json
{
  "id": 1234567890,
  "name": "Vendor Name",
  "email": "vendor@example.com",
  "role": "vendor",
  ...
}
```

## Testing

### Test Case 1: Vendor Registration & Login
```
1. Register as vendor
   - Email: testvendor@example.com
   - Role: vendor
   
2. Logout

3. Login again
   - Email: testvendor@example.com
   
4. ✅ Should redirect to Vendor Dashboard
5. ✅ Role should be 'vendor'
```

### Test Case 2: Customer Registration & Login
```
1. Register as customer
   - Email: testcustomer@example.com
   - Role: customer
   
2. Logout

3. Login again
   - Email: testcustomer@example.com
   
4. ✅ Should redirect to Customer Dashboard
5. ✅ Role should be 'customer'
```

### Test Case 3: Multiple Users
```
1. Register vendor1@example.com (vendor)
2. Logout
3. Register customer1@example.com (customer)
4. Logout
5. Login as vendor1@example.com
   ✅ Should be vendor
6. Logout
7. Login as customer1@example.com
   ✅ Should be customer
```

## Verification

### Check registeredUsers in localStorage:
```javascript
// Open browser console (F12)
JSON.parse(localStorage.getItem('registeredUsers'))
```

Should show array of all registered users with their roles.

### Check current user:
```javascript
JSON.parse(localStorage.getItem('demoUser'))
```

Should show current logged-in user with correct role.

## Benefits

### ✅ Role Persistence
- Vendor stays vendor
- Customer stays customer
- Admin stays admin

### ✅ Multiple Users
- Can register multiple accounts
- Each keeps their own role
- No conflicts

### ✅ Consistent Experience
- Same role after logout/login
- Correct dashboard redirect
- No confusion

## Edge Cases Handled

### 1. User Updates Profile
```javascript
// Update existing user in registeredUsers
const existingIndex = registeredUsers.findIndex(u => u.email === demoUser.email);
if (existingIndex >= 0) {
  registeredUsers[existingIndex] = demoUser;
}
```

### 2. New User (No Registration)
```javascript
// Create generic customer user
const demoUser = {
  role: 'customer'  // Default for new users
};
```

### 3. Test Credentials
```javascript
// Hardcoded test accounts still work
if (credentials.email === 'vendor@test.com') {
  // Use test vendor account
}
```

## Migration from Old System

If you have existing users in old format:

```javascript
// Run once in browser console
const oldDemoUser = JSON.parse(localStorage.getItem('demoUser'));
if (oldDemoUser) {
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  if (!registeredUsers.find(u => u.email === oldDemoUser.email)) {
    registeredUsers.push(oldDemoUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }
}
```

## Summary

### Before (Bug):
```
Register as vendor → Logout → Login → ❌ Becomes customer
```

### After (Fixed):
```
Register as vendor → Logout → Login → ✅ Still vendor
```

### Key Changes:
1. ✅ Store all registered users in `registeredUsers` array
2. ✅ Check existing users on login
3. ✅ Use stored role instead of defaulting to customer
4. ✅ Support multiple users with different roles

**Role persistence is now working correctly!** 🎉

### Test It:
1. Register a vendor account
2. Logout
3. Login with same credentials
4. Should go to Vendor Dashboard ✅
