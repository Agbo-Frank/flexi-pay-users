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
          'blue-100': '#868895',
          'dark-blue': '#000541',
          'orange-200': '#FF5000',
          'orange-100': '#E78405',
          'black': 'rgba(0, 0, 0, 0.6)',
          'orange-300': '#FFF9F7',
          'orange-400': 'rgba(255, 214, 0, 0.2)',
          'gold': '#FBB54D'
        },
        green: {
          100: '#91CD5E',
          200: 'rgba(145, 205, 94, 0.5)'
        },
        grey: {
          100: '#E8E5FF',
          200: '#555555',
          300: '#8D8D8D',
          400: '#C3C3C3',
          500: '#F5F5F5',
          600: '#C9C9D0',
          700: '#A0A0A1',
          800: '#999aa8',
          900: '#F9F8FF',
          1000: '#C4C4C4',
          1100: '#EDEEF0',
          1200: '#222222',
          1300: '#474747'
        },
        crimson: '#FF5000',
        success: '#8EC162'
      },
      borderRadius: {
        '4xl': '30px',
        '5xl': '40px'
      },
      padding: {
        'xs': '1.5px',
        'fp-5': '5%',
        'fp-10': '15%'
      },
      width: {
        'fp-desk': '1220px',
        'fp-600': '670px',
        '500': '500px',
        'fp-450': '440px',
        'fp-500': '550px',
        'fp-700': '680px',
      },
      height: {
        'fp-desk': '1280px',
        'fp-600': '670px',
        'fp-500': '1050px',
        'fp-700': '700px',
        'fp-80': '80vh',
        'fp-130': '132vh'
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
        '800': '800px',
        '700': '720px',
        '400': '80vh',
        'fp-400': '400px'
      },
      maxWidth: {
        'fp-desk': '1200px',
        'fp-300': '300px'
      }
    },
  },
  plugins: [],
}
