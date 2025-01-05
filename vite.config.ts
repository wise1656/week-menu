import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        entryFileNames: "[name].[hash].js", // Добавление хеша к имени файла JS
        assetFileNames: "[name].[hash].[ext]", // Добавление хеша к именам других ресурсов
      },
    },
  },
  server: {
    port: 3000, // Установка порта на 3000
    strictPort: true, // Установка strictPort в true, чтобы сервер завершал работу, если порт занят
  },
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Недельное меню",
        short_name: "Меню",
        start_url: "./index.html",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "icon-192x192.jpg",
            sizes: "192x192",
            type: "image/jpg",
          },
          {
            src: "icon-512x512.jpg",
            sizes: "512x512",
            type: "image/jpg",
          },
        ],
      },
    }),
  ],
});
