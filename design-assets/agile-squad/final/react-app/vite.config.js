import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleChatRequest } from './api/groqChat.js'

// 개발 서버에서 /api/chat 을 처리하는 미들웨어.
// 프로덕션(Netlify)에서는 동일한 로직을 netlify/functions/chat.js 가 대신 수행한다.
function groqChatDevApi(env) {
  return {
    name: 'groq-chat-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }
        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', async () => {
          try {
            const { level, question } = JSON.parse(body || '{}')
            const result = await handleChatRequest({ level, question, apiKey: env.GROQ_API_KEY })
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(result))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), groqChatDevApi(env)],
    server: {
      port: parseInt(process.env.PORT) || 5173,
      open: false,
    },
  }
})
