import { ReactNode, createContext, useEffect, useState } from 'react'
import { AUTH_VARIABLE } from '../constant'
import { useAuth } from '../hooks/useAuth'

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

  const init = async () => {
    const ws = new WebSocket('ws://localhost:8081') as CustomWebSocket

    ws.onopen = () => _handleOpen(ws)
    ws.onmessage = _handleOnMessage
    ws.onerror = (event) => console.log('error', event)
    ws.sendDataToServer = (data) => _sendDataToServer(data, ws)
    setWs(ws)
  }

  const _handleOpen = (ws: CustomWebSocket) => {
    ws.send(
      JSON.stringify({
        accessToken: localStorage.getItem(AUTH_VARIABLE.ACCESS_TOKEN) || '',
        data: {
          type: 'INIT',
        },
      }),
    )
  }

  const _sendDataToServer = (
    data: {
      type: string
      payload?: unknown | null
    },
    ws: CustomWebSocket,
  ) => {
    const accessToken = localStorage.getItem(AUTH_VARIABLE.ACCESS_TOKEN) || ''
    const templateData = {
      accessToken,
      data: {
        type: data.type,
        payload: data.payload || null,
      },
    }
    ws.send(JSON.stringify(templateData))
  }

  const _handleOnMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data)
    if (data) {
      setSocketEvent(data as SocketEvent<unknown>)
    }
  }

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws?.sendDataToServer({ type: 'CLOSE_CONNECTION' })
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [ws])

  return (
    <SocketStatesContext.Provider
      value={{
        ws,
        setWs,
        socketEvent,
        setSocketEvent,
      }}
    >
      {children}
    </SocketStatesContext.Provider>
  )
}

export default SocketProvider
