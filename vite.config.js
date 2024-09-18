import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Keep this for debugging
    minify: false, // Disable minification to debug the "f is not defined" issue
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  server: {
    open: true, // Opens the browser automatically during development
  },
  resolve: {
    alias: {
      "@": "/src", // Shorter path resolution if needed
    },
  },
});
