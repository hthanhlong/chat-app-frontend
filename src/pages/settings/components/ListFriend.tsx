import { Button } from "flowbite-react"
import { Avatar, Skeleton } from "../../../components"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../../../hooks/useAuth"
import { getMyFriends, updateFriendStatus } from "../../../axios/friend"

const ListFriend = () => {
  const { id } = useAuth()
  const queryClient = useQueryClient()

  const { data: ListFriend, isLoading } = useQuery({
    queryKey: ["my-friends"],
    queryFn: () => getMyFriends(id),
  })

  const { mutate } = useMutation({
    mutationFn: (request: FriendRequest) => updateFriendStatus(request),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["my-friends"] }),
  })

  return (
    <div className="flex flex-wrap h-fit max-h-[746px] overflow-auto w-full">
      {!isLoading ? (
        ListFriend?.data?.map((user: { _id: string; nickname: string }) => (
          <div
            key={user._id}
            className="border-[1px] w-[calc(50%-8px)] h-20 m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100"
          >
            <Avatar name={user.nickname} textSize="md" />
            <div className="flex">
              <Button
                color="blue"
                size="sm"
                className="mr-1"
                onClick={() => {
                  mutate({
                    senderId: user._id,
                    receiverId: id,
                    status: "UNFRIEND",
                  })
                }}
              >
                Unfriend
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
export default ListFriend
