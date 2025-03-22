import { Button } from 'flowbite-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Avatar from '../Avatar/Avatar'
import Skeleton from '../../ui/Skeleton/Skeleton'
import './AddFriend.css'
import { IFriendRequest } from '../../../types'
import { FriendService } from '../../../core/services'
import { useGetUserList } from '../../../core/hooks'

const AddFriends = () => {
  const queryClient = useQueryClient()

  const { data: ListUser, isLoading: isLoadingGetListUser } = useGetUserList()

  const { mutateAsync } = useMutation({
    mutationFn: (data: IFriendRequest) => FriendService.addFriend(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listUser'] })
    },
  })

  return (
    <div>
      <input
        type="search"
        placeholder="Type email or username"
        className="mb-3 block w-full rounded-full border-0 bg-gray-100 py-3 ps-5 text-xs text-black focus:ring-0 dark:bg-slate-800 dark:text-white"
        autoComplete="off"
        onChange={(e) => {
          console.log(e.target.value)
        }}
      />
      <ul className="add-friend-list h-[400px] overflow-auto">
        {!isLoadingGetListUser ? (
          ListUser?.data?.map((user: { _id: string; nickname: string }) => (
            <li key={user._id} className="flex justify-between p-1">
              <Avatar name={user.nickname} size="md" />
              <Button
                color="blue"
                size="xs"
                className="h-[32px] w-[140px]"
                onClick={() => {
                  mutateAsync({
                    receiverId: user._id,
                    status: 'PENDING',
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
