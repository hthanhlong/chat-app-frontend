import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faPlus } from "@fortawesome/free-solid-svg-icons"
import Avatar from "../Avatar/Avatar"
// import Ping from "../Ping/Ping"
import CustomModal from "../Modal/CustomModal"
import { useState } from "react"
import AddFriends from "../AddFriends/AddFriends"

const LeftTop = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between border-b-4 p-2">
        <Avatar name="Brett Johnson" caption="This is my Caption" />
        <div className="flex">
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="p-[5px] text-center mr-3 border-[1px] rounded-xl hover:bg-gray-100"
            data-tooltip-target="tooltip-default"
          >
            <FontAwesomeIcon icon={faPlus} fontSize={20} />
          </button>
          <button className="relative mr-4 p-[5px] text-center border-[1px] rounded-xl">
            <FontAwesomeIcon icon={faBell} fontSize={20} />
            {/* <Ping /> */}
          </button>
        </div>
      </div>
      <div
        id="tooltip-default"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Finding friends
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
      <CustomModal
        header="Finding friends"
        body={<AddFriends />}
        openModal={openModal}
        size="lg"
        onAccept={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
      />
    </>
  )
}

export default LeftTop
