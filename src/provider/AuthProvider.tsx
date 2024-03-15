import { http } from "../axios"
import { ReactNode, createContext, useEffect, useMemo, useState } from "react"
import { AUTH_VARIABLE } from "../constant"

type AuthContextType = {
  id: string
  username: string
  accessToken: string
  refreshToken: string
  isLogged: boolean
  setAuth: (data: Record<string, unknown>) => void
}

const helperIsLogged = (data: string | null) => {
  if (data === "true") {
    return true
  }
  return false
}

export const AuthContext = createContext<AuthContextType>({
  id: "",
  username: "",
  accessToken: "",
  refreshToken: "",
  isLogged: false,
  setAuth: () => {},
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authObject, setAuthObject_] = useState({
    id: localStorage.getItem(AUTH_VARIABLE.ID) || "",
    username: localStorage.getItem(AUTH_VARIABLE.USERNAME),
    accessToken: localStorage.getItem(AUTH_VARIABLE.ACCESS_TOKEN),
    refreshToken: localStorage.getItem(AUTH_VARIABLE.REFRESH_TOKEN),
    isLogged: helperIsLogged(localStorage.getItem(AUTH_VARIABLE.IS_LOGGED)),
  })

  console.log("authObject", authObject)

  const setAuth = (data: Record<string, unknown>) => {
    setAuthObject_((prev) => ({ ...prev, ...data, isLogged: true }))
  }

  const contextValue = useMemo(
    () => ({
      id: authObject.id || "",
      username: authObject.username || "",
      accessToken: authObject.accessToken || "",
      refreshToken: authObject.refreshToken || "",
      isLogged: authObject.isLogged || false,
      setAuth,
    }),
    [authObject]
  )

  useEffect(() => {
    if (authObject.accessToken) {
      http.defaults.headers.common["Authorization"] =
        "Bearer " + authObject.accessToken
      localStorage.setItem(AUTH_VARIABLE.ID, authObject.id)
      localStorage.setItem(AUTH_VARIABLE.USERNAME, authObject.username ?? "")
      localStorage.setItem(AUTH_VARIABLE.ACCESS_TOKEN, authObject.accessToken)
      localStorage.setItem(
        AUTH_VARIABLE.IS_LOGGED,
        authObject.isLogged.toString()
      )
      localStorage.setItem(
        AUTH_VARIABLE.REFRESH_TOKEN,
        authObject.refreshToken ?? ""
      )
    } else {
      delete http.defaults.headers.common["Authorization"]
      localStorage.removeItem(AUTH_VARIABLE.ACCESS_TOKEN)
      localStorage.removeItem(AUTH_VARIABLE.REFRESH_TOKEN)
    }
  }, [authObject])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
