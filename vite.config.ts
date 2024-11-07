import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  appType: "spa",

  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: path.resolve(__dirname, "dist/types"),
    }),
  ],
  server: {
    host: "localhost",
    port: 3000,
    open: false,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "tee",
      formats: ["es", "cjs"],
      fileName: (format) => `tee.${format}.js`,
    },
    rollupOptions: {
      // Specify external dependencies here if your library depends on them
      external: [], // e.g., ['react'] if using React
      output: {
        globals: {
          // Map any external dependencies to global variables (e.g., 'react': 'React')
        },
      },
    },
  },
});
