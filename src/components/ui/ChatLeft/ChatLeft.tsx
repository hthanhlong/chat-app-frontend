// import { useShowMenu } from '../../hooks/useShowMenu'
import SearchBar from '../../core/SearchBar/SearchBar'
import LeftTop from '../../core/LeftTop/LeftTop'
import ListUsers from '../../core/ListUsers/ListUsers'

const ChatLeft = () => {
  return (
    <>
      <LeftTop />
      <SearchBar />
      <ListUsers />
    </>
  )
}

export default ChatLeft
