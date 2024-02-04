import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: "./app.html"
      }
    }
  },
  server: {
    open: './app.html'
  },
  plugins: [
    react(),
    // VitePWA({ base: 'app', registerType: 'autoUpdate' })
  ]
})
