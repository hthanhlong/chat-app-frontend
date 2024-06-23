import FriendService from '../services/FriendService'
import { IFriendRequest } from '../types'

export const sendFriendRequest = async (data: IFriendRequest) => {
  try {
    const response = await FriendService.sendFriendRequest(data)
    return response
  } catch (error) {
    throw new Error('Failed to send friend request')
  }
}

export const getFriendRequests = async (id: string) => {
  try {
    const response = await FriendService.getFriendRequests(id)
    return response
  } catch (error) {
    throw new Error('Failed to get friend requests')
  }
}

export const getMyFriends = async (id: string) => {
  try {
    const response = await FriendService.getMyFriends(id)
    return response
  } catch (error) {
    throw new Error('Failed to get friends')
  }
}

export const updateFriendStatus = async (data: IFriendRequest) => {
  try {
    const response = await FriendService.updateFriendStatus(data)
    return response
  } catch (error) {
    throw new Error('Failed to update friend status')
  }
}

export const searchFriends = async (data: { id: string; keyword: string }) => {
  try {
    const response = await FriendService.searchFriends(data)
    return response
  } catch (error) {
    throw new Error('Failed to search friends')
  }
}

export const unfriend = async (data: {
  senderId: string
  receiverId: string
}) => {
  try {
    const response = await FriendService.unfriend(data)
    return response
  } catch (error) {
    throw new Error('Failed to unfriend')
  }
}
