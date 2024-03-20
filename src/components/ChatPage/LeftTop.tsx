import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faPlus } from "@fortawesome/free-solid-svg-icons"
import Avatar from "../Avatar/Avatar"
import { Button, Dropdown, Tooltip } from "flowbite-react"
import CustomModal from "../Modal/CustomModal"
import { useState } from "react"
import AddFriends from "../AddFriends/AddFriends"
import { useQuery } from "@tanstack/react-query"
import { getUserById } from "../../axios/user"
import { useAuth } from "../../hooks/useAuth"
import Skeleton from "../Skeleton/Skeleton"

const LeftTop = () => {
  const [openModal, setOpenModal] = useState(false)
  const { id } = useAuth()

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(id),
  })

  return (
    <>
      <div className="flex items-center justify-between border-b-4 p-2">
        {data?.data ? (
          <Avatar name={data?.data.nickname} caption={data.data.caption} />
        ) : (
          <Skeleton />
        )}
        <div className="flex">
          <Tooltip content="Finding new friends">
            <Button
              type="button"
              size="xs"
              onClick={() => setOpenModal(true)}
              className="text-center mr-1 hover:bg-gray-100"
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
