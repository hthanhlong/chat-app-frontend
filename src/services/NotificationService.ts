import { AxiosRequestConfig } from "axios"
import { http } from "../axios"
import END_POINT from "./endpoint"

class NotificationService {
  getAllNotifications(id: string, options?: AxiosRequestConfig): Promise<void> {
    return http.get(`${END_POINT.notifications}/${id}`, { ...options })
  }

  updateNotification<T>(data: T, options?: AxiosRequestConfig): Promise<void> {
    return http.patch(`${END_POINT.notifications}`, data, { ...options })
  }
}

export default new NotificationService()
