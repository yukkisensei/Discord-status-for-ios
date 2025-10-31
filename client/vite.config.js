import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiUrl = process.env.VITE_API_URL || 'http://localhost:5000';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: apiUrl,
        changeOrigin: true,
        secure: false
      },
      '/api': {
        target: apiUrl,
        changeOrigin: true,
        secure: false
      }
    }
  }
})
