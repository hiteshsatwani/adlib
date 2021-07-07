module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    backgroundColor: theme => ({
      'primary': '#f8f8ff',
      'secondary': '#181A18',
    }),
    variants: {
      extend: {},
    },
    plugins: [],
    textColor: {
      'primary': '#FFFFFF',
      'secondary': '#000000',
      'accent': '#679D5A',
    }
  }
}
