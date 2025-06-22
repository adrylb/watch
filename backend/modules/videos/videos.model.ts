// modules/videos/video.model.ts

export interface Video {
  id: string
  title: string
  description: string
  thumb: string
  userId: string
  createdAt: Date
}

export interface CreateVideoInput {
  title: string
  description: string
  thumb: string
  userId: string  
}

export interface UploadBody {
  title: string
  description: string
  thumb: string
}