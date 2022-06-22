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
          400: '#C3C3C3',
          500: '#F5F5F5',
          600: '#C9C9D0',
          700: '#A0A0A1'
        },
        crimson: '#FF5000'
      },
      borderRadius: {
        '4xl': '30px',
        '5xl': '40px'
      },
      padding: {
        'fp-5': '5%',
        'fp-10': '10%'
      },
      width: {
        'fp-desk': '1280px',
        'fp-600': '670px',
        'fp-500': '550px',
      },
      height: {
        'fp-desk': '1280px',
        'fp-600': '670px',
        'fp-500': '1050px',
      },
      boxShadow:{
        'card-shadow': '0 20px 50px rgba(25, 0, 254, 0.05)'
      },
      transitionProperty: {
        'display': 'display',
      },
      minHeight: {
        '400': '400px'
      },
      maxHeight: {
        '800': '800px'
      }
    },
  },
  plugins: [],
}
