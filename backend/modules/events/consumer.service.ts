// modules/events/consumer.service.ts
import { kafkaConsumer } from '../../core/libs/kafka'
import { FastifyInstance } from 'fastify'

export async function startKafkaConsumer(app: FastifyInstance) {
  await kafkaConsumer.connect()
  await kafkaConsumer.subscribe({ topic: 'video.uploaded', fromBeginning: false })

  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const raw = message.value?.toString()
      console.log(`[Kafka][${topic}] Nova mensagem:`, raw)

      if (raw) {
        for (const client of app.websocketClients) {
          client.send(JSON.stringify({
            type: 'video.uploaded',
            data: JSON.parse(raw),
          }))
        }
      }
    },
  })
}
