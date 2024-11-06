import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  server: {
    host: "localhost",
    port: 3000,
    open: false,
    proxy: {},
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "tee",
      formats: ["es", "umd"],
      fileName: (format) => `tee.${format}.js`,
    },
  },
});
