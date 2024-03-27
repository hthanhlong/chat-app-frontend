import { MouseEventHandler } from 'react'
import Avatar from '../Avatar/Avatar'

const UserItem = ({
  name,
  caption,
  active,
  onClick,
  onContextMenu,
  isOnline,
}: {
  name: string
  caption: string
  active?: boolean
  isOnline?: boolean
  onClick?: MouseEventHandler
  onContextMenu?: MouseEventHandler
}) => {
  return (
    <div
      className={`mx-1 my-2 flex cursor-pointer items-center justify-between rounded-s-lg bg-opacity-0 p-1 dark:border-l-4 dark:border-black hover:dark:bg-slate-800 ${
        active
          ? '!bg-gray-100 from-yellow-800 to-black dark:!border-yellow-200 dark:bg-gradient-to-r'
          : 'hover:bg-gray-100 dark:border-slate-800 dark:border-transparent dark:border-opacity-50 dark:hover:bg-slate-800'
      }`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <Avatar name={name} caption={caption} isOnline={isOnline} />
      <div>
        <div className="text-xs opacity-30 dark:text-gray-300">10:45</div>
        <div className="flex justify-center">
          <p className="w-5 justify-end rounded-full bg-red-500 text-center text-sm text-white dark:text-gray-300">
            5
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserItem
