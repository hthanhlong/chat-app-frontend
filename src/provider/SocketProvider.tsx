import { ReactNode, createContext, useEffect, useState } from 'react'
import { LOCAL_STORAGE_KEY } from '../data'
import { useAuth } from '../hooks/useAuth'
import { ICustomWebSocket } from '../types'
import { hostSocket } from '../config'
let retries = 0
const maxRetries = 10

type SocketEvent<T> = {
  type: string
  payload: T
}

type SocketStatesContextType = {
  ws: ICustomWebSocket | null
  setWs: (ws: ICustomWebSocket) => void
  socketListener: SocketEvent<unknown> | null
}

export const SocketStatesContext = createContext<SocketStatesContextType>({
  ws: null,
  setWs: () => {},
  socketListener: null,
})

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useAuth()
  const [ws, setWs] = useState<ICustomWebSocket | null>(null)
  const [socketListener, setSocketListener] =
    useState<SocketEvent<unknown> | null>(null)

  useEffect(() => {
    if (!id) return
    if (ws) return
    const initWebSocket = async () => {
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
      if (!accessToken) return
      const url = `${hostSocket}/?accessToken=${accessToken}`
      const webSocket = new WebSocket(url) as ICustomWebSocket
      webSocket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data) as SocketEvent<unknown>
        if (data) setSocketListener(data)
      }
      webSocket.sendDataToServer = (data: {
        type: string
        payload?: unknown
      }) => {
        webSocket.send(JSON.stringify(data))
      }
      webSocket.onerror = (event) => console.error('WebSocket error', event)
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

  return (
    <SocketStatesContext.Provider value={{ ws, setWs, socketListener }}>
      {children}
    </SocketStatesContext.Provider>
  )
}

export default SocketProvider
