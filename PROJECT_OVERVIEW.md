# Aton Diya E-Palengke Bulalacao

## A Digital Marketplace for Indigenous and Local Products of Bulalacao, Oriental Mindoro

### 🎨 Design Philosophy

This platform celebrates the rich cultural heritage of Bulalacao through:

- **Earth-tone Color Palette**: Deep forest greens, earth browns, coconut tans, dawn oranges, and sea blues
- **Indigenous Patterns**: Woven textile patterns and wood-carved panel accents
- **Cinematic Transitions**: Smooth fade-ins, parallax scrolling, and gentle animations
- **Cultural Authenticity**: Respectful representation of local artisans and their crafts

### 🛠 Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS with custom indigenous-inspired design system
- **Animations**: Framer Motion for cinematic transitions
- **Icons**: Lucide React
- **Maps**: React Leaflet for delivery tracking
- **Charts**: Recharts for sales analytics
- **Routing**: React Router DOM
- **API**: Axios with Laravel Sanctum authentication

### 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── HeroSection.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   └── DeliveryMap.jsx
├── pages/              # Page components
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── ProductsPage.jsx
│   └── VendorDashboard.jsx
├── context/            # React Context providers
│   └── AuthContext.jsx
├── services/           # API services
│   └── api.js
├── styles/             # Global styles
│   └── global.css
└── App.jsx            # Main app component
```

### 🎨 Custom Design System

#### Colors
- `forest-green`: #1B4D3E
- `earth-brown`: #5A3A22
- `coconut-tan`: #D9B48F
- `dawn-orange`: #E2953A
- `sea-blue`: #3F8EAA
- `light-cream`: #F5F1E8
- `dark-forest`: #0F2922
- `warm-gold`: #C9A961
- `soft-white`: #FDFBF7

#### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Accent**: Poppins (sans-serif)

#### Custom Components
- `.basket-card` - Product cards with woven basket styling
- `.tribal-icon` - Circular icons with indigenous patterns
- `.btn-organic` - Buttons with organic shapes and ripple effects
- `.wooden-frame` - Frames with wood texture borders
- `.pattern-overlay` - Indigenous woven pattern backgrounds

### 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Update `VITE_API_URL` with your Laravel backend URL

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   App will run on http://localhost:3000

4. **Build for Production**
   ```bash
   npm run build
   ```

### 🔐 Authentication

The app uses Laravel Sanctum for authentication:
- Session-based SPA authentication
- CSRF protection
- HttpOnly cookies
- Role-based access control (Admin, Vendor, Customer)

### 📦 Key Features

#### For Customers
- Browse indigenous products
- Search and filter by category
- Add to cart and wishlist
- Track delivery in real-time
- View artisan profiles

#### For Vendors
- Product management dashboard
- Sales analytics and reports
- Order management
- Inventory tracking
- Revenue insights

#### For Admins
- User management
- Vendor approval
- Platform analytics
- Content moderation
- System configuration

### 🗺 Delivery Tracking

Real-time map-based delivery tracking using React Leaflet:
- Vendor location marker
- Current delivery position
- Customer delivery address
- Animated route visualization
- ETA and distance calculation

### 📊 Analytics

Sales analytics powered by Recharts:
- Revenue trends
- Product performance
- Customer insights
- Vendor statistics

### 🎭 Animation Features

Powered by Framer Motion:
- Cinematic page transitions
- Smooth scroll animations
- Gentle floating effects
- Hover interactions
- Loading states

### 🌐 API Integration

All API calls go through the centralized `api.js` service:
- Automatic token management
- Request/response interceptors
- Error handling
- CSRF token handling

### 📱 Responsive Design

Fully responsive across all devices:
- Mobile-first approach
- Tablet optimizations
- Desktop enhancements
- Touch-friendly interactions

### 🎯 Future Enhancements

- [ ] Payment gateway integration
- [ ] Multi-language support (Tagalog/English)
- [ ] Push notifications
- [ ] Social media integration
- [ ] Advanced search with filters
- [ ] Product reviews and ratings
- [ ] Vendor messaging system
- [ ] Promotional campaigns

### 🤝 Contributing

This platform aims to support and empower the local artisans of Bulalacao. 
All contributions should respect and celebrate the indigenous culture and heritage.

### 📄 License

© 2024 Aton Diya E-Palengke Bulalacao. All rights reserved.
