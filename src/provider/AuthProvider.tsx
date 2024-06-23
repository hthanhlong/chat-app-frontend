import { ReactNode, createContext, useEffect, useState } from 'react'
import { LOCAL_STORAGE_KEY } from '../data'
import { clearLocalStorage } from '../helper'

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
    id: localStorage.getItem(LOCAL_STORAGE_KEY.ID),
    username: localStorage.getItem(LOCAL_STORAGE_KEY.USERNAME),
    accessToken: localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN),
    refreshToken: localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN),
    isLogged: helperIsLogged(localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED)),
  })

  const setAuth = (data: Record<string, unknown>) => {
    setAuthObject_((prev) => ({ ...prev, ...data, isLogged: true }))
  }

  useEffect(() => {
    const handleLocalStorageChange = (event: StorageEvent) => {
      if (event.key === LOCAL_STORAGE_KEY.ACCESS_TOKEN) {
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
      localStorage.setItem(LOCAL_STORAGE_KEY.ID, authObject.id ?? '')
      localStorage.setItem(
        LOCAL_STORAGE_KEY.USERNAME,
        authObject.username ?? '',
      )
      localStorage.setItem(
        LOCAL_STORAGE_KEY.ACCESS_TOKEN,
        authObject.accessToken,
      )
      localStorage.setItem(
        LOCAL_STORAGE_KEY.IS_LOGGED,
        authObject.isLogged.toString(),
      )
      localStorage.setItem(
        LOCAL_STORAGE_KEY.REFRESH_TOKEN,
        authObject.refreshToken ?? '',
      )
    } else {
      clearLocalStorage()
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
