import { useState } from "react"
import ListFriend from "./ListFriend"
import FriendRequest from "./FriendRequest"

const TABS = {
  list: <ListFriend />,
  request: <FriendRequest />,
}

const Friends = () => {
  const [selectedTab, setSelectedTab] = useState("list")

  return (
    <div className="w-full">
      <div className="friend-header flex justify-between items-center px-2 my-2">
        <div>
          <span
            className={`inline-block w-32 text-center border-b-2 mr-2 py-1 cursor-pointer ${
              selectedTab === "list" ? "border-blue-500 text-blue-500" : ""
            }`}
            onClick={() => setSelectedTab("list")}
          >
            List friends
          </span>
          <span
            className={`inline-block w-32 text-center border-b-2 mr-2 py-1 cursor-pointer ${
              selectedTab === "request" ? "border-blue-500 text-blue-500" : ""
            }`}
            onClick={() => setSelectedTab("request")}
          >
            Friend requests
          </span>
        </div>
      </div>
      <div className="friend-content border-t-[12px] w-full">
        <div className="flex my-2">
          <input
            type="search"
            placeholder="search..."
            className="rounded-full ml-auto w-1/3"
          />
        </div>
        <div className="flex flex-wrap h-[980px] overflow-auto">
          {TABS[selectedTab as keyof typeof TABS]}
        </div>
      </div>
    </div>
  )
}

export default Friends
