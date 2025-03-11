import END_POINT from '../endpoint'
import { IFriendRequest } from '../../types'
import { HttpService } from '.'
class FriendService {
  sendFriendRequest = async (data: IFriendRequest) => {
    try {
      const response = await HttpService.post(END_POINT.FRIEND_REQUEST, data)
      return response
    } catch (error) {
      throw new Error('Failed to send friend request')
    }
  }

  getFriendRequests = async (id: string) => {
    try {
      const response = await HttpService.get(
        `${END_POINT.GET_FRIEND_REQUESTS}/${id}`,
      )
      return response
    } catch (error) {
      throw new Error('Failed to get friend requests')
    }
  }

  getMyFriends = async (id: string) => {
    if (!id) return Promise.reject(new Error('No id found'))
    try {
      const response = await HttpService.get(END_POINT.GET_FRIENDS, {
        params: { id: id },
      })
      return response
    } catch (error) {
      throw new Error('Failed to get friends')
    }
  }

  updateFriendStatus = async (data: IFriendRequest) => {
    try {
      const response = await HttpService.post(
        END_POINT.UPDATE_FRIEND_STATUS,
        data,
      )
      return response
    } catch (error) {
      throw new Error('Failed to update friend status')
    }
  }

  searchFriends = async (data: { id: string; keyword: string }) => {
    try {
      const response = await HttpService.get(END_POINT.SEARCH_FRIEND, {
        params: data,
      })
      return response
    } catch (error) {
      throw new Error('Failed to search friends')
    }
  }

  unfriend = async (data: { senderId: string; receiverId: string }) => {
    try {
      const response = await HttpService.post(END_POINT.UNFRIEND, data)
      return response
    } catch (error) {
      throw new Error('Failed to unfriend')
    }
  }
}

export default new FriendService()
