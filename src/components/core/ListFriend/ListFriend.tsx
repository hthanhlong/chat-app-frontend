import { Button } from 'flowbite-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FriendService } from '../../../core/services'
import { IFriendRequest } from '../../../types'
import { Skeleton } from '../../ui'
import Avatar from '../Avatar/Avatar'
import { useGetFriends } from '../../../core/hooks'

const ListFriend = () => {
  const queryClient = useQueryClient()
  const { data: ListFriend, isLoading } = useGetFriends()

  const { mutate } = useMutation({
    mutationFn: (request: IFriendRequest) => FriendService.unfriend(request),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['myFriends'] }),
  })

  return (
    <div className="flex flex-wrap overflow-auto max-lg:h-screen max-lg:flex-col max-lg:p-2">
      {!isLoading ? (
        ListFriend?.data?.map((user: { _id: string; nickname: string }) => (
          <div
            key={user._id}
            className="mb-1 flex h-20 w-full items-center justify-between rounded-md border-[1px] px-2 py-1 hover:bg-gray-100 hover:dark:bg-gray-800 lg:m-1 lg:w-[calc(50%-8px)]"
          >
            <Avatar name={user.nickname} />
            <div className="flex">
              <Button
                color="blue"
                size="xs"
                className="mr-1"
                onClick={() => {
                  mutate({
                    receiverId: user._id,
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
