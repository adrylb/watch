// modules/videos/videos.routes.ts
import { FastifyInstance } from 'fastify'
import { User } from '../../modules/users/users.model'
import { createVideo, getUserVideos, emitEvent } from './videos.service'
import { UploadBody } from './videos.model'

export default async function videosRoutes(app: FastifyInstance) {
  app.post('/api/videos', {
    onRequest: app.authenticate,
    schema: {
      tags: ['Videos'],
      body: {
        type: 'object',
        required: ['title', 'description', 'thumb'],
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          thumb: { type: 'string' },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            video: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                thumb: { type: 'string' },
              },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const body = request.body as UploadBody
      const user = request.user as User

      const video = await createVideo(app.prisma, {
        ...body,
        userId: user.id,
      })

      await emitEvent(app, video)

      return reply.code(201).send({ message: 'Vídeo criado com sucesso', video })
    },
  })

  app.get('/api/videos', {
    onRequest: app.authenticate,
    schema: {
      tags: ['Videos'],
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              thumb: { type: 'string' },
            },
          },
        },
      },
    },
    handler: async (request) => {
      const user = request.user as User

      const videos = await getUserVideos(app.prisma, user.id)
      return videos
    },
  })
}