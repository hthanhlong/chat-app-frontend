import { Button } from "flowbite-react"
import Avatar from "../Avatar/Avatar"

const AddFriends = () => {
  return (
    <div>
      <input
        type="search"
        placeholder="Search friends"
        className="w-full rounded"
      />
      <div className="mt-4">
        <ul>
          <li className="flex justify-between my-3 p-1">
            <Avatar name="Brett Johnson" size="md" />
            <Button size="xs">+ Add Friend</Button>
          </li>
          <li className="flex justify-between my-3 p-1">
            <Avatar name="Brett Johnson" size="md" />
            <Button size="xs">+ Add Friend</Button>
          </li>
          <li className="flex justify-between my-3 p-1">
            <Avatar name="Brett Johnson" size="md" />
            <Button size="xs">+ Add Friend</Button>
          </li>
          <li className="flex justify-between my-3 p-1">
            <Avatar name="Brett Johnson" size="md" />
            <Button size="xs">+ Add Friend</Button>
          </li>
          <li className="flex justify-between my-3 p-1">
            <Avatar name="Brett Johnson" size="md" />
            <Button size="xs">+ Add Friend</Button>
          </li>
          <li className="flex justify-between my-3 p-1">
            <Avatar name="Brett Johnson" size="md" />
            <Button size="xs">+ Add Friend</Button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AddFriends
