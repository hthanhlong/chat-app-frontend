import { useState } from 'react'
import ListFriend from './ListFriend'
import FriendRequest from './FriendRequest'
import { useLocation } from 'react-router-dom'

const TABS = {
  list: <ListFriend />,
  request: <FriendRequest />,
}

const Friends = () => {
  const { state } = useLocation()
  const [selectedTab, setSelectedTab] = useState(state?.selectTab || 'list')

  return (
    <>
      <div className="flex min-h-[80px] items-center justify-between border-b-[1px] border-gray-600 px-2">
        <div>
          <span
            className={`inline-block w-32 cursor-pointer text-center leading-[79px] ${
              selectedTab === 'list'
                ? 'text-blue-500 dark:text-blue-500'
                : 'text-gray-400 dark:text-gray-400'
            }`}
            onClick={() => setSelectedTab('list')}
          >
            List friends
          </span>
          <span
            className={`inline-block w-32 cursor-pointer text-center leading-[79px] ${
              selectedTab === 'request'
                ? 'text-blue-500 dark:text-blue-500'
                : 'text-gray-400 dark:text-gray-400'
            }`}
            onClick={() => setSelectedTab('request')}
          >
            Friend requests
          </span>
        </div>
        <input
          type="search"
          placeholder="Search..."
          className="max-h-[40px] w-1/3 rounded-full border-0 bg-gray-100 py-3 ps-5 text-sm text-black focus:ring-0 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div className="friend-content w-full dark:border-slate-600">
        <div className="mt-2 flex min-h-[570px] flex-wrap overflow-auto">
          {TABS[selectedTab as keyof typeof TABS]}
        </div>
      </div>
    </>
  )
}

export default Friends
