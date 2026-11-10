import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true // Bu satır, sunucu başlar başlamaz tarayıcının otomatik açılmasını sağlar
  }
})