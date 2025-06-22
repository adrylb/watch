// modules/users/users.routes.ts
import { FastifyInstance } from 'fastify'
import { createUser, deleteUserById, findUserByEmail, getUserById, getUsers } from './users.service'
import { User, CreateUserBody } from './users.model'

export default async function usersRoutes(app: FastifyInstance) {
  // POST /api/users
  app.post('/api/users', {
    schema: {
      tags: ['Usuário'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
        409: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const body = request.body as CreateUserBody

      const existing = await findUserByEmail(app.prisma, body.email)
      if (existing) {
        return reply.code(409).send({ message: 'Email já registrado' })
      }

      const user = await createUser(app.prisma, body.email, body.password)
      const token = app.jwt.sign({ id: user.id, email: user.email })
      return reply.code(201).send({ token })
    },
  })

  // GET /api/users
  app.get('/api/users', {
    onRequest: app.authenticate,
    schema: {
      tags: ['Usuário'],
      summary: 'Listar usuários',
      description: 'Retorna todos os usuários cadastrados',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              email: { type: 'string', format: 'email' },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const users = await getUsers(app.prisma)
      return users
    },
  })

  // GET /api/user
  app.get('/api/user', {
    onRequest: app.authenticate,
    schema: {
      tags: ['Usuário'],
      summary: 'Buscar usuário logado',
      description: 'Retorna os dados do usuário logado',
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const reqUser = request.user as User

      const user = await getUserById(app.prisma, reqUser.id)

      if (!user) {
        return reply.code(404).send({ message: 'Usuário não encontrado' })
      }

      return user
    },
  })

  // DELETE /api/users/:id
  app.delete('/api/users/:id', {
    onRequest: app.authenticate,
    schema: {
      tags: ['Usuário'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
      response: {
        204: { type: 'null' },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string }

      const existing = await app.prisma.user.findUnique({ where: { id } })
      if (!existing) {
        return reply.code(404).send({ message: 'Usuário não encontrado' })
      }

      await deleteUserById(app.prisma, id)
      return reply.code(204).send()
    },
  })
}
