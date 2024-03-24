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
      className={`flex items-center justify-between my-2 p-1 hover:bg-gray-200 hover:dark:bg-slate-800 hover:rounded-md cursor-pointer mx-1 ${
        active ? "bg-gray-100 dark:bg-slate-800 rounded-md" : ""
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
