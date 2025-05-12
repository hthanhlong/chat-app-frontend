import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import flowbiteReact from 'flowbite-react/plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), flowbiteReact()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // (tuỳ chọn)
  },
})
