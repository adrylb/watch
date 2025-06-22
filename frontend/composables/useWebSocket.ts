import { toast } from 'vue-sonner'

export function useWebSocket() {
  const ws = new WebSocket('ws://localhost:3001/ws')

  ws.onopen = () => {
    console.log('[WebSocket] conectado com sucesso!')
  }

  ws.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data)

      if (message.type === 'video.uploaded') {
        toast.success('📢 Novo vídeo enviado!', {
          description: message.data.title,
        })
      }
    } catch (err) {
      console.warn('Erro ao interpretar mensagem WS', err)
    }
  }

  ws.onerror = (err) => {
    console.error('[WebSocket] erro:', err)
  }

  return ws
}
