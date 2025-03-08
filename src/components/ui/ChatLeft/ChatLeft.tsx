// import { useShowMenu } from '../../hooks/useShowMenu'
import SearchBar from '../../core/SearchBar/SearchBar'
import LeftTop from '../../core/LeftTop/LeftTop'
import ListUsers from '../../core/ListUsers/ListUsers'
import { LeftContentLayout } from '../../ui'

const ChatLeft = () => {
  return (
    <LeftContentLayout>
      <LeftTop />
      <SearchBar />
      <ListUsers />
    </LeftContentLayout>
  )
}

export default ChatLeft
