import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import Avatar from "../Avatar/Avatar"

const LeftTop = () => {
  return (
    <div className="flex items-center">
      <Avatar name="Brett Johnson" caption="This is my Caption" />
      <div className="ml-4">
        <span className="rounded-full p-1 border-2 border-red-200 mr-2">+</span>
        <FontAwesomeIcon icon={faBell} />
      </div>
    </div>
  )
}

export default LeftTop
