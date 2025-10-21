
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    allowedHosts: [
      '96fbf146-cb2c-469e-bc7b-0a91e0bca983-00-xv3yasuwo3n6.sisko.replit.dev',
    ],
    fs: {
      strict: false,
    },
    // 👇 this line makes /app and nested routes load properly even after refresh
    historyApiFallback: true,
  },
})
