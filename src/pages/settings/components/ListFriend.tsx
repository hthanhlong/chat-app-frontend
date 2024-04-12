import { Button } from 'flowbite-react'
import { Avatar, Skeleton } from '../../../components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../../hooks/useAuth'
import { getMyFriends, updateFriendStatus } from '../../../axios/friend'

const ListFriend = () => {
  const { id } = useAuth()
  const queryClient = useQueryClient()

  const { data: ListFriend, isLoading } = useQuery({
    queryKey: ['my-friends'],
    queryFn: () => getMyFriends(id),
  })

  const { mutate } = useMutation({
    mutationFn: (request: FriendRequest) => updateFriendStatus(request),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['my-friends'] }),
  })

  return (
    <div className="flex h-fit max-h-[746px] w-full flex-wrap overflow-auto">
      {!isLoading ? (
        ListFriend?.data?.map((user: { _id: string; nickname: string }) => (
          <div
            key={user._id}
            className="m-1 flex h-20 w-[calc(50%-8px)] items-center justify-between rounded-md border-[1px] px-2 py-1 hover:bg-gray-100 hover:dark:bg-gray-800"
          >
            <Avatar name={user.nickname} />
            <div className="flex">
              <Button
                color="blue"
                size="xs"
                className="mr-1"
                onClick={() => {
                  mutate({
                    senderId: user._id,
                    receiverId: id,
                    status: 'UNFRIEND',
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
