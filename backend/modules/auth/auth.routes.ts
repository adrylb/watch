// modules/auth/auth.routes.ts
import { FastifyInstance } from 'fastify'
import { loginUser } from './auth.service'
import { LoginBody } from './auth.model'

export default async function authRoutes(app: FastifyInstance) {
  app.post('/api/login', {
    schema: {
      tags: ['Auth'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
        401: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const body = request.body as LoginBody
      app.log.info(`Tentando login com email: ${body.email}`) //exemplo de logs;

      const token = await loginUser(app, body.email, body.password)

      app.log.info(`Token: ${token}`) //exemplo de logs;
      if (!token) {
        app.log.warn(`Falha no login para email: ${body.email}`) //exemplo de logs;
        return reply.code(401).send({ message: 'Credenciais inválidas' })
      }

      app.log.info(`Login bem-sucedido para: ${body.email}`) //exemplo de logs;
      return { token }
    },
  })
}
