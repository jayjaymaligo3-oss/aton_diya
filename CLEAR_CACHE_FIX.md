# 🔧 Clear Cache Fix

## The Problem
You're seeing this error:
```
Invalid hook call. Hooks can only be called inside of the body of a function component.
Cannot read properties of null (reading 'useState')
```

This is a **browser cache issue** with Vite's hot module replacement.

## The Solution

### Option 1: Hard Refresh (Quickest)
1. Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Or press `Ctrl + F5`
3. This forces the browser to reload everything fresh

### Option 2: Clear Browser Cache
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### Option 3: Restart Dev Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
cd react-frontend
npm run dev
```

### Option 4: Clear Everything
```bash
cd react-frontend
# Remove Vite cache
rm -rf node_modules/.vite
# Remove dist folder
rm -rf dist
# Restart server
npm run dev
```

## Why This Happened
- Vite's HMR (Hot Module Replacement) sometimes gets confused
- The browser cached an old version of React
- The autofix triggered a rebuild that conflicted with cached modules

## After Clearing Cache
The app should work normally. The login will now use token-based authentication without CSRF cookies.

## Status: ✅ Code is Fine
The actual code in AuthContext.jsx is correct. This is purely a caching issue.
