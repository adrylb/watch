//core/libs/Kafka.ts
import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  clientId: 'streamify-backend',
  brokers: ['kafka:9092'], // altere se necessário
})

export const kafkaProducer = kafka.producer()
export const kafkaConsumer = kafka.consumer({ groupId: 'streamify-group' })