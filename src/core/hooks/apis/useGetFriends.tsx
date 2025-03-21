import { useQuery } from '@tanstack/react-query'
import { FriendService } from '../../services'

const useGetFriends = () => {
  return useQuery({
    queryKey: ['myFriends'],
    queryFn: () => FriendService.getFriends(),
    staleTime: 1000 * 5,
  })
}

export default useGetFriends
