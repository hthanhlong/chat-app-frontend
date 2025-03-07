import { useContext } from 'react'
import { SelectedUserChatContext } from '../provider/SelectedUserChatProvider'

const useSelectedUserChat = () => {
  return useContext(SelectedUserChatContext)
}

export default useSelectedUserChat
