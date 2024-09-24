import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9772', // URL of the backend server
        changeOrigin: true, // Optional: modify the Origin header to the target server
        // rewrite: path => path.replace(/^\/api/, ''), // Optional: remove /api prefix if needed
      },
    },
  },
});
