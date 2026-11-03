/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F68E2D',
          dark: '#14112E',
          deep: '#03091F',
        }
      }
    },
  },
  plugins: [],
}
