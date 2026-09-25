import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Vite configuration for Kalvec Website frontend.
 * Integrates React plugin and Tailwind CSS v4 Vite plugin.
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
