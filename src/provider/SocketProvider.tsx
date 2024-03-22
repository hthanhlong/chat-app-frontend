import { ReactNode, createContext, useMemo, useState } from "react"

type SocketStatesContextType = {
  ws: CusTomeWebSocket | null
  setWs: (ws: CusTomeWebSocket) => void
  listOnLineUsers: string[]
  setListOnLineUsers: (listOnLineUsers: string[]) => void
  isHasNotification: boolean
  setIsHasNotification: (isHasNotification: boolean) => void
}

export const SocketStatesContext = createContext<SocketStatesContextType>({
  ws: null,
  setWs: () => {},
  listOnLineUsers: [],
  setListOnLineUsers: () => {},
  isHasNotification: false,
  setIsHasNotification: () => {},
})

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [isHasNotification, setIsHasNotification] = useState(false)
  const [ws, setWs] = useState<CusTomeWebSocket | null>(null)
  const [listOnLineUsers, setListOnLineUsers] = useState<string[]>([])

  const contextValue = useMemo(
    () => ({
      ws,
      setWs,
      listOnLineUsers,
      setListOnLineUsers,
      isHasNotification,
      setIsHasNotification,
    }),
    [listOnLineUsers, isHasNotification, ws]
  )

  return (
    <SocketStatesContext.Provider value={contextValue}>
      {children}
    </SocketStatesContext.Provider>
  )
}

export default SocketProvider
