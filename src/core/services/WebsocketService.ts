import { config } from '../../config'
import LocalStorageService from './LocalStorageService'
import { io, Socket } from 'socket.io-client'

export type EventPayload<T> = {
  eventName: string
  value: T
}

class WebsocketService {
  socket: Socket | null = null
  type: string = ''
  payload: unknown = null

  async init(accessToken: string) {
    return new Promise((resolve, reject) => {
      const url = `${config.hostSocket}/?accessToken=${accessToken}`
      this.socket = io(url)
      this.socket.on('connect', () => {
        console.log('WebSocket connected')
        resolve('connected')
      })
      this.socket.on('disconnect', () => {
        console.log('WebSocket disconnected')
        resolve('disconnected')
      })
      this.socket.on('error', (error) => {
        console.log('WebSocket error', error)
        reject(error)
      })
      this.socket.on('message', (event: MessageEvent) => {
        const message = JSON.parse(event.data)
        this.type = message.type
        this.payload = message.payload
      })
    })
  }

  getInstance(): Socket {
    if (!this.socket) {
      const accessToken = LocalStorageService.getAccessToken()
      if (!accessToken) throw new Error('Access token is required')
      this.init(accessToken)
    }
    return this.socket as Socket
  }

  sendMessage<T>(
    channel: string,
    payload: {
      eventName: string
      data: {
        uuid: string
        value: T
      }
    },
  ): void {
    if (!payload.eventName || !payload.data.uuid) {
      throw new Error('eventName, uuid are required')
    }
    if (this.socket?.connected) {
      this.socket?.emit(channel, payload)
    }
  }

  close() {
    this.socket?.close()
  }
}

export default new WebsocketService()
