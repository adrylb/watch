export const useCurrentUser = () => {
const user = useState('auth-user')
  
  watchEffect(async () => {
    
    const config = useRuntimeConfig()
    const token = useCookie('token')

    if (!token.value) {
      user.value = null
      return
    }

    if (!user.value) {
      try {
        
        const { data } = await useFetch(`${config.public.apiBaseUrl}/api/user`, {
          headers: { Authorization: `Bearer ${token.value}` },
        })
        
        if (data.value) {
          user.value = data.value
        }
      } catch {
        user.value = null
      }
    }
  })

  return user
}
