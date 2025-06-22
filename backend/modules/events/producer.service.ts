// modules/events/producer.service.ts
import { kafkaProducer } from '../../core/libs/kafka'
import { VideoUploadedEvent } from './events.model'

export async function emitVideoUploadedEvent(event: VideoUploadedEvent) {
  await kafkaProducer.connect()

  await kafkaProducer.send({
    topic: 'video.uploaded',
    messages: [
      {
        key: event.id,
        value: JSON.stringify(event),
      },
    ],
  })
}
