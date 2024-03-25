import { Button } from "flowbite-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Avatar from "../Avatar/Avatar"
import Skeleton from "../Skeleton/Skeleton"
import { useAuth } from "../../hooks/useAuth"
import { sendFriendRequest } from "../../axios/friend"
import { getAllUsers } from "../../axios/user"
import "./AddFriend.css"

const AddFriends = () => {
  const { id: senderId } = useAuth()
  const queryClient = useQueryClient()

  const { data: ListUser, isLoading: isLoadingGetListUser } = useQuery({
    queryKey: ["listUser", senderId],
    queryFn: () => getAllUsers(senderId),
  })

  const { mutateAsync } = useMutation({
    mutationFn: (data: FriendRequest) => sendFriendRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listUser"] })
    },
  })

  return (
    <div className="overflow-hidden">
      <input
        type="search"
        placeholder="Search friends"
        className="block w-full text-sm py-3 ps-5 text-black bg-gray-100 dark:text-white dark:bg-slate-800 rounded-full focus:ring-0 border-0 mb-3"
        autoComplete="off"
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
                  mutateAsync({
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
