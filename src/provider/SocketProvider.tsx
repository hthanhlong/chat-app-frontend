import { ReactNode, createContext, useEffect, useState } from 'react'
import { LOCAL_STORAGE_KEY } from '../data'
import { useAuth } from '../hooks/useAuth'
import { ICustomWebSocket } from '../types'

let retries = 0
const maxRetries = 10
const HOST_SOCKET = import.meta.env.VITE_HOST_SOCKET || 'ws://localhost:8081'

type SocketEvent<T> = {
  type: string
  payload: T
}

type SocketStatesContextType = {
  ws: ICustomWebSocket | null
  setWs: (ws: ICustomWebSocket) => void
  socketEvent: SocketEvent<unknown> | null
}

export const SocketStatesContext = createContext<SocketStatesContextType>({
  ws: null,
  setWs: () => {},
  socketEvent: null,
})

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useAuth()
  const [ws, setWs] = useState<ICustomWebSocket | null>(null)
  const [socketEvent, setSocketEvent] = useState<SocketEvent<unknown> | null>(
    null,
  )

  useEffect(() => {
    const initWebSocket = async () => {
      const webSocket = new WebSocket(HOST_SOCKET) as ICustomWebSocket

      webSocket.onopen = () => {
        retries = 0
        webSocket.send(
          JSON.stringify({
            accessToken:
              localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) || '',
            data: { type: 'INIT' },
          }),
        )
      }

      webSocket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data)
        if (data) setSocketEvent(data as SocketEvent<unknown>)
      }

      webSocket.onerror = (event) => console.error('WebSocket error', event)

      webSocket.sendDataToServer = (data) => {
        const accessToken =
          localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) || ''
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
    <SocketStatesContext.Provider value={{ ws, setWs, socketEvent }}>
      {children}
    </SocketStatesContext.Provider>
  )
}

export default SocketProvider
