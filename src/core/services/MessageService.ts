import END_POINT from '../endpoint'
import { HttpService } from '.'
class MessageService {
  getMessages = async (friendUuid: string) => {
    if (!friendUuid) return Promise.reject(new Error('No friendUuid found'))
    try {
      const response = await HttpService.get(END_POINT.message.getMessages, {
        params: { friendUuid: friendUuid },
      })
      return response
    } catch (error) {
      throw new Error('Failed to get messages')
    }
  }

  getMessageById = async (friendUuid: string, page: number) => {
    if (!friendUuid) return Promise.reject(new Error('No friendUuid found'))
    try {
      const response = await HttpService.get(
        END_POINT.message.getMessageById(friendUuid),
        {
          params: {
            page,
          },
        },
      )
      return response
    } catch (error) {
      throw new Error('Failed to get users')
    }
  }

  getLatestMessage = async (friendUuid: string) => {
    try {
      const response = await HttpService.get(
        END_POINT.message.getLatestMessage(friendUuid),
      )
      return response
    } catch (error) {
      throw new Error('Failed to get latest message')
    }
  }

  deleteAllMessage = async (data: { friendUuid: string }) => {
    try {
      const response = await HttpService.post(
        END_POINT.message.deleteAllMessageByFriendId(data.friendUuid),
        data,
      )
      return response
    } catch (error) {
      throw new Error('Failed to delete all message')
    }
  }

  uploadImage = async (formData: FormData) => {
    try {
      const response = await HttpService.post(
        END_POINT.message.uploadImage,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      return response
    } catch (error) {
      throw new Error('Failed to upload image')
    }
  }
}
export default new MessageService()
