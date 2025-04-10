import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: process.env.PORT || 3000, // Use the PORT environment variable
    allowedHosts: ['vayora.onrender.com'] // Add your host here
  }
})
