import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'resources/js/kingslibrary/index.js'),
      name: 'KingsLibrary',
      formats: ['umd', 'es', 'iife'],
      fileName: (format) => {
        switch (format) {
          case 'umd':
            return 'kingslibrary.umd.js';
          case 'es':
            return 'kingslibrary.esm.js';
          case 'iife':
            return 'kingslibrary.min.js';
          default:
            return `kingslibrary.${format}.js`;
        }
      }
    },
    rollupOptions: {
      external: ['jquery'],
      output: {
        globals: {
          jquery: 'jQuery'
        },
        dir: 'dist'
      }
    },
    outDir: 'dist',
    emptyOutDir: false,
    minify: true,
    sourcemap: true
  }
});