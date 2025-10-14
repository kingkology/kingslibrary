import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
                'resources/js/kingslibrary/core.js'
            ],
            refresh: true,
        }),
    ],
    build: {
        rollupOptions: {
            external: ['jquery'],
            output: {
                globals: {
                    jquery: '$'
                }
            }
        }
    }
});