import { serve } from "@hono/node-server"
import dotenv from "dotenv"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { prettyJSON } from "hono/pretty-json"
import { initDatabase } from "./configs/database.js"
import { auth } from "./middlewares/auth.js"
import authRoutes from "./routes/authRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import readingListRoutes from "./routes/readingListRoutes.js"
dotenv.config()
const app = new Hono()

initDatabase()

// Middleware
app.use("*", logger())
app.use("*", prettyJSON())

const api = new Hono()
api.use("*", cors())

// Route de base
app.get("/", (c) => {
  return c.json("Hello Hono!")
})

// Routes Publiques
api.route("/auth", authRoutes)

// Routes protégées
api.use("/books/*", auth)
api.use("/reading-lists/*", auth)
api.route("/books", bookRoutes)
api.route("/reading-lists", readingListRoutes)

// Montage du groupe api sur /api
app.route("/api", api)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
