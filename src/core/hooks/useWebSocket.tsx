import { useContext } from 'react'
import { WebSocketContext } from '../provider/WebSocketProvider'

const useWebSocket = () => {
  return useContext(WebSocketContext)
}

export default useWebSocket
