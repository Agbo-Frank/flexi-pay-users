/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'blue': '#1900FE',
          'dark-blue': '#000541',
          'orange-200': '#FF5000',
          'orange-100': '#E78405'
        },
        grey: {
          100: '#E8E5FF',
          200: '#555555',
          300: '#8D8D8D',
          400: '#C3C3C3'
        },
        crimson: '#FF5000'
      },
      width: {
        'fp-desk': '1280px',
        'fp-600': '670px'
      },
      transitionProperty: {
        'display': 'display',
      }
    },
  },
  plugins: [],
}
