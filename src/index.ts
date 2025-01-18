import { serve } from '@hono/node-server'
import dotenv from 'dotenv'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { initDatabase } from './configs/database.js'
import bookRoutes from './routes/bookRoutes.js'
import readingListRoutes from './routes/readingListRoutes.js'
dotenv.config()
const app = new Hono()

initDatabase()

// Middleware
app.use('*', logger())
app.use('*', prettyJSON())
app.use('/api/*', cors())

app.get('/', (c) => {
  return c.json('Hello Hono!')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

// Routes
app.route('/api/books', bookRoutes)
app.route('/api/reading-lists', readingListRoutes)
