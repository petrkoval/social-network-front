import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {find: "@app", replacement: path.resolve(__dirname, "./src/app")},
      {find: "@widgets", replacement: path.resolve(__dirname, "./src/widgets")},
      {find: "@shared", replacement: path.resolve(__dirname, "./src/shared")},
      {find: "@pages", replacement: path.resolve(__dirname, "./src/pages")},
      {find: "@entities", replacement: path.resolve(__dirname, "./src/entities")},
      {find: "@features", replacement: path.resolve(__dirname, "./src/features")},
    ]
  }
})
