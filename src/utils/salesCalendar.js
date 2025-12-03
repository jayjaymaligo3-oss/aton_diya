// Sales Calendar - Automatic discounts based on dates
// Format: month.day (e.g., 11.11, 12.12)

export const SALES_CALENDAR = {
  // January - New Year Sale
  '1.1': {
    name: 'New Year Sale',
    discount: 20,
    emoji: '🎊',
    color: 'bg-blue-500',
    description: 'Start the year with amazing deals!'
  },
  
  // February - Valentine's Day
  '2.14': {
    name: 'Valentine\'s Day Sale',
    discount: 14,
    emoji: '💝',
    color: 'bg-pink-500',
    description: 'Love is in the air! Special discounts on gifts'
  },
  
  // March - Women's Day
  '3.8': {
    name: 'Women\'s Day Sale',
    discount: 15,
    emoji: '👩',
    color: 'bg-purple-500',
    description: 'Celebrating women with special offers'
  },
  
  // April - Summer Sale
  '4.4': {
    name: 'Summer Kickoff Sale',
    discount: 10,
    emoji: '☀️',
    color: 'bg-yellow-500',
    description: 'Welcome summer with hot deals!'
  },
  
  // May - Labor Day Sale
  '5.1': {
    name: 'Labor Day Sale',
    discount: 15,
    emoji: '💪',
    color: 'bg-orange-500',
    description: 'Honoring workers with great discounts'
  },
  '5.5': {
    name: '5.5 Flash Sale',
    discount: 25,
    emoji: '⚡',
    color: 'bg-red-500',
    description: 'Flash sale extravaganza!'
  },
  
  // June - Independence Day
  '6.12': {
    name: 'Independence Day Sale',
    discount: 20,
    emoji: '🇵🇭',
    color: 'bg-blue-600',
    description: 'Celebrate Philippine Independence!'
  },
  
  // July - Mid-Year Sale
  '7.7': {
    name: '7.7 Mid-Year Sale',
    discount: 30,
    emoji: '🎯',
    color: 'bg-green-500',
    description: 'Biggest mid-year deals!'
  },
  
  // August - Back to School
  '8.8': {
    name: '8.8 Mega Sale',
    discount: 35,
    emoji: '🛍️',
    color: 'bg-indigo-500',
    description: 'Back to school mega savings!'
  },
  
  // September - Harvest Festival
  '9.9': {
    name: '9.9 Super Sale',
    discount: 40,
    emoji: '🎉',
    color: 'bg-yellow-600',
    description: 'Super shopping festival!'
  },
  
  // October - Halloween Sale
  '10.10': {
    name: '10.10 Flash Sale',
    discount: 35,
    emoji: '🎃',
    color: 'bg-orange-600',
    description: 'Spooktacular savings!'
  },
  
  // November - 11.11 (Biggest Sale)
  '11.11': {
    name: '11.11 Mega Sale',
    discount: 50,
    emoji: '🔥',
    color: 'bg-red-600',
    description: 'BIGGEST SALE OF THE YEAR!'
  },
  
  // December - Christmas & Year End
  '12.12': {
    name: '12.12 Year-End Sale',
    discount: 45,
    emoji: '🎄',
    color: 'bg-green-600',
    description: 'Grand year-end celebration!'
  },
  '12.25': {
    name: 'Christmas Sale',
    discount: 25,
    emoji: '🎅',
    color: 'bg-red-500',
    description: 'Merry Christmas special offers!'
  }
};

// Get current active sale
export const getCurrentSale = () => {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();
  const key = `${month}.${day}`;
  
  return SALES_CALENDAR[key] || null;
};

// Check if today has a sale
export const hasSaleToday = () => {
  return getCurrentSale() !== null;
};

// Get upcoming sales (next 3)
export const getUpcomingSales = () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();
  
  const upcoming = [];
  
  Object.entries(SALES_CALENDAR).forEach(([key, sale]) => {
    const [month, day] = key.split('.').map(Number);
    
    // Calculate days until sale
    const saleDate = new Date(now.getFullYear(), month - 1, day);
    if (saleDate < now) {
      saleDate.setFullYear(now.getFullYear() + 1);
    }
    
    const daysUntil = Math.ceil((saleDate - now) / (1000 * 60 * 60 * 24));
    
    upcoming.push({
      ...sale,
      date: key,
      daysUntil,
      fullDate: saleDate
    });
  });
  
  return upcoming
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 3);
};

// Apply discount to price
export const applyDiscount = (price, discountPercent) => {
  const discount = (price * discountPercent) / 100;
  return {
    originalPrice: price,
    discount: discount,
    finalPrice: price - discount,
    savings: discount,
    discountPercent: discountPercent
  };
};

// Calculate sale price for product
export const getSalePrice = (product) => {
  const sale = getCurrentSale();
  if (!sale) {
    return {
      hasDiscount: false,
      originalPrice: product.price,
      finalPrice: product.price
    };
  }
  
  const result = applyDiscount(product.price, sale.discount);
  return {
    hasDiscount: true,
    saleName: sale.name,
    saleEmoji: sale.emoji,
    ...result
  };
};

// Format price with peso sign
export const formatPrice = (price) => {
  return `₱${parseFloat(price).toFixed(2)}`;
};

// Get sale badge color
export const getSaleBadgeColor = (discount) => {
  if (discount >= 40) return 'bg-red-600';
  if (discount >= 30) return 'bg-orange-600';
  if (discount >= 20) return 'bg-yellow-600';
  return 'bg-green-600';
};

// Check if sale is happening in date range (for testing)
export const getSaleForDate = (month, day) => {
  const key = `${month}.${day}`;
  return SALES_CALENDAR[key] || null;
};

// Get all sales for a specific month
export const getSalesForMonth = (month) => {
  return Object.entries(SALES_CALENDAR)
    .filter(([key]) => key.startsWith(`${month}.`))
    .map(([key, sale]) => ({
      date: key,
      ...sale
    }));
};

// Get countdown to next sale
export const getCountdownToNextSale = () => {
  const upcoming = getUpcomingSales();
  if (upcoming.length === 0) return null;
  
  const nextSale = upcoming[0];
  const now = new Date();
  const diff = nextSale.fullDate - now;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return {
    sale: nextSale,
    countdown: {
      days,
      hours,
      minutes,
      total: diff
    }
  };
};

export default {
  SALES_CALENDAR,
  getCurrentSale,
  hasSaleToday,
  getUpcomingSales,
  applyDiscount,
  getSalePrice,
  formatPrice,
  getSaleBadgeColor,
  getSaleForDate,
  getSalesForMonth,
  getCountdownToNextSale
};
