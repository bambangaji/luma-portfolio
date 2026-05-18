/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 enable dark mode manually via class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
