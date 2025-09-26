import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Netlify deployment at root
export default defineConfig({
  plugins: [react()],
  base: '/',
})
