import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const commit = (
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GIT_COMMIT ||
  'local'
).slice(0, 10)
const branch = process.env.VERCEL_GIT_COMMIT_REF || 'unknown'
const buildTime = new Date().toISOString()

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-build-info',
      transformIndexHtml(html) {
        const comment = `\n<!-- build:commit ${commit} | branch ${branch} | time ${buildTime} -->\n`
        const metas =
          `<meta name="build-commit" content="${commit}" />` +
          `<meta name="build-branch" content="${branch}" />` +
          `<meta name="build-time" content="${buildTime}" />`
        return html
          .replace('<head>', `<head>${comment}${metas}`)
      },
    },
  ],
  server: {
    port: 30001,
    proxy: {
      // 로컬 개발 시 /api/* 요청을 Vercel dev 서버(3000)로 프록시
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
