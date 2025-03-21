import { useQuery } from '@tanstack/react-query'
import { MessageService } from '../../services'

const useGetLatestMessage = (userId: string) => {
  return useQuery({
    queryKey: ['get-latest-message', userId],
    queryFn: () => MessageService.getLatestMessage(userId),
    staleTime: 1000 * 60 * 1,
  })
}

export default useGetLatestMessage
