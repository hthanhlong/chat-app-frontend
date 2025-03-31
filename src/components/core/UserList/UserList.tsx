import { useQueryClient } from '@tanstack/react-query'
import { useAuth, useGetFriends, usePartner } from '../../../core/hooks'
import { useEffect, useState } from 'react'
import { SOCKET_EVENTS } from '../../../core/constant'
import UserItem from '../UserItem/UserItem'
import { WebsocketService } from '../../../core/services'
import './list-users.css'
import { IFriend } from '../../../types'

const TIMEOUT_DELAY_GET_ONLINE_USERS = 3000

const UserList = () => {
  const { uuid } = useAuth()
  const { partnerId, setPartnerId } = usePartner()
  const [listOnLineUsers, setListOnLineUsers] = useState<string[]>([])
  const queryClient = useQueryClient()

  const { data, isLoading } = useGetFriends() // init data

  useEffect(() => {
    if (!data?.data?.length) return
    setPartnerId(data?.data?.[0].uuid)
  }, [data])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    if (WebsocketService.getInstance()) {
      timeout = setTimeout(() => {
        WebsocketService.sendDataToServer({
          type: SOCKET_EVENTS.GET_ONLINE_USERS,
          payload: { userUuid: uuid },
        })
      }, TIMEOUT_DELAY_GET_ONLINE_USERS)
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [])

  useEffect(() => {
    const webSocket = WebsocketService.getInstance()
    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (data.type === SOCKET_EVENTS.GET_ONLINE_USERS) {
        const onlineUsers = data.payload as string[]
        const filterOnlineUsers = onlineUsers.filter((user) => user !== uuid)
        setListOnLineUsers(filterOnlineUsers)
        return
      }
      if (data.type === SOCKET_EVENTS.HAS_NEW_ONLINE_USER) {
        const newOnlineUser = data.payload.uuid as string
        setListOnLineUsers((prev) => [...prev, newOnlineUser])
        return
      }

      if (data.type === SOCKET_EVENTS.HAS_NEW_OFFLINE_USER) {
        const newOfflineUser = data.payload.uuid as string
        setListOnLineUsers((prev) =>
          prev.filter((userUuid) => userUuid !== newOfflineUser),
        )
        return
      }
      if (data.type === SOCKET_EVENTS.UPDATE_FRIEND_LIST) {
        queryClient.invalidateQueries({ queryKey: ['myFriends'] })
        return
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
  }, [])

  return (
    <div className="list-users lg:min-h-[calc(650px-160px)]">
      {!isLoading ? (
        data?.data?.map((user: IFriend) => (
          <div key={user.uuid} className="z-1 relative">
            <UserItem
              isOnline={listOnLineUsers.includes(user.uuid)}
              userUuid={user.uuid}
              active={partnerId === user.uuid}
              name={user.nickName}
              caption={user.caption ?? ''}
              onClick={() => setPartnerId(user.uuid)}
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
