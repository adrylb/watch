<template>
  <div class="flex justify-center items-center min-h-[80vh]">
    <Card class="w-full max-w-xl">
      <CardHeader>
        <CardTitle>📤 Upload de Vídeo</CardTitle>
        <CardDescription>Preencha os campos abaixo para adicionar um novo vídeo.</CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid gap-2">
            <Label for="title">Título</Label>
            <Input id="title" v-model="form.title" required />
          </div>

          <div class="grid gap-2">
            <Label for="description">Descrição</Label>
            <Textarea id="description" v-model="form.description" required />
          </div>

          <div class="grid gap-2">
            <Label for="thumb">URL da Thumb</Label>
            <Input id="thumb" v-model="form.thumb" type="url" required />
          </div>

          <Button type="submit" class="w-full mt-2" :disabled="loading">
            {{ loading ? 'Enviando...' : 'Enviar Vídeo' }}
          </Button>

          <p v-if="success" class="text-sm text-green-600 mt-2 text-center">Vídeo enviado com sucesso!</p>
          <p v-if="error" class="text-sm text-destructive mt-2 text-center">{{ error }}</p>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  title: '',
  description: '',
  thumb: '',
})

const success = ref(false)
const error = ref('')
const loading = ref(false)
const token = useCookie('token')
const config = useRuntimeConfig()

async function handleSubmit() {
  success.value = false
  error.value = ''
  loading.value = true

  try {
    const { error: err } = await useFetch(`${config.public.apiBaseUrl}/api/videos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: { ...form },
    })

    if (err.value) {
      error.value = err.value.data?.message || 'Erro ao enviar vídeo.'
    } else {
      success.value = true
      form.title = ''
      form.description = ''
      form.thumb = ''
    }
  } catch (e) {
    error.value = 'Erro inesperado.'
  } finally {
    loading.value = false
  }
}
</script>
