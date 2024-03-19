import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faPlus } from "@fortawesome/free-solid-svg-icons"
import Avatar from "../Avatar/Avatar"
import { Button, Dropdown, Tooltip } from "flowbite-react"
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
          <Tooltip content="Finding new friends">
            <Button
              type="button"
              size="xs"
              onClick={() => setOpenModal(true)}
              className="text-center mr-1 hover:bg-gray-100"
              data-tooltip-target="tooltip-default"
              color="gray"
            >
              <FontAwesomeIcon icon={faPlus} fontSize={20} />
            </Button>
          </Tooltip>
          <Dropdown
            label={<FontAwesomeIcon icon={faBell} fontSize={20} />}
            dismissOnClick={false}
            arrowIcon={false}
            className="h-[400px] w-[400px] overflow-auto shadow-lg"
            placement="bottom-start"
            size="xs"
            color="gray"
          >
            <Dropdown.Header className="flex justify-between">
              <div>Notifications</div>
              <button className="underline">Mark as all read</button>
            </Dropdown.Header>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
              <Avatar />
              <div className="text-left">
                <div>Meena accepted your friend request.</div>
                <div>2h ago</div>
              </div>
            </Dropdown.Item>
          </Dropdown>
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
