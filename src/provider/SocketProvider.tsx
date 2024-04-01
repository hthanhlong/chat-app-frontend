import { ReactNode, createContext, useEffect, useState } from 'react'
import { AUTH_VARIABLE } from '../constant'
import { useAuth } from '../hooks/useAuth'

let retries = 0
const maxRetries = 10

type SocketEvent<T> = {
  type: string
  payload: T
}

type SocketStatesContextType = {
  ws: CustomWebSocket | null
  setWs: (ws: CustomWebSocket) => void
  socketEvent: SocketEvent<unknown> | null
  setSocketEvent: (data: SocketEvent<unknown> | null) => void
}

export const SocketStatesContext = createContext<SocketStatesContextType>({
  ws: null,
  setWs: () => {},
  socketEvent: null,
  setSocketEvent: () => {},
})

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useAuth()
  const [ws, setWs] = useState<CustomWebSocket | null>(null)
  const [socketEvent, setSocketEvent] = useState<SocketEvent<unknown> | null>(
    null,
  )

  useEffect(() => {
    const initWebSocket = async () => {
      const webSocket = new WebSocket('ws://localhost:8081') as CustomWebSocket

      webSocket.onopen = () => {
        retries = 0
        webSocket.send(
          JSON.stringify({
            accessToken: localStorage.getItem(AUTH_VARIABLE.ACCESS_TOKEN) || '',
            data: { type: 'INIT' },
          }),
        )
      }

      webSocket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data)
        if (data) {
          setSocketEvent(data as SocketEvent<unknown>)
        }
      }

      webSocket.onerror = (event) => console.error('WebSocket error', event)

      webSocket.sendDataToServer = (data) => {
        const accessToken =
          localStorage.getItem(AUTH_VARIABLE.ACCESS_TOKEN) || ''
        webSocket.send(
          JSON.stringify({
            accessToken,
            data: {
              type: data.type,
              payload: data.payload || null,
            },
          }),
        )
      }

      webSocket.onclose = () => {
        if (retries < maxRetries) {
          setTimeout(initWebSocket, 3000)
          retries++
        }
      }
      setWs(webSocket)
    }

    initWebSocket()
  }, [id])

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.sendDataToServer({ type: 'CLOSE_CONNECTION' })
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [ws])

  return (
    <SocketStatesContext.Provider
      value={{ ws, setWs, socketEvent, setSocketEvent }}
    >
      {children}
    </SocketStatesContext.Provider>
  )
}

export default SocketProvider
