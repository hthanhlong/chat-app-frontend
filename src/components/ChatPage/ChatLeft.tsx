import SearchBar from "../SearchBar/SearchBar"
import LeftTop from "./LeftTop"
import ListUsers from "./ListUsers"
import { PADDING_CONTAINER } from "./utils"

const ChatLeft = () => {
  return (
    <div className="chat-left border-r-4 flex flex-col w-[340px]">
      <LeftTop />
      <SearchBar className={`${PADDING_CONTAINER} py-6 border-b-4`} />
      <ListUsers />
    </div>
  )
}

export default ChatLeft
