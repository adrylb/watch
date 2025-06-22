// -------------------------------------------------- //
// Em um projeto maior e com manutenção diaria        //
// os decorates, register ou listens                  //
// estariam serparadamente em arquivos para crescer   //
// de forma mais organizada e coordenada.             //
// -------------------------------------------------- //
import Fastify from 'fastify'
import { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

import authRoutes from './modules/auth/auth.routes'
import videosRoutes from './modules/videos/videos.routes'
import usersRoutes from './modules/users/users.routes'

import { PrismaClient } from '@prisma/client'
import { kafkaProducer, kafkaConsumer } from './core/libs/kafka'
import { setupWebSocket } from './modules/events/ws.gateway'
import { startKafkaConsumer } from './modules/events/consumer.service'

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  },
})

async function initKafka(app: FastifyInstance) {
  try {
    setupWebSocket(app)

    await kafkaProducer.connect()
    await kafkaConsumer.connect()

    app.decorate('kafka', kafkaProducer)
    app.decorate('kafka', kafkaConsumer)

    await startKafkaConsumer(app)
  } catch (error) {
    console.log(`Kafka: ${error}`)
  }
}

const prisma = new PrismaClient()

app.decorate('prisma', prisma)

app.register(cors, { origin: true })

app.register(jwt, {
  secret: 'streamify-secret',
})

// ⬇️ Swagger docs
app.register(swagger, {
  openapi: {
    info: {
      title: 'Streamify API',
      description: 'Endpoints da plataforma de streaming',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
})

app.register(swaggerUI, {
  routePrefix: '/docs',
})

app.register(authRoutes)
app.register(videosRoutes)
app.register(usersRoutes)

await initKafka()

// Hook de autenticação
app.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.code(401).send({ message: 'Unauthorized' })
  }
})

app.listen({ port: 3001, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err
  console.log(`🚀 API rodando em ${address}`)
  console.log(`📚 Swagger disponível em ${address}/docs`)
})