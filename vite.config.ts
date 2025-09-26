import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages base path: /<repo>/
export default defineConfig({
  plugins: [react()],
  base: '/asuraholidays/',
})
