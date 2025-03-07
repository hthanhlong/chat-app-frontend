import END_POINT from '../endpoint'
import { HttpService } from '.'
class MessageService {
  getAllMessages = async (partnerId: string) => {
    if (!partnerId) return Promise.reject(new Error('No partnerId found'))
    try {
      const response = await HttpService.get(END_POINT.GET_MESSAGES, {
        params: { partnerId },
      })
      return response
    } catch (error) {
      throw new Error('Failed to get users')
    }
  }

  getLastMessages = async (partnerId: string) => {
    if (!partnerId) return Promise.reject(new Error('No partnerId found'))
    try {
      const response = await HttpService.get(END_POINT.GET_LAST_MESSAGES, {
        params: { partnerId },
      })
      return response
    } catch (error) {
      throw new Error('Failed to get users')
    }
  }

  deleteAllMessage = async (data: { senderId: string; receiverId: string }) => {
    try {
      const response = await HttpService.post(
        END_POINT.DELETE_ALL_MESSAGE,
        data,
      )
      return response
    } catch (error) {
      throw new Error('Failed to delete all message')
    }
  }
}

export default new MessageService()
