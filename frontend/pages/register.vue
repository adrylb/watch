<template>
  <div class="flex justify-center items-center min-h-[80vh]">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle>📝 Cadastro</CardTitle>
        <CardDescription>Crie sua conta para acessar o Streamify.</CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="usuario@exemplo.com"
              required
            />
          </div>

          <div class="grid gap-2">
            <Label for="password">Senha</Label>
            <Input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div class="grid gap-2">
            <Label for="confirm">Confirmar senha</Label>
            <Input
              id="confirm"
              v-model="form.confirm"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" class="w-full mt-2" :disabled="loading">
            {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
          </Button>

          <p v-if="error" class="text-sm text-destructive mt-2 text-center">
            {{ error }}
          </p>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  email: '',
  password: '',
  confirm: '',
})

const error = ref('')
const router = useRouter()
const user = useCurrentUser()
const token = useCookie('token')
const loading = ref(false)
const config = useRuntimeConfig()

async function handleRegister() {
  error.value = ''
  if (form.password.length < 6) {
    error.value = 'A senha deve ter pelo menos 6 caracteres.'
    return
  }
  if (form.password !== form.confirm) {
    error.value = 'As senhas não coincidem.'
    return
  }

  loading.value = true
  try {
    const { data, error: err } = await useFetch(`${config.public.apiBaseUrl}/api/users`, {
      method: 'POST',
      body: { email: form.email, password: form.password },
    })

    if (err.value) {
      error.value = err.value.data.message || 'Erro ao cadastrar'
      return
    }

    const { token: newToken } = data.value as { token: string }
    token.value = newToken
    user.value = { email: form.email }
    router.push('/')
  } catch (e) {
    error.value = 'Erro inesperado ao registrar.'
  } finally {
    loading.value = false
  }
}
</script>
