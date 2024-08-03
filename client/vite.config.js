import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:8000", // Proxy API requests to the server
    },
  },
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure this is set to 'dist'
  },
});
