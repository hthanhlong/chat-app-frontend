import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FriendService } from '../../../core/services'

const Unfriend = ({ receiverId }: { receiverId: string }) => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: () => {
      return FriendService.unfriend({ receiverId, status: 'UNFRIEND' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myFriends'] })
    },
  })

  return <div onClick={() => mutateAsync()}>Unfriend</div>
}

export default Unfriend
