import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ps-api': {
        target: 'http://localhost/Prestashop/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ps-api/, ''),
      },
      '/api_stock.php': {
        target: 'http://localhost/Prestashop/api_stock.php',
        changeOrigin: true,
      },
    },
  },
})
