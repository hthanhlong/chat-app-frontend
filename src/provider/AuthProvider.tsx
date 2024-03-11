import { http } from "../axios"
import { ReactNode, createContext, useEffect, useMemo, useState } from "react"

type AuthContextType = {
  token: string
  setToken: (newToken: string) => void
}

export const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"))
  
  const setToken = (newToken: string) => {
    setToken_(newToken)
  }

  useEffect(() => {
    if (token) {
      http.defaults.headers.common["Authorization"] = "Bearer " + token
      localStorage.setItem("token", token)
    } else {
      delete http.defaults.headers.common["Authorization"]
      localStorage.removeItem("token")
    }
  }, [token])

  const contextValue = useMemo(
    () => ({
      token: token || "",
      setToken,
    }),
    [token]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
