// modules/events/events.model.ts

export interface VideoUploadedEvent {
  id: string
  title: string
  description: string
  thumb: string
  userId: string
  createdAt: string
}
