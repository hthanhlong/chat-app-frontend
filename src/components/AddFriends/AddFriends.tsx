import { Button } from "flowbite-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import Avatar from "../Avatar/Avatar"
import Skeleton from "../Skeleton/Skeleton"
import { useAuth } from "../../hooks/useAuth"
import { sendFriendRequest } from "../../axios/friend"
import { getAllUsers } from "../../axios/user"
import "./AddFriend.css"

const AddFriends = () => {
  const { id: senderId } = useAuth()

  const { data: ListUser, isLoading: isLoadingGetListUser } = useQuery({
    queryKey: ["listUser"],
    queryFn: () => getAllUsers(senderId),
  })

  const {
    mutate,
    //@ts-expect-error - //
    isLoading,
    error,
    data,
  } = useMutation({
    mutationFn: (data: FriendRequest) => sendFriendRequest(data),
  })

  return (
    <div className="overflow-hidden">
      <input
        type="search"
        placeholder="Search friends"
        className="w-full rounded mb-3"
      />
      <ul className="add-friend-list h-[400px] overflow-auto">
        {!isLoadingGetListUser ? (
          ListUser?.data?.map((user: { _id: string; nickname: string }) => (
            <li key={user._id} className="flex justify-between p-1">
              <Avatar name={user.nickname} size="md" textSize="sm" />
              <Button
                color="blue"
                size="xs"
                className="h-[32px]"
                onClick={() => {
                  mutate({
                    senderId: senderId,
                    receiverId: user._id,
                    status: "PENDING",
                  })
                }}
              >
                + Add Friend
              </Button>
            </li>
          ))
        ) : (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
      </ul>
    </div>
  )
}

export default AddFriends
