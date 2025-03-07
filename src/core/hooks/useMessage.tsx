import { useContext } from 'react'
import { MessageContext } from '../provider/MessageProvider'

const useMessage = () => {
  return useContext(MessageContext)
}

export default useMessage
