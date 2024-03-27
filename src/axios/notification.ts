import NotificationService from '../services/NotificationService'

export const getAllNotifications = async (id: string) => {
  try {
    const response = await NotificationService.getAllNotifications(id)
    return response
  } catch (error) {
    throw new Error('Failed to send friend request')
  }
}

export const updateNotification = async <T>(data: T) => {
  try {
    const response = await NotificationService.updateNotification(data)
    return response
  } catch (error) {
    throw new Error('Failed to send friend request')
  }
}
