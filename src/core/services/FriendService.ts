import END_POINT from '../endpoint'
import { IFriendRequest } from '../../types'
import { HttpService } from '.'
class FriendService {
  addFriend = async (data: IFriendRequest) => {
    try {
      const response = await HttpService.post(END_POINT.friend.addFriend, data)
      return response
    } catch (error) {
      throw new Error('Failed to send friend request')
    }
  }

  getFriendRequests = async () => {
    try {
      const response = await HttpService.get(END_POINT.friend.getFriendRequest)
      return response
    } catch (error) {
      throw new Error('Failed to get friend requests')
    }
  }

  getFriends = async () => {
    try {
      const response = await HttpService.get(END_POINT.friend.getFriends)
      return response
    } catch (error) {
      throw new Error('Failed to get friends')
    }
  }

  updateFriendStatus = async (data: IFriendRequest) => {
    try {
      const response = await HttpService.post(
        END_POINT.friend.updateFriendStatus,
        data,
      )
      return response
    } catch (error) {
      throw new Error('Failed to update friend status')
    }
  }

  searchFriendByKeyword = async (keyword: string) => {
    try {
      const response = await HttpService.get(
        END_POINT.friend.searchFriendByKeyword,
        {
          params: {
            keyword: keyword,
          },
        },
      )
      return response
    } catch (error) {
      throw new Error('Failed to search friends')
    }
  }

  unfriend = async (data: IFriendRequest) => {
    try {
      const response = await HttpService.get(
        END_POINT.friend.unFriend(data.receiverId),
      )
      return response
    } catch (error) {
      throw new Error('Failed to unfriend')
    }
  }
}

export default new FriendService()
