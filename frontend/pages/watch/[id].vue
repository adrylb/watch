<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <h1 class="text-3xl font-bold">🎬 Assistindo: {{ video?.title }}</h1>

    <Card v-if="video">
      <CardContent class="space-y-4">
        <img :src="video.thumb" :alt="video.title" class="w-full rounded-md shadow-md" />
        <p class="text-muted-foreground">{{ video.description }}</p>

        <Button variant="outline" @click="navigateTo('/catalog')">
          ← Voltar ao Catálogo
        </Button>
      </CardContent>
    </Card>

    <p v-else class="text-destructive">Vídeo não encontrado.</p>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRoute } from '#imports'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const videoId = route.params.id as string

const mockVideos = [
  {
    id: '1',
    title: 'O Futuro do Stream',
    description: 'Uma visão sobre o que vem por aí no mundo do streaming.',
    thumb: 'https://placehold.co/600x300?text=Futuro',
  },
  {
    id: '2',
    title: 'Tecnologia e Entretenimento',
    description: 'Como a tecnologia está transformando a forma de consumir conteúdo.',
    thumb: 'https://placehold.co/600x300?text=Tech+e+Entretenimento',
  },
]

const video = mockVideos.find((v) => v.id === videoId)
</script>
