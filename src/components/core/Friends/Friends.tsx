import { useState } from 'react'
import FriendList from '../FriendList/FriendList'
import FriendRequest from '../FriendRequest/FriendRequest'
import { useLocation } from 'react-router-dom'

const TABS = {
  list: <FriendList />,
  request: <FriendRequest />,
}

const Friends = () => {
  const { state } = useLocation()
  const [selectedTab, setSelectedTab] = useState(state?.selectTab || 'list')

  return (
    <div className="h-full bg-white dark:bg-black max-lg:flex max-lg:flex-1 max-lg:flex-col">
      <div className="flex items-center justify-between border-b-[1px] border-gray-600 px-2 max-lg:flex-col">
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
          className="h-[40px] w-1/3 rounded-full border-0 bg-gray-100 py-3 ps-5 text-sm text-black focus:ring-0 dark:bg-slate-800 dark:text-white max-lg:mb-2 max-lg:w-full"
        />
      </div>
      {TABS[selectedTab as keyof typeof TABS]}
    </div>
  )
}

export default Friends
