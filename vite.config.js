import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Movie-Hunter/', 
  plugins: [
    tailwindcss(),
  ],
})
