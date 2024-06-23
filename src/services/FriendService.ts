import { AxiosRequestConfig } from 'axios'
import { http } from '../axios'
import END_POINT from './endpoint'
import { IFriendRequest } from '../types'

class FriendService {
  sendFriendRequest(data: IFriendRequest, options?: AxiosRequestConfig) {
    return http.post(`${END_POINT.friendRequest}`, data, { ...options })
  }

  getFriendRequests(id: string, options?: AxiosRequestConfig) {
    return http.get(`${END_POINT.getFriendRequests}/${id}`, { ...options })
  }

  updateFriendStatus(data: IFriendRequest, options?: AxiosRequestConfig) {
    return http.post(`${END_POINT.updateFriendStatus}`, data, { ...options })
  }

  getMyFriends(id: string, options?: AxiosRequestConfig) {
    return http.get(`${END_POINT.getMyFriends}/${id}`, { ...options })
  }

  searchFriends(
    data: { id: string; keyword: string },
    options?: AxiosRequestConfig,
  ) {
    return http.get(`${END_POINT.searchFriend}/${data.id}/?q=${data.keyword}`, {
      ...options,
    })
  }
  unfriend(
    data: { senderId: string; receiverId: string },
    options?: AxiosRequestConfig,
  ) {
    return http.post(`${END_POINT.unfriend}`, data, { ...options })
  }
}

export default new FriendService()
