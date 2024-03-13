import { ReactNode, createContext, useEffect, useMemo, useState } from "react"

type LoadingContextType = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
})

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)

  const contextValue = useMemo(
    () => ({
      isLoading,
      setIsLoading,
    }),
    [isLoading]
  )

  useEffect(() => {
    return () => {
      setIsLoading(false)
    }
  }, [isLoading])

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
