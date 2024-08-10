import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Esto hace que Vite sea accesible en la red local
    port: 3000,  // Cambia el puerto si es necesario
  }
})