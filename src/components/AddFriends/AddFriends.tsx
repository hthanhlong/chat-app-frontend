import { Button } from 'flowbite-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Avatar from '../Avatar/Avatar'
import Skeleton from '../Skeleton/Skeleton'
import { useAuth } from '../../hooks/useAuth'
import { sendFriendRequest } from '../../axios/friend'
import { getAllUsers } from '../../axios/user'
import './AddFriend.css'

const AddFriends = () => {
  const { id: senderId } = useAuth()
  const queryClient = useQueryClient()

  const { data: ListUser, isLoading: isLoadingGetListUser } = useQuery({
    queryKey: ['listUser', senderId],
    queryFn: () => getAllUsers(senderId),
  })

  const { mutateAsync } = useMutation({
    mutationFn: (data: FriendRequest) => sendFriendRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listUser'] })
    },
  })

  return (
    <div>
      <input
        type="search"
        placeholder="Search friends"
        className="mb-3 block w-full rounded-full border-0 bg-gray-100 py-3 ps-5 text-sm text-black focus:ring-0 dark:bg-slate-800 dark:text-white"
        autoComplete="off"
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
                    senderId: senderId,
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
