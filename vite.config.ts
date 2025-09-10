import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Use root base on Vercel for proper asset paths; keep existing base elsewhere (e.g., GitHub Pages)
  base: process.env.VERCEL === "1" ? "/" : "/125e9419-1051-4a6d-b514-96d0012b96cd/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
