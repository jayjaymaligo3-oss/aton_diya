// Video-Inspired Design System for Aton Diya E-Palengke Bulalacao

export const theme = {
  colors: {
    // Primary Palette (from video aesthetic)
    forestGreen: '#1B4D3E',
    earthBrown: '#5A3A22',
    coconutTan: '#D9B48F',
    dawnOrange: '#E2953A',
    seaBlue: '#3F8EAA',
    
    // Supporting Colors
    lightCream: '#F5F1E8',
    darkForest: '#0F2922',
    warmGold: '#C9A961',
    softWhite: '#FDFBF7',
    
    // Semantic Colors
    success: '#2D7A5F',
    warning: '#E2953A',
    error: '#C84B31',
    info: '#3F8EAA',
  },
  
  gradients: {
    hero: 'linear-gradient(135deg, #1B4D3E 0%, #3F8EAA 100%)',
    sunset: 'linear-gradient(180deg, #E2953A 0%, #C9A961 100%)',
    forest: 'linear-gradient(180deg, #0F2922 0%, #1B4D3E 100%)',
    ocean: 'linear-gradient(135deg, #3F8EAA 0%, #5AB9D4 100%)',
    earth: 'linear-gradient(135deg, #5A3A22 0%, #8B6239 100%)',
  },
  
  typography: {
    headingFont: "'Playfair Display', serif",
    bodyFont: "'Inter', sans-serif",
    accentFont: "'Poppins', sans-serif",
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },
  
  borderRadius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  
  shadows: {
    soft: '0 2px 8px rgba(27, 77, 62, 0.08)',
    medium: '0 4px 16px rgba(27, 77, 62, 0.12)',
    strong: '0 8px 32px rgba(27, 77, 62, 0.16)',
    glow: '0 0 20px rgba(226, 149, 58, 0.3)',
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    medium: '300ms ease-in-out',
    slow: '600ms ease-in-out',
    cinematic: '1200ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
};

export default theme;
