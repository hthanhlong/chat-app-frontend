import Avatar from "../Avatar/Avatar"

const UserItem = () => {
  return (
    <div className="flex items-center justify-between pr-4 my-2 hover:bg-gray-200 hover:rounded-md cursor-pointer">
      <Avatar name="Brett Johnson" caption="This is my caption" />
      <div>
        <div className="text-sm opacity-30">10:45</div>
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
