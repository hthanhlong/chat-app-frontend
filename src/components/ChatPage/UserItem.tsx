import Avatar from "../Avatar/Avatar"

const UserItem = ({
  name,
  caption,
  active,
  onClick,
}: {
  name: string
  caption: string
  active?: boolean
  onClick?: () => void
}) => {
  return (
    <div
      className={`flex items-center justify-between my-2 p-1 hover:bg-gray-100 hover:rounded-md cursor-pointer mx-1 ${
        active ? "bg-gray-100 rounded-md" : ""
      }`}
      onClick={onClick}
    >
      <Avatar name={name} caption={caption} />
      <div>
        <div className="text-xs opacity-30">10:45</div>
        <div className="flex justify-center">
          <p className="bg-red-500 rounded-full text-center text-white text-sm w-5 justify-end">
            5
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserItem
