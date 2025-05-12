import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, DropdownHeader, DropdownItem } from 'flowbite-react'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Avatar from '../Avatar/Avatar'
import { NotificationService, WebsocketService } from '../../../core/services'
import { Skeleton, Ping } from '../../ui'
import { NOTIFICATION_TYPE, SOCKET_CHANNEL } from '../../../core/constant'
import { formatDate } from '../../../helper'
import { useAuth, useGetNotifications } from '../../../core/hooks'

interface INotification {
  content: string
  createdAt: string
  receiverUuid: string
  senderUuid: string
  status: string
  type: string
  updatedAt: string
  uuid: string
}

const Notification = () => {
  const { uuid } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isNotification, setIsNotification] = useState(false)

  const { data, isSuccess } = useGetNotifications()

  const { mutateAsync } = useMutation({
    mutationFn: (data: {
      notificationUuid: string
      status: 'READ' | 'UNREAD'
    }) => {
      return NotificationService.updateNotification(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  const handleClick = async (notification: INotification) => {
    await mutateAsync({
      notificationUuid: notification.uuid,
      status: 'READ',
    })
    if (
      notification.type === 'FRIEND' &&
      notification.content.includes('sent')
    ) {
      navigate('/settings', {
        state: {
          friendTap: 1,
          selectTab: 'request',
        },
      })
    }
  }

  useEffect(() => {
    const webSocket = WebsocketService.getInstance()
    if (!webSocket) return

    webSocket.on(
      SOCKET_CHANNEL.NOTIFICATION,
      ({ eventName }: { eventName: string; value: unknown }) => {
        if (eventName === NOTIFICATION_TYPE.HAS_NEW_NOTIFICATION) {
          setIsNotification(true)
          queryClient.invalidateQueries({ queryKey: ['notifications'] }) // refetch data
        }
      },
    )

    return () => {
      webSocket.off(SOCKET_CHANNEL.NOTIFICATION)
    }
  }, [uuid])

  return (
    <div className="relative" onClick={() => setIsNotification(false)}>
      <Dropdown
        label={<FontAwesomeIcon icon={faBell} fontSize={20} />}
        arrowIcon={false}
        dismissOnClick={false}
        className="overflow-auto shadow-lg"
        placement="bottom-start"
        size="xs"
        color="gray"
      >
        <DropdownHeader className="flex justify-between">
          <div className="text-xs">Notifications</div>
          <button className="text-xs underline">Mark as all read</button>
        </DropdownHeader>
        {isSuccess ? (
          data.data.map((notification: INotification) => (
            <DropdownItem
              key={notification.uuid}
              className={`relative mb-1 w-[400px] items-center text-sm font-medium dark:hover:bg-slate-700 ${
                notification.status === 'UNREAD'
                  ? ' bg-slate-100 text-black dark:!bg-gray-700 dark:!text-white'
                  : ''
              } `}
              onClick={() => handleClick(notification)}
            >
              <Avatar />
              <div className="w-full text-left">
                <div className="text-xs">{notification.content}</div>
                <div className="text-[10px]">
                  {formatDate(notification.createdAt as string)}
                </div>
              </div>
              <div className="absolute left-1 top-9">
                {notification.status === 'UNREAD' && (
                  <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                )}
              </div>
            </DropdownItem>
          ))
        ) : (
          <Skeleton />
        )}
      </Dropdown>
      {isNotification && <Ping />}
    </div>
  )
}

export default Notification
