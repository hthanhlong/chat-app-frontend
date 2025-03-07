import { ReactNode, createContext, useEffect, useState } from 'react'
import { LocalStorageService } from '../services'

type AuthContextType = {
  id: string
  username: string
  accessToken: string
  refreshToken: string
  isLogged: boolean
  setAuth: (data: Record<string, unknown>) => void
}

const helperIsLogged = (data: string | null) => {
  if (data === 'true') {
    return true
  }
  return false
}

export const AuthContext = createContext<AuthContextType>({
  id: '',
  username: '',
  accessToken: '',
  refreshToken: '',
  isLogged: false,
  setAuth: () => {},
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authObject, setAuthObject_] = useState({
    id: LocalStorageService.getId(),
    username: LocalStorageService.getUsername(),
    accessToken: LocalStorageService.getAccessToken(),
    refreshToken: LocalStorageService.getRefreshToken(),
    isLogged: helperIsLogged(LocalStorageService.getIsLogged()),
  })

  const setAuth = (data: Record<string, unknown>) => {
    setAuthObject_((prev) => ({ ...prev, ...data, isLogged: true }))
  }

  useEffect(() => {
    const handleLocalStorageChange = (event: StorageEvent) => {
      if (event.key === LocalStorageService.LOCAL_STORAGE_KEY.ACCESS_TOKEN) {
        setAuthObject_((prev) => ({ ...prev, accessToken: event.newValue }))
      }
    }
    window.addEventListener('storage', handleLocalStorageChange)
    return () => {
      window.removeEventListener('storage', handleLocalStorageChange)
    }
  }, [])

  useEffect(() => {
    if (authObject.accessToken) {
      LocalStorageService.setId(authObject.id ?? '')
      LocalStorageService.setUsername(authObject.username ?? '')
      LocalStorageService.setAccessToken(authObject.accessToken)
      LocalStorageService.setIsLogged(authObject.isLogged)
      LocalStorageService.setRefreshToken(authObject.refreshToken ?? '')
    } else {
      LocalStorageService.clear()
    }
  }, [authObject])

  return (
    <AuthContext.Provider
      value={{
        id: authObject.id || '',
        username: authObject.username || '',
        accessToken: authObject.accessToken || '',
        refreshToken: authObject.refreshToken || '',
        isLogged: authObject.isLogged || false,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
