import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import Avatar from "../Avatar/Avatar"

const RightTop = () => {
  return (
    <div className="border-b-4 flex items-center justify-between">
      <Avatar name="Brett Johnson" caption="Active" />
      <FontAwesomeIcon
        icon={faGear}
        className="mr-3 opacity-20"
        fontSize={26}
      />
    </div>
  )
}

export default RightTop
