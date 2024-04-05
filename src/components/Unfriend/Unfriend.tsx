import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unfriend } from '../../axios/friend'

const Unfriend = ({
  senderId,
  receiverId,
}: {
  senderId: string
  receiverId: string
}) => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: () => {
      return unfriend({ senderId, receiverId })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myFriends', senderId] })
    },
  })

  return <div onClick={() => mutateAsync()}>Unfriend</div>
}

export default Unfriend
