/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        card: "#111111"
      }
    }
  },
  plugins: []
}