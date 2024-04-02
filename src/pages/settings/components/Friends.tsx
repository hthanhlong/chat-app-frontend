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
    <div className="w-full">
      <div className="friend-header my-2 flex items-center justify-between px-2">
        <div>
          <span
            className={`mr-2 inline-block w-32 cursor-pointer border-b-2 py-1 text-center dark:text-white ${
              selectedTab === 'list'
                ? 'border-blue-500 text-blue-500 dark:text-blue-500'
                : ''
            }`}
            onClick={() => setSelectedTab('list')}
          >
            List friends
          </span>
          <span
            className={`mr-2 inline-block w-32 cursor-pointer border-b-2 py-1 text-center dark:text-white ${
              selectedTab === 'request'
                ? 'border-blue-500 text-blue-500 dark:text-blue-500'
                : ''
            }`}
            onClick={() => setSelectedTab('request')}
          >
            Friend requests
          </span>
        </div>
      </div>
      <div className="friend-content w-full border-t-[12px] dark:border-slate-600">
        <div className="my-2 flex">
          <input
            type="search"
            placeholder="Search..."
            className="ml-auto block w-1/3 rounded-full border-0 bg-gray-100 py-3 ps-5 text-sm text-black focus:ring-0 dark:bg-slate-800 dark:text-white"
          />
        </div>
        <div className="flex h-[980px] flex-wrap overflow-auto">
          {TABS[selectedTab as keyof typeof TABS]}
        </div>
      </div>
    </div>
  )
}

export default Friends
