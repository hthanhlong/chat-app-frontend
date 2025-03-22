import { useContext } from 'react'
import { FriendListContext } from '../provider/FriendListProvider'

const useFriendList = () => {
  return useContext(FriendListContext)
}

export default useFriendList
