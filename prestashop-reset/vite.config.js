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
    },
  },
})
