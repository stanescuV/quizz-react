/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],            // Roboto as the default sans font
        comic: ['"Comic Sans MS"', 'cursive'],     // Comic Sans MS font
        times: ['"Times New Roman"', 'serif'],     // Times New Roman font
        arial: ['Arial', 'sans-serif'],            // Arial font
        georgia: ['Georgia', 'serif'],             // Georgia font
      },
    },
  },
  plugins: [],
}
