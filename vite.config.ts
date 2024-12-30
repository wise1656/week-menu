import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: '[name].[hash].js', // Добавление хеша к имени файла JS
        assetFileNames: '[name].[hash].[ext]', // Добавление хеша к именам других ресурсов
      },
    },
  },
})
