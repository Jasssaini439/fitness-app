/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'rotate-subtle': 'rotate-subtle 0.3s ease-in-out 1', // Name, duration, easing, iteration count
        'shake': 'shake 0.5s ease-in-out 1', // Keep the shake animation
        'slide-in-left': 'slide-in-left 1.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 1.5s ease-out forwards',
      },
      keyframes: {


      'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },

        'rotate-subtle': {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(2deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-3px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
  },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-stroke-yellow': {
          '-webkit-text-stroke': '2.5px #FFD700', // Gold color stroke
          'color': 'transparent',
        },
        '.text-stroke-white': {
          '-webkit-text-stroke': '2.5px #ffffff', 
          'color': 'transparent',
        },
        '.text-stroke-red': {
          '-webkit-text-stroke': '2.5px #FF0000', 
          'color': 'transparent',
        },
        '.text-stroke-blue': {
          '-webkit-text-stroke': '2.5px #0000FF', 
          'color': 'transparent',
        },
        '.text-stroke-green': {
          '-webkit-text-stroke': '2.5px #00FF00', 
          'color': 'transparent',
        },
        '.text-stroke-black': {
          '-webkit-text-stroke': '2.5px black', 
          'color': 'transparent',
        },
      })
    },
  ],
}