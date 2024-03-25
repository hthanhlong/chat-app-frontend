import SearchBar from "../SearchBar/SearchBar"
import LeftTop from "./LeftTop"
import ListUsers from "./ListUsers"
import { PADDING_CONTAINER } from "./utils"

const ChatLeft = () => {
  return (
    <div className="chat-left border-r-[1px] flex flex-col w-[340px] dark:bg-black dark:border-gray-600">
      <div className="chat-left-top">
        <LeftTop />
        <SearchBar
          className={`${PADDING_CONTAINER} py-6 border-b-[1px] dark:border-gray-600`}
        />
      </div>
      <ListUsers />
    </div>
  )
}

export default ChatLeft
