import { AxiosRequestConfig } from "axios"
import { http } from "../axios"
import END_POINT from "./endpoint"

class FriendService {
  sendFriendRequest(data: FriendRequest, options?: AxiosRequestConfig) {
    return http.post(`${END_POINT.friendRequest}`, data, { ...options })
  }

  getFriendRequests(id: string, options?: AxiosRequestConfig) {
    return http.get(`${END_POINT.getFriendRequests}/${id}`, { ...options })
  }

  updateFriendStatus(data: FriendRequest, options?: AxiosRequestConfig) {
    return http.post(`${END_POINT.updateFriendStatus}`, data, { ...options })
  }

  getMyFriends(id: string, options?: AxiosRequestConfig) {
    return http.get(`${END_POINT.getMyFriends}/${id}`, { ...options })
  }
}

export default new FriendService()
