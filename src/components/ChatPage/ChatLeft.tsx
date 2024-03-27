import SearchBar from '../SearchBar/SearchBar'
import LeftTop from './LeftTop'
import ListUsers from './ListUsers'
import { PADDING_CONTAINER } from './utils'

const ChatLeft = () => {
  return (
    <div className="chat-left flex w-[340px] flex-col border-r-[1px] dark:border-gray-600 dark:bg-black">
      <div className="chat-left-top">
        <LeftTop />
        <SearchBar
          className={`${PADDING_CONTAINER} border-b-[1px] py-6 dark:border-gray-600`}
        />
      </div>
      <ListUsers />
    </div>
  )
}

export default ChatLeft
