// modules/events/ws.gateway.ts
import { FastifyInstance, FastifyRequest } from 'fastify'
import fastifyWebsocket from '@fastify/websocket'

export function setupWebSocket(app: FastifyInstance) {
  app.register(fastifyWebsocket)

  // Armazena os clientes WebSocket conectados
  app.decorate('websocketClients', new Set<WebSocket>())

  app.get('/ws', { websocket: true }, (connection, req: FastifyRequest) => {
    connection.socket.send('📡 Conectado ao Streamify Realtime')
    app.websocketClients.add(connection.socket)

    connection.socket.on('close', () => {
      app.websocketClients.delete(connection.socket)
    })
  })
}