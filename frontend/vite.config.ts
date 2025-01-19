import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://recordingtotextconverter.it.com',
      dynamicRoutes: [
        '/',
        '/recorder',
        '/faq',
        '/blog',
        '/blog/1'  // 添加已知的博客文章路由
      ],
      exclude: ['/404'],
      lastmod: new Date(),
      robots: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin', '/private']
        }
      ],
      outDir: 'dist'
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
