import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../core/hooks'

export const ProtectedRoute = () => {
  const { isLogged } = useAuth()
  if (!isLogged) {
    return <Navigate to="/sign-in" />
  }
  return <Outlet />
}
