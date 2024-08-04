import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Change from '@vitejs/plugin-react-swc' to '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
});
