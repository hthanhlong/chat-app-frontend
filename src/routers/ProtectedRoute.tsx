import { useEffect, useRef, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../core/hooks'
import { WebsocketService } from '../core/services'
import { LocalStorageService } from '../core/services'
import { Loading } from '../pages'

export const ProtectedRoute = () => {
  const { isLogged } = useAuth()
  const [isInitWebSocket, setIsInitWebSocket] = useState(false)
  const retryCount = useRef(0)

  useEffect(() => {
    const initWebSocket = async () => {
      const accessToken = LocalStorageService.getAccessToken()
      if (!accessToken) return
      try {
        const result = await WebsocketService.init(accessToken)
        if (result === 'connected') {
          retryCount.current = 0
          setIsInitWebSocket(true)
          return
        }
        if (result === 'disconnected') {
          retryCount.current++
          if (retryCount.current < 3) {
            setTimeout(() => {
              initWebSocket()
            }, 5000)
          } else {
            setIsInitWebSocket(false)
          }
        }
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
