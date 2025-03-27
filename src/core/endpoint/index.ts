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
    unFriend: (friendUuid: string) => `/friends/unfriend/${friendUuid}`,
  },
  message: {
    getMessages: '/messages',
    getLatestMessage: (friendUuid: string) =>
      `/messages/${friendUuid}/latest-message`,
    getMessageById: (friendUuid: string) => `/messages/${friendUuid}`,
    deleteAllMessageByFriendId: (id: string) =>
      `/messages/delete-all-message/${id}`,
  },
  notification: {
    getNotifications: '/notifications',
    updateNotification: '/notifications',
  },
}
export default END_POINT
