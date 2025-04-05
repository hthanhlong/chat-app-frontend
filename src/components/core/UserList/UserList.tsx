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
        const friendListUuid = data?.data?.map((user: IFriend) => user.uuid)
        WebsocketService.sendMessage(SOCKET_EVENTS.GET_ONLINE_USERS, {
          uuid,
          data: friendListUuid,
        })
        WebsocketService.sendMessage(SOCKET_EVENTS.HAS_NEW_ONLINE_USER, {
          uuid,
          data: friendListUuid,
        })
      }, TIMEOUT_DELAY_GET_ONLINE_USERS)
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [data])

  useEffect(() => {
    const webSocket = WebsocketService.getInstance()
    if (!webSocket) return
    webSocket.on(SOCKET_EVENTS.GET_ONLINE_USERS, (payload: string[]) => {
      const filterOnlineUsers = payload.filter((user) => user !== uuid)
      setListOnLineUsers(filterOnlineUsers)
    })
    webSocket.on(SOCKET_EVENTS.HAS_NEW_ONLINE_USER, (payload: string) => {
      setListOnLineUsers((prev) => [...prev, payload])
    })
    webSocket.on(SOCKET_EVENTS.HAS_NEW_OFFLINE_USER, (payload: string) => {
      setListOnLineUsers((prev) => prev.filter((user) => user !== payload))
    })
    webSocket.on(SOCKET_EVENTS.UPDATE_FRIEND_LIST, () => {
      queryClient.invalidateQueries({ queryKey: ['myFriends'] })
    })
    return () => {
      webSocket.off(SOCKET_EVENTS.GET_ONLINE_USERS)
      webSocket.off(SOCKET_EVENTS.HAS_NEW_ONLINE_USER)
      webSocket.off(SOCKET_EVENTS.HAS_NEW_OFFLINE_USER)
      webSocket.off(SOCKET_EVENTS.UPDATE_FRIEND_LIST)
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
