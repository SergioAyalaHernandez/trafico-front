/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        pred: {
          50: '#ffeaea',
          100: '#ffc6c6',
          200: '#ff8f8f',
          300: '#ff5959',
          400: '#850606',
          500: '#a30a0a',
          600: '#6a0404',
          700: '#4d0303',
          800: '#330202',
          900: '#1a0101',
        }
      },
      animation: {
        'slide-in': 'slide-in 0.3s ease-out',
      },
      keyframes: {
        'slide-in': {
          '0%': {transform: 'translateY(100%)', opacity: 0},
          '100%': {transform: 'translateY(0)', opacity: 1},
        },
      },
    },
  },
  plugins: [],
}

