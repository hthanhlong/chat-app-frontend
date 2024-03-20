import { Button } from "flowbite-react"
import { Avatar, Skeleton } from "../../../components"
import { useQuery } from "@tanstack/react-query"
import { getFriendRequests } from "../../../axios/friend"
import { useAuth } from "../../../hooks/useAuth"

const FriendRequest = () => {
  const { id: senderId } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: () => getFriendRequests(senderId),
  })

  console.log("ListUser", data)

  return (
    <div className="flex flex-wrap h-[980px] overflow-auto w-full">
      {!isLoading ? (
        data?.data?.map((user: { _id: string; nickname: string }) => (
          <div
            key={user._id}
            className="border-[1px] h-20 w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100"
          >
            <Avatar name={user.nickname} textSize="md" />
            <div className="flex">
              <Button color="blue" size="sm" className="mr-1">
                Accept
              </Button>
              <Button color="red" size="sm">
                Reject
              </Button>
            </div>
          </div>
        ))
      ) : (
        <Skeleton />
      )}
    </div>
  )
}
export default FriendRequest
