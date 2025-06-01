import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteSitemap from 'vite-plugin-sitemap';
import { createHtmlPlugin } from 'vite-plugin-html';

const routes = [
    { path: '/', name: 'Home' },
    { path: '/payment-success', name: 'Payment Success' },
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/login', name: 'Login' },
    { path: '/signup', name: 'Signup' },
];

export default defineConfig({
    plugins: [
        react(),
        createHtmlPlugin({
            minify: true,
            inject: {
                data: {
                    title: 'CelebAI',
                    description: 'Nền tảng AI trò chuyện với người nổi tiếng',
                },
            },
        }),
    ],
    preview: {
        allowedHosts: ['chatbotai.eastus2.cloudapp.azure.com', 'celebai.site'],
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom', 'react-router-dom'],
                    query: ['@tanstack/react-query'],
                    oauth: ['@react-oauth/google'],
                },
            },
        },
    },
});
