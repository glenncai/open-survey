import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [alias(), react()],
  resolve: {
    alias: {
      '@': resolve(resolve(__dirname), 'src'),
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    cors: true,
    open: true,
  },
});
