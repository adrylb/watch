<!-- components/Header.vue = Header-->
<template>
  <header class="bg-[#3b3b3b] text-white px-4 py-3 border-b border-[#6100cc] shadow-sm">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Lado esquerdo: Logo e menu -->
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="text-xl font-bold tracking-tight">🎬 Streamify</NuxtLink>

        <!-- Menu desktop -->
        <nav class="hidden md:flex items-center gap-4 font-semibold">          
          <NuxtLink v-if="!user" to="/register" class="hover:underline">Cadastrar-se</NuxtLink>
          <NuxtLink v-if="user" to="/catalog" class="hover:underline">Catálogo</NuxtLink>
        </nav>

        <!-- Menu mobile: ícone hamburguer -->
        <Sheet>
          <SheetTrigger class="md:hidden" as-child>
            <Button variant="ghost" size="icon" class="text-white">
              <MenuIcon class="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="bg-[#3b3b3b] text-white w-64 p-6">
            <div class="flex flex-col space-y-4 mt-8 font-semibold">              
              <NuxtLink v-if="!user" to="/register">Cadastrar-se</NuxtLink>
              <NuxtLink v-if="user" to="/catalog">Catálogo</NuxtLink>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <!-- Lado direito: tema + usuário -->
      <div class="flex items-center gap-3">
        <!-- Botão de tema -->
        <Button size="icon" variant="ghost" class="rounded-full" @click="toggleDark">
          {{ isDark ? '🌙' : '☀️' }}
        </Button>

        <!-- Menu do usuário -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button size="icon" variant="ghost" class="rounded-full">
              <UserIcon class="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56">
            <template v-if="user">
              <DropdownMenuLabel class="font-semibold text-xs text-muted-foreground">
                {{ user.email }}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem class="font-semibold" @click="navigateTo('/upload')">
                Upload
              </DropdownMenuItem>
              <DropdownMenuItem class="font-semibold" @click="logout">Logout</DropdownMenuItem>
            </template>
            <template v-else>
              <DropdownMenuItem class="font-semibold" @click="navigateTo('/login')">
                Login
              </DropdownMenuItem>
              <DropdownMenuItem class="font-semibold" @click="navigateTo('/register')">
                Cadastrar-se
              </DropdownMenuItem>
            </template>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Menu as MenuIcon, User as UserIcon } from 'lucide-vue-next'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'

const isDark = useState('dark', () => false)

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

const user = useCurrentUser()

const logout = async () => {
  const token = useCookie('token')
  const user = useState('auth-user')

  user.value = null
  token.value = null

  // Aguarda ciclo de reatividade + microtask
  await new Promise((resolve) => setTimeout(resolve, 50))

  await navigateTo('/', { replace: true })
}

</script>
