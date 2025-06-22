<!-- pages/index.vue = home-->
<template>
  <div class="space-y-12">
    <!-- Lançamentos -->
    <section>
      <h2 class="text-white text-xl font-semibold mb-4">Lançamentos</h2>
      <div class="flex overflow-x-auto gap-4">
        <div
          v-for="video in videos"
          :key="video.id"
          class="w-[160px] shrink-0 rounded-md overflow-hidden bg-neutral-800 hover:brightness-110 transition"
        >
          <img :src="video.thumb" :alt="video.title" class="w-full h-auto object-cover" />
        </div>
      </div>
    </section>

    <!-- Parceiros -->
    <section>
      <h2 class="text-white text-xl font-semibold mb-4">Destaques de Canais</h2>
      <div class="flex overflow-x-auto gap-4">
        <div class="min-w-[300px] h-[160px] bg-[#0061ff] text-white flex items-center justify-center text-2xl font-bold rounded-md">
          Paramount+
        </div>
        <div class="min-w-[300px] h-[160px] bg-[#e50914] text-white flex items-center justify-center text-2xl font-bold rounded-md">
          Telecine
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const videos = [
  {
    id: '1',
    title: 'Casas Flutuantes',
    thumb: 'https://play.watch.tv.br/_next/image?url=https%3A%2F%2Fcdnsecakmi.kaltura.com%2Fapi_v3%2Findex.php%2Fservice%2FthumbAsset%2Faction%2Fserve%2FthumbAssetId%2F1_rg4mcts3&w=256&q=75',
  },
  {
    id: '2',
    title: 'Karaoquem',
    thumb: 'https://play.watch.tv.br/_next/image?url=https%3A%2F%2Fcdnsecakmi.kaltura.com%2Fapi_v3%2Findex.php%2Fservice%2FthumbAsset%2Faction%2Fserve%2FthumbAssetId%2F1_5kbc4puv&w=256&q=75',
  },
  {
    id: '3',
    title: 'Replay',
    thumb: 'https://play.watch.tv.br/_next/image?url=https%3A%2F%2Fcdnsecakmi.kaltura.com%2Fapi_v3%2Findex.php%2Fservice%2FthumbAsset%2Faction%2Fserve%2FthumbAssetId%2F1_q6o9y9ix&w=256&q=75',
  },
  {
    id: '4',
    title: 'Ruas mundo afora',
    thumb: 'https://play.watch.tv.br/_next/image?url=https%3A%2F%2Fcdnsecakmi.kaltura.com%2Fapi_v3%2Findex.php%2Fservice%2FthumbAsset%2Faction%2Fserve%2FthumbAssetId%2F1_15mzb1d4&w=256&q=75',
  },
]
</script>
