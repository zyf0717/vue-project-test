import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  // Load environment variables based on the current mode (development or production)
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE_URL, // Use the loaded base URL from environment variables
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
});
