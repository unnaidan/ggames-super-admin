import { default as react } from '@vitejs/plugin-react';
import { default as path } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './src')
        }
    },
    plugins: [
        react()
    ]
});
