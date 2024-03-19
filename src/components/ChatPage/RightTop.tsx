import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Avatar from "../Avatar/Avatar"
import { Link } from "react-router-dom"
import { faGear } from "@fortawesome/free-solid-svg-icons"

const RightTop = () => {
  return (
    <div className="border-b-4 flex items-center justify-between">
      <div className="p-2">
        <Avatar name="Brett Johnson" caption="Active" />
      </div>
      <Link to="/settings">
        <FontAwesomeIcon
          icon={faGear}
          className="mx-1 p-2 text-gray-500 hover:text-gray-700"
          fontSize={24}
        />
      </Link>
    </div>
  )
}

export default RightTop
