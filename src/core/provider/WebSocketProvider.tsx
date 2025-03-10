import { ReactNode, createContext, useEffect, useState } from 'react'
import { hostSocket } from '../../config'
import { LocalStorageService } from '../services'

// let retries = 0
// const maxRetries = 10
type WebSocketEvent = {
  type: string
  payload: unknown
}

interface CustomWebSocket extends WebSocket {
  sendDataToServer: (data: WebSocketEvent) => void
}

type WebSocketContextType = {
  webSocket: CustomWebSocket | null
  setWebSocket: (webSocket: CustomWebSocket) => void
  webSocketEvent: WebSocketEvent | null
}

export const WebSocketContext = createContext<WebSocketContextType>({
  webSocket: null,
  setWebSocket: () => {},
  webSocketEvent: null,
})

const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [webSocket, setWebSocket] = useState<CustomWebSocket | null>(null)
  const [webSocketEvent, setWebSocketEvent] = useState<WebSocketEvent | null>(
    null,
  )

  useEffect(() => {
    const accessToken = LocalStorageService.getAccessToken()
    if (!accessToken) return
    const url = `${hostSocket}/?accessToken=${accessToken}`
    const webSocket = new WebSocket(url) as CustomWebSocket
    webSocket.onmessage = (event: MessageEvent) => {
      setWebSocketEvent(JSON.parse(event.data) as WebSocketEvent)
    }
    webSocket.onclose = (event) => {
      if (event.reason === 'INVALID_ACCESS_TOKEN') {
        const accessToken = LocalStorageService.getAccessToken()
        if (!accessToken) return
        const url = `${hostSocket}/?accessToken=${accessToken}`
        const webSocket = new WebSocket(url) as CustomWebSocket
        setWebSocket(webSocket as CustomWebSocket)
      }
    }
    webSocket.onopen = () => console.log('WebSocket opened')
    webSocket.sendDataToServer = (data: WebSocketEvent) => {
      if (webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(JSON.stringify(data))
      }
    }

    setWebSocket(webSocket as CustomWebSocket)
    return () => {
      if (webSocket) {
        webSocket.close()
      }
    }
  }, [])

  return (
    <WebSocketContext.Provider
      value={{ webSocket, setWebSocket, webSocketEvent }}
    >
      {children}
    </WebSocketContext.Provider>
  )
}

export default WebSocketProvider
