<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground transition-colors">

    <!-- Header -->
    <Header />

    <!-- Conteúdo -->
    <main class="flex-1 container mx-auto px-4 py-6">
      <slot />
    </main>

    <!-- Rodapé -->
    <footer class="text-center text-sm text-white py-4 border-t border-black bg-[#ff501a]">
      © 2025 Streamify — Todos os direitos reservados.
    </footer>

  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'

</script>
