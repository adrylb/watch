// modules/videos/videos.service.ts
import { PrismaClient } from '@prisma/client'
import { Video, CreateVideoInput } from './videos.model'
import { emitVideoUploadedEvent } from '../events/producer.service'
import { FastifyInstance } from 'fastify'

export async function createVideo(prisma: PrismaClient, data: CreateVideoInput): Promise<Video> {
  return prisma.video.create({ data })
}

export async function getAllVideos(prisma: PrismaClient): Promise<Pick<Video, 'id' | 'title' | 'description' | 'thumb'>[]> {
  return prisma.video.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      thumb: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getUserVideos(prisma: PrismaClient, userId: string): Promise<Pick<Video, 'id' | 'title' | 'description' | 'thumb'>[]> {
  return prisma.video.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      thumb: true,
    },
    orderBy: { createdAt: 'desc' },
    where: { userId: userId }
  })
}

export async function emitEvent(app: FastifyInstance, video: Video) {
  try {
    await emitVideoUploadedEvent({
      id: video.id,
      title: video.title,
      description: video.description,
      thumb: video.thumb,
      userId: video.userId,
      createdAt: video.createdAt.toISOString(),
    })
  } catch (error) {
    app.log.error(error)
  }
}