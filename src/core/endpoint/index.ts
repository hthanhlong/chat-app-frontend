const END_POINT = {
  auth: {
    signUp: '/auth/sign-up',
    signIn: '/auth/sign-in',
    refreshToken: '/auth/refresh-token',
    signOut: '/auth/sign-out',
    googleSignIn: '/auth/google',
    facebookSignIn: '/auth/facebook',
  },
  user: {
    getUsersNonFriends: '/users/non-friends',
    updateUser: '/users',
    deleteUser: '/users',
    getUser: '/users/me',
    getUserById: (id: string) => `/users/${id}`,
  },
  friend: {
    getFriends: '/friends',
    getFriendRequest: '/friends/friend-requests',
    addFriend: '/friends/add-friend',
    updateFriendStatus: '/friends/update-friend-status',
    searchFriendByKeyword: '/friends/search-friend',
    unFriend: (friendId: string) => `/friends/unfriend/${friendId}`,
  },
  message: {
    getMessages: '/messages',
    getLatestMessage: (friendId: string) =>
      `/messages/${friendId}/latest-message`,
    getMessageById: (friendId: string) => `/messages/${friendId}`,
    deleteAllMessageByFriendId: (id: string) =>
      `/messages/delete-all-message/${id}`,
  },
  notification: {
    getNotifications: '/notifications',
    updateNotification: '/notifications',
  },
}
export default END_POINT
