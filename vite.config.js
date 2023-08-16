import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

const baseUrl = 'http://123.249.96.217:80/api'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                target: baseUrl, // Replace with your API server address
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''), // Remove the '/api' prefix from the URL
                pathRewrite: {
                    '^/api': baseUrl // 去除请求路径中的 '/api' 前缀
                }
            },
        },
        port: 80
    },
})
