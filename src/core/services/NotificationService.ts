import END_POINT from '../endpoint'
import { HttpService } from '.'

class NotificationService {
  getAllNotifications = async (id: string) => {
    try {
      const response = await HttpService.get(END_POINT.NOTIFICATIONS, {
        params: { id },
      })
      return response
    } catch (error) {
      throw new Error('Failed to send friend request')
    }
  }

  updateNotification = async <T>(data: T) => {
    try {
      const response = await HttpService.patch(END_POINT.NOTIFICATIONS, data)
      return response
    } catch (error) {
      throw new Error('Failed to send friend request')
    }
  }
}

export default new NotificationService()
