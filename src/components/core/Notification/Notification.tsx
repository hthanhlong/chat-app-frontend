import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown } from 'flowbite-react'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Avatar from '../Avatar/Avatar'
import { NotificationService, WebsocketService } from '../../../core/services'
import { Skeleton, Ping } from '../../ui'
import { SOCKET_EVENTS } from '../../../core/constant'
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

    webSocket.on(SOCKET_EVENTS.HAS_NEW_NOTIFICATION, () => {
      setIsNotification(true)
      queryClient.invalidateQueries({ queryKey: ['notifications'] }) // refetch data
    })

    return () => {
      webSocket.off(SOCKET_EVENTS.HAS_NEW_NOTIFICATION)
    }
  }, [uuid])

  return (
    <div className="relative" onClick={() => setIsNotification(false)}>
      <Dropdown
        label={<FontAwesomeIcon icon={faBell} fontSize={20} />}
        arrowIcon={false}
        dismissOnClick={false}
        className="h-[300px] w-[300px] overflow-auto shadow-lg lg:h-[400px] lg:w-[400px]"
        placement="bottom-start"
        size="xs"
        color="gray"
      >
        <Dropdown.Header className="flex justify-between">
          <div className="text-xs">Notifications</div>
          <button className="text-xs underline">Mark as all read</button>
        </Dropdown.Header>

        {isSuccess ? (
          data.data.map((notification: INotification) => (
            <Dropdown.Item
              key={notification.uuid}
              className={`text-bold relative mb-1 w-full items-center text-sm font-medium ${
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
            </Dropdown.Item>
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
