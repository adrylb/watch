<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { useWebSocket } from '@/composables/useWebSocket'
  
  onMounted(() => {
    useWebSocket()
  })
</script>
