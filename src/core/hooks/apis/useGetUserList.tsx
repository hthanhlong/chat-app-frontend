import { useQuery } from '@tanstack/react-query'
import { UserService } from '../../services'

const useGetUserList = () => {
  return useQuery({
    queryKey: ['listUser'],
    queryFn: () => UserService.getUsersNonFriends(),
    staleTime: 1000 * 60 * 1,
  })
}

export default useGetUserList
