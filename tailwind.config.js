module.exports = {
  // mode: 'jit',
  purge: ['./src/pages/**/*.jsx', './src/components/**/*.jsx'], // remove unused styles in production
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: 'Poppins',
      sans: 'Poppins',
    },
    extend: {
      colors: {
        gray: {
          900: '#141414',
        },
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus'],
      ringWidth: ['hover', 'active'],
    },
  },
  plugins: [],
}
