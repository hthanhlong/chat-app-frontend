import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Avatar from "../Avatar/Avatar"
import { Link } from "react-router-dom"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { useSelectedUserChat } from "../../hooks/useSelectedUserChat"
import { useQuery } from "@tanstack/react-query"
import { getUserById } from "../../axios/user"
import Skeleton from "../Skeleton/Skeleton"

const RightTop = () => {
  const { selectedId } = useSelectedUserChat()

  const { data, isLoading } = useQuery({
    queryKey: ["get-user-top-right", selectedId],
    queryFn: () => getUserById(selectedId),
  })

  return (
    <div className="border-b-4 flex items-center justify-between dark:border-gray-600">
      {!isLoading ? (
        <div className="p-2">
          <Avatar name={data?.data.nickname} caption={data?.data.caption} />
        </div>
      ) : (
        <Skeleton className="h-[72px]" />
      )}
      <Link to="/settings">
        <FontAwesomeIcon
          icon={faGear}
          className="dark:text-white p-2.5 rounded-xl h-[20px] w-[20px]"
        />
      </Link>
    </div>
  )
}

export default RightTop
