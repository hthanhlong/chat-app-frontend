import { ReactNode, createContext, useMemo, useState } from "react"

type SocketStatesContextType = {
  isHasNotification: boolean
  setIsHasNotification: (isHasNotification: boolean) => void
}

export const SocketStatesContext = createContext<SocketStatesContextType>({
  isHasNotification: false,
  setIsHasNotification: () => {},
})

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [isHasNotification, setIsHasNotification] = useState(false)

  const contextValue = useMemo(
    () => ({
      isHasNotification,
      setIsHasNotification,
    }),
    [isHasNotification]
  )

  return (
    <SocketStatesContext.Provider value={contextValue}>
      {children}
    </SocketStatesContext.Provider>
  )
}

export default SocketProvider
