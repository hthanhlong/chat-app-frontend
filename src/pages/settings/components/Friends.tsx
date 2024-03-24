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
            className={`inline-block w-32 text-center border-b-2 mr-2 py-1 cursor-pointer dark:text-white ${
              selectedTab === "list"
                ? "border-blue-500 text-blue-500 dark:text-blue-500"
                : ""
            }`}
            onClick={() => setSelectedTab("list")}
          >
            List friends
          </span>
          <span
            className={`inline-block w-32 text-center border-b-2 mr-2 py-1 cursor-pointer dark:text-white ${
              selectedTab === "request"
                ? "border-blue-500 text-blue-500 dark:text-blue-500"
                : ""
            }`}
            onClick={() => setSelectedTab("request")}
          >
            Friend requests
          </span>
        </div>
      </div>
      <div className="friend-content border-t-[12px] w-full dark:border-slate-600">
        <div className="flex my-2">
          <input
            type="search"
            placeholder="Search..."
            className="rounded-full ml-auto w-1/3 block text-sm py-3 ps-5 text-black bg-gray-100 dark:text-white dark:bg-slate-800 focus:ring-0 border-0"
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
