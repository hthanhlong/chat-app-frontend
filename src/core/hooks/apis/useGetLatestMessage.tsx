import { useQuery } from '@tanstack/react-query'
import { MessageService } from '../../services'

const useGetLatestMessage = (userUuid: string) => {
  return useQuery({
    queryKey: ['get-latest-message', userUuid],
    queryFn: () => MessageService.getLatestMessage(userUuid),
    staleTime: 1000 * 60 * 1,
  })
}

export default useGetLatestMessage
