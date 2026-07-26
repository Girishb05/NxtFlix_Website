import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev server runs on port 3000 and the production build
// goes into a folder called "build" instead of the Vite default "dist".
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    outDir: 'build'
  }
})
