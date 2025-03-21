import { useQuery } from '@tanstack/react-query'
import { UserService } from '../../services'

const useGetMe = () => {
  return useQuery({
    queryKey: ['get-me'],
    queryFn: () => UserService.getUser(),
    staleTime: 1000 * 60 * 1,
  })
}

export default useGetMe
