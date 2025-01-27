export interface UserAttributes {
  id: number
  email: string
  username: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export interface JWTPayload {
  id: string
  email: string
  username: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest extends LoginRequest {
  username: string
}
