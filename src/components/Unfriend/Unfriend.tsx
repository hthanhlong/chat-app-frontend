import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unfriend } from '../../axios/friend'

const Unfriend = ({
  senderId,
  receiverId,
  callback,
}: {
  senderId: string
  receiverId: string
  callback: () => void
}) => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: () => {
      return unfriend({ senderId, receiverId })
    },
    onSuccess: () => {
      callback()
      queryClient.invalidateQueries({ queryKey: ['myFriends'] })
    },
  })

  return <div onClick={() => mutateAsync()}>Unfriend</div>
}

export default Unfriend
