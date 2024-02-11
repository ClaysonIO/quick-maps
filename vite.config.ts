import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: "./index.html"
      }
    }
  },
  server: {
    open: './index.html'
  },
  plugins: [
    react(),
    // VitePWA({ base: 'app', registerType: 'autoUpdate' })
  ]
})
