import { useContext } from 'react'
import { SelectedUserChatContext } from '../provider/SelectedUserChatProvider'

export const useSelectedUserChat = () => {
  return useContext(SelectedUserChatContext)
}
