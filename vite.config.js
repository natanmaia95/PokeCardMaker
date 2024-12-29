import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows external access to the development server
    port: 3000, // Change the port if needed
  },
  build: {
    outDir: "dist", // Build output directory
  },
})
