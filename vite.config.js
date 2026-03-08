import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// React plugin enables JSX/TSX and Fast Refresh in development
export default defineConfig({
  plugins: [react()],
})
