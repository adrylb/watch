// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('token')
  const config = useRuntimeConfig()
  
  // Se não houver token, redireciona para login
  if (!token.value)
    return navigateTo('/login')
    
  // Opcional: checa se o token é válido chamando /api/me
  const { data, error } = await useFetch(`${config.public.apiBaseUrl}/api/user`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })

  if (error.value || !data.value) {
    token.value = null // limpa token inválido
    return navigateTo('/login')
  }
})
