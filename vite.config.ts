import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts', // The main file for your framework
      name: 'mino',
      fileName: (format) => `mino.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'react'], // External dependencies (if any)
      output: {
        globals: {
          vue: 'Vue',
          react: 'React',
        },
      },
    },
  },
});
