<!-- pages/calalog/index.vue = catalog-->
<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">🎥 Vídeos enviados</h1>
    <p class="text-muted-foreground">Clique para assistir os seus vídeos...</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <Card v-for="video in videos" :key="video.id" class="hover:shadow-lg transition">
        <CardHeader class="p-0">
          <img :src="video.thumb" alt="thumbnail" class="rounded-t-md w-full h-40 object-cover" />
        </CardHeader>
        <CardContent class="space-y-2 p-4">
          <CardTitle class="text-lg">{{ video.title }}</CardTitle>
          <CardDescription>{{ video.description }}</CardDescription>
          <Button @click="handleWatch()">Assistir</Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

definePageMeta({
  middleware: 'auth',
})

const token = useCookie('token')
const config = useRuntimeConfig()

function handleWatch() {
  alert('Funcionalidade de assistir estará disponível em breve!')
}

const { data: videos, error } = await useFetch(`${config.public.apiBaseUrl}/api/videos`, {
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
})

</script>
