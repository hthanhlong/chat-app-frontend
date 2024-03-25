import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Avatar from "../Avatar/Avatar"
import { Button, Tooltip } from "flowbite-react"
import CustomModal from "../Modal/CustomModal"
import { useState } from "react"
import AddFriends from "../AddFriends/AddFriends"
import { useQuery } from "@tanstack/react-query"
import { getUserById } from "../../axios/user"
import { useAuth } from "../../hooks/useAuth"
import Skeleton from "../Skeleton/Skeleton"
import Notification from "./Notification"

const LeftTop = () => {
  const [openModal, setOpenModal] = useState(false)
  const { id } = useAuth()

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(id),
  })

  return (
    <>
      <div className="flex items-center justify-between border-b-[1px] p-2 dark:border-gray-600">
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
              className="text-center mr-2 hover:bg-gray-100"
              color="gray"
            >
              <FontAwesomeIcon icon={faPlus} fontSize={20} />
            </Button>
          </Tooltip>
          <Notification />
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
