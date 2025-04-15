import { Button } from 'flowbite-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FriendService } from '../../../core/services'
import { IFriendRequest } from '../../../types'
import { Skeleton } from '../../ui'
import Avatar from '../Avatar/Avatar'
import { useGetFriendRequest } from '../../../core/hooks'

const FriendRequest = () => {
  const queryClient = useQueryClient()
  const { data: FriendRequestList, isLoading } = useGetFriendRequest()

  const { mutate } = useMutation({
    mutationFn: (request: IFriendRequest) =>
      FriendService.updateFriendStatus(request),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['friendRequest'] }),
  })

  return (
    <div className="flex w-full flex-wrap overflow-auto max-lg:h-screen">
      {!isLoading ? (
        FriendRequestList?.data?.map(
          (user: { _id: string; nickName: string; uuid: string }) => (
            <div
              key={user.uuid}
              className="m-1 flex h-20 w-[calc(50%-8px)] items-center justify-between rounded-md border-[1px] px-2 py-1 hover:bg-gray-100 hover:dark:bg-gray-800"
            >
              <Avatar name={user.nickName} />
              <div className="flex">
                <Button
                  color="blue"
                  size="xs"
                  className="mr-1"
                  onClick={() => {
                    mutate({
                      receiverUuid: user.uuid,
                      status: 'FRIEND',
                    })
                  }}
                >
                  Accept
                </Button>
                <Button
                  color="red"
                  size="xs"
                  onClick={() => {
                    mutate({
                      receiverUuid: user.uuid,
                      status: 'REJECT',
                    })
                  }}
                >
                  Reject
                </Button>
              </div>
            </div>
          ),
        )
      ) : (
        <Skeleton />
      )}
    </div>
  )
}
export default FriendRequest
