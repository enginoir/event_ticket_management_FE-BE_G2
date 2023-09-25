/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primaryColor : '#1450A3',
        secondaryColor: '#FFF',
      },
    },
  },
  plugins: [],
}

