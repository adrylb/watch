<!-- pages/login/index.vue = login-->
<template>
  <div class="flex justify-center items-center min-h-[80vh]">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle>🔐 Login</CardTitle>
        <CardDescription>Entre com suas credenciais para acessar o Streamify.</CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="usuario@exemplo.com"
              required
            />
          </div>

          <div class="grid gap-2">
            <Label for="password">Senha</Label>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" class="w-full mt-4" :disabled="loading">
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </Button>

          <p v-if="errorMessage" class="text-sm text-destructive mt-2">
            {{ errorMessage }}
          </p>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const config = useRuntimeConfig()

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const { data, error } = await useFetch(`${config.public.apiBaseUrl}/api/login`, {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })

    if (error.value || !data.value?.token) {
      errorMessage.value = 'Login inválido. Verifique seu email e senha.'
      return
    }

    // Armazenar o token em cookie
    const token = useCookie('token')
    token.value = data.value.token

    // Redirecionar para o catálogo
    navigateTo('/catalog')
  } catch (e) {
    errorMessage.value = 'Erro ao conectar com o servidor.'
  } finally {
    loading.value = false
  }
}
</script>
