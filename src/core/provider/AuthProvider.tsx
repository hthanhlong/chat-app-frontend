import { ReactNode, createContext, useEffect, useState } from 'react'
import { LocalStorageService } from '../services'
import { ISignInResponse } from '../../types'

type AuthContextType = {
  userUuid: string
  username: string
  isLogged: boolean
  setAuth: (data: ISignInResponse) => void
}

const helperIsLogged = (data: string | null) => {
  if (data === 'true') {
    return true
  }
  return false
}

export const AuthContext = createContext<AuthContextType>({
  userUuid: '',
  username: '',
  isLogged: false,
  setAuth: (response: ISignInResponse) => {
    LocalStorageService.setUserId(response.id ?? '')
    LocalStorageService.setUsername(response.username ?? '')
    LocalStorageService.setAccessToken(response.accessToken ?? '')
    LocalStorageService.setRefreshToken(response.refreshToken ?? '')
  },
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authObject, setAuthObject_] = useState({
    userUuid: LocalStorageService.getUserId(),
    username: LocalStorageService.getUsername(),
    accessToken: LocalStorageService.getAccessToken(),
    refreshToken: LocalStorageService.getRefreshToken(),
    isLogged: helperIsLogged(LocalStorageService.getIsLogged()),
  })

  const setAuth = (data: ISignInResponse) => {
    setAuthObject_((prev) => ({ ...prev, ...data, isLogged: true }))
  }

  useEffect(() => {
    if (authObject.accessToken) {
      LocalStorageService.setUserId(authObject.userUuid ?? '')
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
        userUuid: authObject.userUuid || '',
        username: authObject.username || '',
        isLogged: authObject.isLogged || false,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
