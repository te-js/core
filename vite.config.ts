import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  server: {
    host: "localhost",
    port: 3000,
    open: false,
    proxy: {},
  },
});
