import { createContext, useState, ReactNode, useEffect } from 'react'
import { LOCAL_STORAGE_KEY } from '../data'

export const NotificationContext = createContext<{
  isNotification: boolean
  setIsNotification: (isNotification: boolean) => void
}>({
  isNotification: false,
  setIsNotification: () => {},
})

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [isNotification, setIsNotification] = useState(
    window.localStorage.getItem(LOCAL_STORAGE_KEY.IS_NOTIFICATION) === 'true',
  )

  useEffect(() => {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY.IS_NOTIFICATION,
      isNotification.toString(),
    )
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
