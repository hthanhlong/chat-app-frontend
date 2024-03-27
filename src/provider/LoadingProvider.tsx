import { ReactNode, createContext, useMemo, useState } from 'react'

type LoadingContextType = {
  isLoading: boolean
  setGlobalLoading: (isLoading: boolean) => void
}

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setGlobalLoading: () => {},
})

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setGlobalLoading] = useState(false)

  const contextValue = useMemo(
    () => ({
      isLoading,
      setGlobalLoading,
    }),
    [isLoading],
  )

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
