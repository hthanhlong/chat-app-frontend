import FriendService from "../services/FriendService"

export const sendFriendRequest = async (data: FriendRequest) => {
  try {
    const response = await FriendService.sendFriendRequest(data)
    return response
  } catch (error) {
    throw new Error("Failed to send friend request")
  }
}

export const getFriendRequests = async (id: string) => {
  try {
    const response = await FriendService.getFriendRequests(id)
    return response
  } catch (error) {
    throw new Error("Failed to get friend requests")
  }
}

export const getMyFriends = async (id: string) => {
  try {
    const response = await FriendService.getMyFriends(id)
    return response
  } catch (error) {
    throw new Error("Failed to get friends")
  }
}

export const updateFriendStatus = async (data: FriendRequest) => {
  try {
    const response = await FriendService.updateFriendStatus(data)
    return response
  } catch (error) {
    throw new Error("Failed to update friend status")
  }
}
