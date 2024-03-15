import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faPlus } from "@fortawesome/free-solid-svg-icons"
import Avatar from "../Avatar/Avatar"
import Ping from "../Ping/Ping"

const LeftTop = () => {
  return (
    <div className="flex items-center">
      <Avatar name="Brett Johnson" caption="This is my Caption" />
      <div className="ml-auto mr-4">
        <button>
          <FontAwesomeIcon
            icon={faPlus}
            className="mx-1 p-2 border-2 rounded-full"
          />
        </button>
        <button className="relative">
          <FontAwesomeIcon
            icon={faBell}
            className="mx-1 p-2 border-2 rounded-full"
          />
          <Ping />
        </button>
      </div>
    </div>
  )
}

export default LeftTop
