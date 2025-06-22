// modules/users/users.model.ts

export interface User {
  id: string
  email: string
  password: string
}

export interface CreateUserBody {
  email: string
  password: string
}