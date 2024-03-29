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
}

export default new MessageService()
