import { useQuery } from '@tanstack/react-query'
import { FriendService } from '../../services'

const useGetFriendRequest = () => {
  return useQuery({
    queryKey: ['friendRequest'],
    queryFn: () => FriendService.getFriendRequests(),
    staleTime: 1000 * 60 * 1,
  })
}

export default useGetFriendRequest
