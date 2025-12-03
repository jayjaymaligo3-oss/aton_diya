# Demo Mode - Authentication Without Backend

## Overview
Ang application ay may built-in demo mode na gumagana kahit walang backend server. Automatic na mag-switch sa demo mode kung hindi available ang backend.

## Features

### 1. Demo Registration
- Pag nag-register, automatic na gumawa ng demo user
- Saved sa localStorage
- May complete user data (name, email, role, etc.)

### 2. Demo Login
- Kahit anong email/password, mag-login ka
- Automatic na gumawa ng demo user based sa email
- Default role: customer

### 3. Role-Based Access
- **Customer Role**: Access to `/customer/dashboard`
- **Vendor Role**: Access to `/vendor/dashboard`
- Automatic redirect kung wrong role

## How to Use

### Register as Customer
1. Go to http://localhost:3001/register
2. Select "Customer" role
3. Fill in the form
4. Click "Create Customer Account"
5. Automatic redirect to `/customer/dashboard`

### Register as Vendor
1. Go to http://localhost:3001/register?role=vendor
2. Select "Vendor" role
3. Fill in the form (including business details)
4. Click "Create Vendor Account"
5. Automatic redirect to `/vendor/dashboard`

### Login (Demo Mode)
1. Go to http://localhost:3001/login
2. Enter any email (e.g., test@example.com)
3. Enter any password
4. Click "Login"
5. Automatic redirect based on role

## Demo Users in LocalStorage

### Customer Demo User
```json
{
  "id": 1234567890,
  "name": "Juan Dela Cruz",
  "email": "juan@example.com",
  "phone": "09123456789",
  "address": "Bulalacao, Oriental Mindoro",
  "role": "customer"
}
```

### Vendor Demo User
```json
{
  "id": 1234567890,
  "name": "Maria Santos",
  "email": "maria@example.com",
  "phone": "09123456789",
  "address": "Bulalacao, Oriental Mindoro",
  "role": "vendor",
  "businessName": "Maria's Handicrafts",
  "businessDescription": "Traditional woven products"
}
```

## Testing Steps

### Test 1: Register as Customer
```
1. Go to /register
2. Fill in form with customer details
3. Submit
4. Should redirect to /customer/dashboard
5. Should see customer dashboard
```

### Test 2: Register as Vendor
```
1. Go to /register?role=vendor
2. Fill in form with vendor details
3. Submit
4. Should redirect to /vendor/dashboard
5. Should see vendor dashboard
```

### Test 3: Login and Access Dashboard
```
1. Logout (if logged in)
2. Go to /login
3. Enter any credentials
4. Should redirect to appropriate dashboard
```

### Test 4: Protected Routes
```
1. Logout
2. Try to access /customer/dashboard
3. Should redirect to /login
4. After login, should return to /customer/dashboard
```

### Test 5: Role-Based Access
```
1. Login as customer
2. Try to access /vendor/dashboard
3. Should redirect to /customer/dashboard
```

## Clear Demo Data

To reset demo mode:
```javascript
// Open browser console (F12)
localStorage.removeItem('demoUser');
localStorage.removeItem('token');
location.reload();
```

## Backend Integration

Kapag available na ang backend:
- Automatic na mag-switch from demo mode to real backend
- Same API calls, walang code changes needed
- Demo mode is fallback only

## Files Modified

1. `react-frontend/src/context/AuthContext.jsx` - Added demo mode fallback
2. `react-frontend/src/pages/RegisterPage.jsx` - Integrated with AuthContext
3. `react-frontend/src/components/ProtectedRoute.jsx` - Role-based protection
4. `react-frontend/src/App.jsx` - Protected dashboard routes

## Notes

- Demo mode uses localStorage for persistence
- Data is saved per browser
- Clearing browser data will reset demo users
- Perfect for testing and development
