import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { Dropdown } from "flowbite-react"
import Avatar from "../Avatar/Avatar"
import { useAuth } from "../../hooks/useAuth"
import {
  getAllNotifications,
  updateNotification,
} from "../../axios/notification"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Skeleton from "../Skeleton/Skeleton"
import { useSocketStates } from "../../hooks/useSocketStates"
import Ping from "../Ping/Ping"

const Notification = () => {
  const { id } = useAuth()
  const queryClient = useQueryClient()
  const { isHasNotification } = useSocketStates()

  const { data: listNotis, isLoading } = useQuery({
    queryKey: ["notifications", id],
    queryFn: () => getAllNotifications(id),
  })

  const { mutate } = useMutation({
    mutationFn: (data: { id: string; status: "READ" | "UNREAD" }) => {
      return updateNotification(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", id] })
    },
  })

  return (
    <div className="relative">
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
        {!isLoading ? (
          // @ts-expect-error - //
          listNotis?.data.map(
            (notification: {
              _id: string
              content: string
              status: string
              updateAt: string
            }) => (
              <Dropdown.Item
                key={notification._id}
                className={`${
                  notification.status === "UNREAD"
                    ? "text-red-500 bg-gray-100"
                    : ""
                } `}
                onClick={() =>
                  mutate({
                    id: notification._id,
                    status: "READ",
                  })
                }
              >
                <Avatar />
                <div className="text-left">
                  <div>{notification.content}</div>
                  <div>{notification.updateAt}</div>
                </div>
              </Dropdown.Item>
            )
          )
        ) : (
          <Skeleton />
        )}
      </Dropdown>
      {isHasNotification && <Ping />}
    </div>
  )
}

export default Notification
