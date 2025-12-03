# 🚀 Quick Start Guide - Aton Diya E-Palengke Bulalacao

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Laravel backend running (optional for development)

## Installation Steps

### 1. Install Dependencies
```bash
cd react-frontend
npm install
```

### 2. Environment Setup
```bash
# Copy the example environment file
cp .env.example .env

# Update the API URL if needed (default: http://localhost:8000/api)
```

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

## 🎨 What You'll See

### Landing Page
- Cinematic hero section with indigenous-inspired design
- Featured products showcase
- Local artisan spotlight
- Mission statement
- Statistics dashboard

### Available Routes
- `/` - Landing page
- `/login` - Authentication page
- `/products` - Product listing
- `/vendor/dashboard` - Vendor dashboard (requires auth)

## 🔧 Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🎨 Design Features

### Color Palette
The app uses an earth-tone palette inspired by Bulalacao's natural beauty:
- Forest Green (#1B4D3E) - Mountains and forests
- Earth Brown (#5A3A22) - Soil and wood
- Coconut Tan (#D9B48F) - Local materials
- Dawn Orange (#E2953A) - Sunrise over the sea
- Sea Blue (#3F8EAA) - Coastal waters

### Custom Components
All components follow the indigenous-inspired design:
- Woven basket-style cards
- Tribal icon wrappers
- Organic button shapes
- Wooden frame effects
- Pattern overlays

## 🔐 Authentication Flow

1. User visits `/login`
2. Enters credentials
3. System authenticates via Laravel Sanctum
4. Redirects based on role:
   - Admin → `/admin/dashboard`
   - Vendor → `/vendor/dashboard`
   - Customer → `/customer/dashboard`

## 📦 Key Dependencies

- **react** & **react-dom** - UI framework
- **react-router-dom** - Routing
- **framer-motion** - Animations
- **lucide-react** - Icons
- **axios** - API calls
- **react-leaflet** - Maps
- **recharts** - Analytics charts
- **tailwindcss** - Styling

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.js or kill the process
npx kill-port 3000
```

### API Connection Issues
- Ensure Laravel backend is running on port 8000
- Check CORS configuration in Laravel
- Verify `VITE_API_URL` in `.env`

### Styling Not Loading
```bash
# Rebuild Tailwind
npm run dev
```

## 📱 Testing on Mobile

```bash
# Get your local IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# Access from mobile device
http://YOUR_IP:3000
```

## 🎯 Next Steps

1. ✅ Frontend is ready
2. 🔄 Connect to Laravel backend
3. 🔐 Set up authentication
4. 📦 Add product data
5. 🗺 Configure map API keys
6. 💳 Integrate payment gateway

## 💡 Tips

- Use the browser DevTools to inspect animations
- Check the Network tab for API calls
- Responsive design works best on Chrome/Firefox
- Framer Motion animations can be disabled for testing

## 🆘 Need Help?

- Check `PROJECT_OVERVIEW.md` for detailed documentation
- Review component files in `src/components/`
- Inspect `src/styles/global.css` for custom styles
- Look at `tailwind.config.js` for theme configuration

---

**Mabuhay ang Bulalacao! 🇵🇭**
