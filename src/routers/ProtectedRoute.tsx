import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../core/hooks'

export const ProtectedRoute = () => {
  const { isLogged, accessToken } = useAuth()
  if (!isLogged && !accessToken) {
    return <Navigate to="/sign-in" />
  }
  return <Outlet />
}
