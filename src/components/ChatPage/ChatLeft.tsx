import SearchBar from "../SearchBar/SearchBar"
import LeftTop from "./LeftTop"
import ListUsers from "./ListUsers"
import { PADDING_CONTAINER } from "./utils"

const ChatLeft = () => {
  return (
    <div className="chat-left border-r-4 flex flex-col bg-red-100">
      <LeftTop />
      <SearchBar className={`${PADDING_CONTAINER} py-6`} />
      <div className="flex-1 overflow-scroll">
        <ListUsers />
      </div>
    </div>
  )
}

export default ChatLeft
