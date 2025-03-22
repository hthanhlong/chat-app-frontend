// import { useShowMenu } from '../../hooks/useShowMenu'
import SearchBar from '../../core/SearchBar/SearchBar'
import LeftTop from '../../core/LeftTop/LeftTop'
import UserList from '../../core/UserList/UserList'
import { LeftContentLayout } from '../../ui'
import { FriendListProvider } from '../../../core/provider'

const ChatLeft = () => {
  return (
    <LeftContentLayout>
      <LeftTop />
      <FriendListProvider>
        <SearchBar />
        <UserList />
      </FriendListProvider>
    </LeftContentLayout>
  )
}

export default ChatLeft
