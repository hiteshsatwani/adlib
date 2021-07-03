module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    theme: {
      extend: {
        keyframes: {
          'fade-in-down': {
            '0%': {
              opacity: '0',
              transform: 'translateY(-10px)'
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)'
            },
          }
        },
        animation: {
          'fade-in-down': 'fade-in-down 0.5s ease-out'
        },
        fontFamily: {
          'montserrat': ['"Montserrat"', 'semibold']
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
