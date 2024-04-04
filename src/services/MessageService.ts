import { AxiosRequestConfig } from 'axios'
import { http } from '../axios'
import END_POINT from './endpoint'

class MessageService {
  getAllMessages(
    partnerId: string,
    options?: AxiosRequestConfig,
  ): Promise<void> {
    return http.get(`${END_POINT.getMessages}/${partnerId}`, { ...options })
  }

  getLastMessages(
    partnerId: string,
    options?: AxiosRequestConfig,
  ): Promise<void> {
    return http.get(`${END_POINT.getLastMessages}/${partnerId}`, { ...options })
  }

  deleteAllMessage(
    data: { senderId: string; receiverId: string },
    options?: AxiosRequestConfig,
  ): Promise<void> {
    return http.post(`${END_POINT.deleteAllMessage}`, data, { ...options })
  }
}

export default new MessageService()
