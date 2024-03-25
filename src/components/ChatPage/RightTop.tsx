import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Avatar from "../Avatar/Avatar"
import { Link } from "react-router-dom"
import {
  faEllipsisVertical,
  faSquarePhoneFlip,
  faCamera,
} from "@fortawesome/free-solid-svg-icons"
import { useSelectedUserChat } from "../../hooks/useSelectedUserChat"
import { useQuery } from "@tanstack/react-query"
import { getUserById } from "../../axios/user"
import Skeleton from "../Skeleton/Skeleton"

const RightTop = () => {
  const { selectedId } = useSelectedUserChat()

  const { data, isLoading } = useQuery({
    queryKey: ["get-user-top-right", selectedId],
    // @ts-expect-error - //
    queryFn: () => {
      if (selectedId) {
        return getUserById(selectedId)
      }
      return Promise.resolve({
        data: {
          nickname: "",
          caption: "",
        },
      })
    },
  })

  return (
    <div className="border-b-[1px] flex items-center justify-between dark:border-gray-600">
      {!isLoading ? (
        <div className="p-2">
          <Avatar name={data?.data.nickname} caption={data?.data.caption} />
        </div>
      ) : (
        <Skeleton className="h-[72px]" />
      )}
      <div className="flex w-[152px] gap-1">
        <div className="dark:hover:text-orange-500 w-full rounded-lg text-center p-1">
          <FontAwesomeIcon
            icon={faCamera}
            className="dark:text-white"
            fontSize={24}
          />
        </div>
        <div className="dark:hover:text-orange-500 w-full rounded-lg text-center p-1">
          <FontAwesomeIcon
            icon={faSquarePhoneFlip}
            className="dark:text-white"
            fontSize={24}
          />
        </div>
        <Link
          to="/settings"
          className="inline-block dark:hover:text-orange-500 w-full rounded-lg text-center p-1"
        >
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="dark:text-white"
            fontSize={24}
          />
        </Link>
      </div>
    </div>
  )
}

export default RightTop
