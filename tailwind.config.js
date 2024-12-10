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
          purple: {
            light: '#7E57C2',
            DEFAULT: '#5E35B1',
            dark: '#4527A0',
          },
          orange: {
            light: '#FFB74D',
            DEFAULT: '#FF9800',
            dark: '#F57C00',
          }
        }
      }
    },
  },
  plugins: [],
}