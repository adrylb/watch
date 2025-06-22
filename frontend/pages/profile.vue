<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">👤 Meu Perfil</h1>

    <Card class="max-w-lg">
      <CardHeader>
        <CardTitle>Informações do Usuário</CardTitle>
        <CardDescription>Esses dados foram obtidos da autenticação JWT.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div>
          <Label>Email:</Label>
          <p class="text-foreground">{{ user?.email }}</p>
        </div>

        <Separator />

        <div>
          <Label>Plano atual:</Label>
          <Badge variant="outline">Premium</Badge>
        </div>

        <div>
          <Label>Vídeos assistidos:</Label>
          <p class="text-muted-foreground">💡 Simulação: 34 vídeos assistidos</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

definePageMeta({
  middleware: 'auth',
})

const user = useCurrentUser()

</script>
