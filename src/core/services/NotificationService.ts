import END_POINT from '../endpoint'
import { HttpService } from '.'

class NotificationService {
  getNotifications = async () => {
    try {
      const response = await HttpService.get(
        END_POINT.notification.getNotifications,
      )
      return response
    } catch (error) {
      throw new Error('Failed to send friend request')
    }
  }

  updateNotification = async (data: {
    notificationId: string
    status: 'READ' | 'UNREAD'
  }) => {
    try {
      const response = await HttpService.post(
        END_POINT.notification.updateNotification,
        data,
      )
      return response
    } catch (error) {
      throw new Error('Failed to send friend request')
    }
  }
}

export default new NotificationService()
