import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown } from 'flowbite-react'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Avatar from '../Avatar/Avatar'
import { NotificationService, WebsocketService } from '../../../core/services'
import { Skeleton, Ping } from '../../ui'
import { SOCKET_EVENTS } from '../../../core/constant'
import { formatDate } from '../../../helper'
import { useAuth } from '../../../core/hooks'

interface INotification {
  content: string
  createdAt: string
  receiverId: string
  senderId: string
  status: string
  type: string
  updatedAt: string
  _id: string
}

const Notification = () => {
  const { userId } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isNotification, setIsNotification] = useState(false)

  const { data, isSuccess } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => NotificationService.getNotifications(),
    staleTime: 1000 * 60 * 1,
  })

  const { mutateAsync } = useMutation({
    mutationFn: (data: {
      notificationId: string
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
      notificationId: notification._id,
      status: 'READ',
    })
    if (
      notification.type === 'FRIEND' &&
      notification.content.includes('sent')
    ) {
      navigate('/settings', {
        state: {
          friendTap: 0,
          selectTab: 'request',
        },
      })
    }
  }

  useEffect(() => {
    const webSocket = WebsocketService.getInstance()
    if (!webSocket) return

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (data.type === SOCKET_EVENTS.HAS_NEW_NOTIFICATION) {
        setIsNotification(true)
        queryClient.invalidateQueries({ queryKey: ['notifications'] }) // refetch data
      }
    }
    webSocket.addEventListener('message', handleMessage)
    return () => {
      webSocket.removeEventListener('message', handleMessage)
    }
  }, [userId])

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
          <div>Notifications</div>
          <button className="underline">Mark as all read</button>
        </Dropdown.Header>

        {isSuccess ? (
          data.data.map((notification: INotification) => (
            <Dropdown.Item
              key={notification._id}
              className={`text-bold relative mb-1 w-full items-center text-sm font-medium ${
                notification.status === 'UNREAD'
                  ? ' bg-slate-100 text-black dark:!bg-gray-700 dark:!text-white'
                  : ''
              } `}
              onClick={() => handleClick(notification)}
            >
              <Avatar />
              <div className="w-full text-left">
                <div>{notification.content}</div>
                <div className="text-xs">
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
