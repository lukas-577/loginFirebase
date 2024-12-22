/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#6B4226",  // Marrón cálido
          "secondary": "#FFD700",  // Amarillo dorado
          "accent": "#2C2A29",  // Gris oscuro
          "neutral": "#EDEDED",  // Gris claro
          "base-100": "#ffffff",  // Blanco para modo claro
          "info": "#5AB1F5",  // Azul suave
          "success": "#4CAF50",  // Verde vibrante
          "warning": "#FF9800",  // Naranja
          "error": "#F44336",  // Rojo brillante
        },
      },
      {
        darktheme: {
          "primary": "#A97D58",  // Marrón más claro para contraste
          "secondary": "#FFD700",  // Amarillo dorado
          "accent": "#1A1918",  // Gris muy oscuro para acentos
          "neutral": "#1E1E1E",  // Gris oscuro para fondos
          "base-100": "#4f4f4f",  // Negro suave para fondo principal
          "info": "#3A9AD9",  // Azul más apagado
          "success": "#388E3C",  // Verde más oscuro
          "warning": "#F57C00",  // Naranja más suave
          "error": "#D32F2F",  // Rojo oscuro
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

