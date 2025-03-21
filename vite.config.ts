import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "./", // Use relative paths
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html", // Point to the root directory's index.html
    },
  },
});
