/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6B4226", // Marrón para el logo o el navbar
        secondary: "#FFD700", // Dorado para acentos
        accent: "#2C2A29", // Gris oscuro o neutro
      },
    },
  },
  plugins: [require("daisyui")],
}

