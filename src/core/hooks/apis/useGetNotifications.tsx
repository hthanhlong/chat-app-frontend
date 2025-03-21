import { useQuery } from '@tanstack/react-query'
import { NotificationService } from '../../services'

const useGetNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => NotificationService.getNotifications(),
    staleTime: 1000 * 60 * 1,
  })
}

export default useGetNotifications
