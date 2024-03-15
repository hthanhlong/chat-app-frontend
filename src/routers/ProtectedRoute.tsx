import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const ProtectedRoute = () => {
  const { isLogged, accessToken } = useAuth()
  if (!isLogged && !accessToken) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
