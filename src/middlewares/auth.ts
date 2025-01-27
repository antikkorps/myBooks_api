import type { Context, Next } from "hono"
import { HTTPException } from "hono/http-exception"
import jwt from "jsonwebtoken"
import type { JWTPayload } from "../types/auth.js"

declare module "hono" {
  interface ContextVariableMap {
    user: JWTPayload
  }
}

export const auth = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new HTTPException(401, { message: "Token non fourni" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    c.set("user", payload)
    await next()
  } catch (error) {
    throw new HTTPException(401, { message: "Token invalide" })
  }
}
