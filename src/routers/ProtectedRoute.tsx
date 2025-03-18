import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../core/hooks'
import { WebsocketService } from '../core/services'
import { LocalStorageService } from '../core/services'
import { Loading } from '../pages'

export const ProtectedRoute = () => {
  const { isLogged } = useAuth()
  const [isInitWebSocket, setIsInitWebSocket] = useState(false)

  useEffect(() => {
    const initWebSocket = async () => {
      const accessToken = LocalStorageService.getAccessToken()
      if (!accessToken) return
      if (isInitWebSocket) return
      try {
        await WebsocketService.init(accessToken)
        setIsInitWebSocket(true)
      } catch (error) {
        console.log('error', error)
      }
    }
    initWebSocket()
  }, [])

  if (!isLogged) return <Navigate to="/sign-in" />
  if (!isInitWebSocket) return <Loading />
  return <Outlet />
}
