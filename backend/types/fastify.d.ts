// types/fastify.d.ts
import '@fastify/jwt'
import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    authenticate: any
  }

  interface FastifyRequest {
    user: {
      id: string
      email: string
    }
  }
}