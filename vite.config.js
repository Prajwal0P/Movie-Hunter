import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/Movie-Hunter/',   // <-- important for GitHub Pages
  plugins: [
    react(),                 // <-- React plugin must be included
    tailwindcss(),
  ],
});
