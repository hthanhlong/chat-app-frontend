import { ReactNode, createContext, useEffect, useState } from 'react'
import { LocalStorageService } from '../services'
import { ISignInResponse } from '../../types'

type AuthContextType = {
  uuid: string
  name: string
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
  uuid: '',
  name: '',
  isLogged: false,
  setAuth: (response: ISignInResponse) => {
    LocalStorageService.setUserUuid(response.uuid ?? '')
    LocalStorageService.setUsername(response.name ?? '')
    LocalStorageService.setAccessToken(response.accessToken ?? '')
    LocalStorageService.setRefreshToken(response.refreshToken ?? '')
  },
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authObject, setAuthObject_] = useState({
    uuid: LocalStorageService.getUserUuid(),
    name: LocalStorageService.getUsername(),
    accessToken: LocalStorageService.getAccessToken(),
    refreshToken: LocalStorageService.getRefreshToken(),
    isLogged: helperIsLogged(LocalStorageService.getIsLogged()),
  })

  const setAuth = (data: ISignInResponse) => {
    setAuthObject_((prev) => ({ ...prev, ...data, isLogged: true }))
  }

  useEffect(() => {
    if (authObject.accessToken) {
      LocalStorageService.setUserUuid(authObject.uuid ?? '')
      LocalStorageService.setUsername(authObject.name ?? '')
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
        uuid: authObject.uuid || '',
        name: authObject.name || '',
        isLogged: authObject.isLogged || false,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
