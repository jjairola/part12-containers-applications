import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// if (!process.env.VITE_PROXY_TARGET) {
//   throw new Error("VITE_PROXY_TARGET environment variable is not set");
// }

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["frontend"],
    // proxy: {
    //   "/api": {
    //     target: process.env.VITE_PROXY_TARGET || "http://localhost:3000",
    //     changeOrigin: true,
    //   },
    // },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./testSetup.js",
  },
});
