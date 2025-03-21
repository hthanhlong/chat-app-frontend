import { useQuery } from '@tanstack/react-query'
import { UserService } from '../../services'

const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ['get-user-by-id', id],
    queryFn: () => UserService.getUserById(id),
    staleTime: 1000 * 60 * 1,
  })
}

export default useGetUserById
