import { createContext, useState, ReactNode, useEffect } from 'react'
import { LocalStorageService } from '../services'

export const NotificationContext = createContext<{
  isNotification: boolean
  setIsNotification: (isNotification: boolean) => void
}>({
  isNotification: false,
  setIsNotification: () => {},
})

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [isNotification, setIsNotification] = useState(
    LocalStorageService.getIsNotification() === 'true',
  )

  useEffect(() => {
    LocalStorageService.setIsNotification(isNotification)
  }, [isNotification])

  return (
    <NotificationContext.Provider
      value={{
        isNotification: isNotification,
        setIsNotification: setIsNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
