import { hostSocket } from '../../config'
import LocalStorageService from './LocalStorageService'

class WebsocketService {
  webSocket: WebSocket | null = null
  type: string = ''
  payload: unknown = null

  init(accessToken: string) {
    const url = `${hostSocket}/?accessToken=${accessToken}`
    const webSocket = new WebSocket(url)
    this.webSocket = webSocket
    webSocket.onopen = () => {
      console.log('WebSocket connected')
    }
    webSocket.onclose = () => {
      console.log('WebSocket disconnected')
    }
    webSocket.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data)
      this.type = message.type
      this.payload = message.payload
    }
    return webSocket
  }

  getInstance() {
    if (!this.webSocket) {
      const accessToken = LocalStorageService.getAccessToken()
      if (!accessToken) {
        return
      }
      this.init(accessToken)
    }
    return this.webSocket
  }

  sendMessage(message: string) {
    this.webSocket?.send(message)
  }

  sendDataToServer(data: { type: string; payload: unknown }) {
    if (this.webSocket?.readyState === WebSocket.OPEN) {
      this.webSocket?.send(JSON.stringify(data))
    }
  }

  close() {
    this.webSocket?.close()
  }
}

export default new WebsocketService()
