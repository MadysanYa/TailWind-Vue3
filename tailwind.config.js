/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {},
    container: {
      center: true
    }
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/line-clamp'),
  ],
}
