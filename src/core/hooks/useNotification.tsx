import { useContext } from 'react'
import { NotificationContext } from '../provider/NotificationProvider'

const useNotification = () => {
  return useContext(NotificationContext)
}

export default useNotification
