import { hostSocket } from '../../config'
import LocalStorageService from './LocalStorageService'
import { io, Socket } from 'socket.io-client'

class WebsocketService {
  socket: Socket | null = null
  type: string = ''
  payload: unknown = null

  async init(accessToken: string) {
    return new Promise((resolve, reject) => {
      const url = `${hostSocket}/?accessToken=${accessToken}`
      const socket = io(url)
      this.socket = socket
      socket.on('connect', () => {
        console.log('WebSocket connected')
        resolve('connected')
      })
      socket.on('disconnect', () => {
        console.log('WebSocket disconnected')
        resolve('disconnected')
      })
      socket.on('error', (error) => {
        console.log('WebSocket error', error)
        reject(error)
      })
      socket.on('message', (event: MessageEvent) => {
        const message = JSON.parse(event.data)
        this.type = message.type
        this.payload = message.payload
      })
      return socket
    })
  }

  getInstance() {
    if (!this.socket) {
      const accessToken = LocalStorageService.getAccessToken()
      if (!accessToken) return
      this.init(accessToken)
    }
    return this.socket
  }

  sendMessage(type: string, payload: unknown) {
    if (this.socket?.connected) {
      this.socket?.emit(type, payload)
    }
  }

  close() {
    this.socket?.close()
  }
}

export default new WebsocketService()
