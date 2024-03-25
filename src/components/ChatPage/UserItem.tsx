import { MouseEventHandler } from "react"
import Avatar from "../Avatar/Avatar"

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
      className={`flex items-center justify-between my-2 p-1 hover:bg-gray-200 hover:dark:bg-slate-800 bg-opacity-0 cursor-pointer mx-1 dark:border-l-4 dark:border-black rounded-s-lg ${
        active
          ? "bg-gray-100 dark:bg-gradient-to-r from-yellow-800 to-black dark:!border-yellow-200"
          : ""
      }`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <Avatar name={name} caption={caption} isOnline={isOnline} />
      <div>
        <div className="text-xs opacity-30 dark:text-gray-300">10:45</div>
        <div className="flex justify-center">
          <p className="bg-red-500 rounded-full text-center text-white text-sm w-5 justify-end dark:text-gray-300">
            5
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserItem
