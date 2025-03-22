import { ReactNode, createContext, useState } from 'react'
import { IFriend } from '../../types'

type FriendListProviderContextType = {
  friendList: IFriend[]
  setFriendList: (list: IFriend[]) => void
}

export const FriendListContext = createContext<FriendListProviderContextType>({
  friendList: [],
  setFriendList: () => {},
})

const FriendListProvider = ({ children }: { children: ReactNode }) => {
  const [friendList, setFriendList] = useState<IFriend[]>([])
  return (
    <FriendListContext.Provider
      value={{ friendList, setFriendList } as FriendListProviderContextType}
    >
      {children}
    </FriendListContext.Provider>
  )
}

export default FriendListProvider
