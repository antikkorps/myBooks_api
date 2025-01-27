import bcrypt from "bcrypt"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import jwt from "jsonwebtoken"
import { User } from "../models/user.js"
import type { LoginRequest } from "../types/auth.js"
import type { JWTPayload, RegisterRequest } from "./../types/auth.js"

const auth = new Hono()

auth.post("/login", async (c) => {
  try {
    const { email, password }: LoginRequest = await c.req.json()

    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw new Error("Utilisateur ou mot de passe incorrect")
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw new HTTPException(401, { message: "Utilisateur ou mot de passe incorrect" })
    }

    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "24h" })

    return c.json({
      message: "Connexion réussie",
      token,
      user: { id: user.id, email: user.email, username: user.username },
    })
  } catch (error) {
    if (error instanceof HTTPException) {
      throw new HTTPException(500, { message: error.message })
    }
    throw new HTTPException(500, { message: "Erreur serveur" })
  }
})

auth.post("/signup", async (c) => {
  try {
    const { email, username, password }: RegisterRequest = await c.req.json()

    const existingUser = await User.findOne({ where: { email } })

    if (existingUser) {
      throw new HTTPException(400, { message: "Email déjà utilisé" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ email, username, password: hashedPassword })
    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "24h" })
    return c.json({
      message: "Utilisateur créé",
      token,
      user: { id: user.id, email: user.email, username: user.username },
    })
  } catch (error) {
    if (error instanceof HTTPException) {
      throw new HTTPException(500, { message: error.message })
    }
    throw new HTTPException(500, { message: "Erreur serveur" })
  }
})

export default auth
