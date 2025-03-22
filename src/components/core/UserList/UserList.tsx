import { useQueryClient } from '@tanstack/react-query'
import {
  useAuth,
  useGetFriends,
  usePartner,
  useFriendList,
} from '../../../core/hooks'
import { useEffect, useState } from 'react'
import { SOCKET_EVENTS } from '../../../core/constant'
import UserItem from '../UserItem/UserItem'
import { WebsocketService } from '../../../core/services'
import './list-users.css'
import { IFriend } from '../../../types'

const UserList = () => {
  const { userId } = useAuth()
  const { friendList, setFriendList } = useFriendList()
  const { partnerId, setPartnerId } = usePartner()
  const [listOnLineUsers, setListOnLineUsers] = useState<string[]>([])
  const queryClient = useQueryClient()

  const { data, isLoading } = useGetFriends()

  useEffect(() => {
    if (data?.data?.length === 0) return
    if (WebsocketService.getInstance()) {
      WebsocketService.sendDataToServer({
        type: SOCKET_EVENTS.GET_ONLINE_USERS,
        payload: { userId: userId },
      })
    }
    if (!partnerId) {
      setPartnerId(data?.data?.[0]._id)
    }
    setFriendList(data?.data)
  }, [data])

  useEffect(() => {
    const webSocket = WebsocketService.getInstance()
    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (data.type === SOCKET_EVENTS.GET_ONLINE_USERS) {
        const onlineUsers = data.payload as string[]
        const filterOnlineUsers = onlineUsers.filter((user) => user !== userId)
        setListOnLineUsers(filterOnlineUsers)
      }
      if (data.type === SOCKET_EVENTS.UPDATE_FRIEND_LIST) {
        queryClient.invalidateQueries({ queryKey: ['myFriends'] })
      }
    }
    if (webSocket) {
      webSocket.addEventListener('message', handleMessage)
    }
    return () => {
      if (webSocket) {
        webSocket.removeEventListener('message', handleMessage)
      }
    }
  }, [userId, friendList])

  return (
    <div className="list-users lg:min-h-[calc(650px-160px)]">
      {!isLoading ? (
        friendList?.map((user: IFriend) => (
          <div key={user._id} className="z-1 relative">
            <UserItem
              isOnline={listOnLineUsers.includes(user._id)}
              userId={user._id}
              active={partnerId === user._id}
              name={user.nickname}
              caption={user.caption ?? ''}
              onClick={() => setPartnerId(user._id)}
            />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  )
}

export default UserList
