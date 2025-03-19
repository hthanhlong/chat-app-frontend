import END_POINT from '../endpoint'
import { HttpService } from '.'
class MessageService {
  getMessages = async (friendId: string) => {
    if (!friendId) return Promise.reject(new Error('No friendId found'))
    try {
      const response = await HttpService.get(END_POINT.message.getMessages, {
        params: { friendId: friendId },
      })
      return response
    } catch (error) {
      throw new Error('Failed to get messages')
    }
  }

  getMessageById = async (friendId: string, page: number) => {
    if (!friendId) return Promise.reject(new Error('No friendId found'))
    try {
      const response = await HttpService.get(
        END_POINT.message.getMessageById(friendId),
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

  getLatestMessage = async (friendId: string) => {
    try {
      const response = await HttpService.get(
        END_POINT.message.getLatestMessage(friendId),
      )
      return response
    } catch (error) {
      throw new Error('Failed to get latest message')
    }
  }

  deleteAllMessage = async (data: { friendId: string }) => {
    try {
      const response = await HttpService.post(
        END_POINT.message.deleteAllMessageByFriendId(data.friendId),
        data,
      )
      return response
    } catch (error) {
      throw new Error('Failed to delete all message')
    }
  }
}
export default new MessageService()
