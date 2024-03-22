import { ReactNode, createContext, useMemo, useState } from "react"

type SocketStatesContextType = {
  ws: WebSocket | null
  isHasNotification: boolean
  setIsHasNotification: (isHasNotification: boolean) => void
  setWs: (ws: WebSocket) => void
}

export const SocketStatesContext = createContext<SocketStatesContextType>({
  ws: null,
  isHasNotification: false,
  setIsHasNotification: () => {},
  setWs: () => {},
})

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [isHasNotification, setIsHasNotification] = useState(false)
  const [ws, setWs] = useState<WebSocket | null>(null)

  const contextValue = useMemo(
    () => ({
      ws,
      setWs,
      isHasNotification,
      setIsHasNotification,
    }),
    [isHasNotification, ws]
  )

  return (
    <SocketStatesContext.Provider value={contextValue}>
      {children}
    </SocketStatesContext.Provider>
  )
}

export default SocketProvider
