/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': '#1B4D3E',
        'earth-brown': '#5A3A22',
        'coconut-tan': '#D9B48F',
        'dawn-orange': '#E2953A',
        'sea-blue': '#3F8EAA',
        'light-cream': '#F5F1E8',
        'dark-forest': '#0F2922',
        'warm-gold': '#C9A961',
        'soft-white': '#FDFBF7',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
