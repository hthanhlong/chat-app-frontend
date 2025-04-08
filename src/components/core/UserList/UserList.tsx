// import { useQueryClient } from '@tanstack/react-query'
import { useAuth, useGetFriends, usePartner } from '../../../core/hooks'
import { useEffect, useState } from 'react'
import { FRIEND_TYPE, SOCKET_CHANNEL } from '../../../core/constant'
import UserItem from '../UserItem/UserItem'
import { WebsocketService } from '../../../core/services'
import './list-users.css'
import { IFriend } from '../../../types'
import { EventPayload } from '../../../core/services/WebsocketService'

const TIMEOUT_DELAY_GET_ONLINE_USERS = 3000

const UserList = () => {
  const { uuid } = useAuth()
  const { partnerId, setPartnerId } = usePartner()
  const [listOnLineUsers, setListOnLineUsers] = useState<string[]>([])
  // const queryClient = useQueryClient()

  const { data, isLoading } = useGetFriends() // init data

  useEffect(() => {
    if (!data?.data?.length) return
    setPartnerId(data?.data?.[0].uuid)
  }, [data])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    if (WebsocketService.getInstance()) {
      timeout = setTimeout(() => {
        const friendListUuid: string[] = data?.data?.map(
          (user: IFriend) => user.uuid,
        )
        WebsocketService.sendMessage(SOCKET_CHANNEL.FRIEND, {
          eventName: FRIEND_TYPE.INIT,
          data: {
            uuid: uuid,
            value: friendListUuid,
          },
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
    webSocket.on(
      SOCKET_CHANNEL.FRIEND,
      (payload: EventPayload<string[] | string>) => {
        if (payload.eventName === FRIEND_TYPE.GET_ONLINE_FRIEND_LIST) {
          const filterOnlineUsers = (payload.data.value as string[]).filter(
            (user) => user !== uuid,
          )
          setListOnLineUsers(filterOnlineUsers)
        }
        if (payload.eventName === FRIEND_TYPE.HAS_NEW_ONLINE_USER) {
          const newOnlineUser = payload.data.value as string
          setListOnLineUsers((prev) => [...prev, newOnlineUser])
        }
        if (payload.eventName === FRIEND_TYPE.HAS_NEW_OFFLINE_USER) {
          const newOfflineUser = payload.data.value as string
          setListOnLineUsers((prev) =>
            prev.filter((user) => user !== newOfflineUser),
          )
        }
      },
    )

    return () => {
      webSocket.off(SOCKET_CHANNEL.FRIEND)
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
