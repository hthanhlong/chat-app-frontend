import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'flowbite-react'
import Avatar from '../Avatar/Avatar'
import { useAuth } from '../../hooks/useAuth'
import { formatDate } from '../../helper'
import {
  getAllNotifications,
  updateNotification,
} from '../../axios/notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Skeleton from '../Skeleton/Skeleton'
import { useSocketStates } from '../../hooks/useSocketStates'
import Ping from '../Ping/Ping'

const Notification = () => {
  const { id } = useAuth()
  const queryClient = useQueryClient()
  const { socketEvent, setSocketEvent } = useSocketStates()
  const navigate = useNavigate()

  const { data: listNotis, isSuccess } = useQuery({
    queryKey: ['notifications', id],
    queryFn: () => getAllNotifications(id),
  })

  const { mutateAsync } = useMutation({
    mutationFn: (data: { id: string; status: 'READ' | 'UNREAD' }) => {
      return updateNotification(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', id] })
    },
  })

  const handleClick = async (notification: CustomNotification) => {
    await mutateAsync({
      id: notification._id!,
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
    if (socketEvent?.type === 'HAS_NEW_NOTIFICATION') {
      queryClient.invalidateQueries({ queryKey: ['notifications', id] })
    }
  }, [socketEvent, id, queryClient])

  return (
    <div
      className="relative"
      onClick={() => {
        queryClient.invalidateQueries({ queryKey: ['notifications', id] })
        setSocketEvent(null)
      }}
    >
      <Dropdown
        label={<FontAwesomeIcon icon={faBell} fontSize={20} />}
        arrowIcon={false}
        dismissOnClick={false}
        className="h-[400px] w-[400px] overflow-auto shadow-lg"
        placement="bottom-start"
        size="xs"
        color="gray"
      >
        <Dropdown.Header className="flex justify-between">
          <div>Notifications</div>
          <button className="underline">Mark as all read</button>
        </Dropdown.Header>
        {isSuccess ? (
          // @ts-expect-error - //
          listNotis?.data.map((notification: CustomNotification) => (
            <Dropdown.Item
              key={notification._id}
              className={`mb-1 ${
                notification.status === 'UNREAD'
                  ? 'text-red-500 dark:bg-gray-600 dark:text-sky-500'
                  : ''
              } `}
              onClick={() => handleClick(notification)}
            >
              <Avatar />
              <div className="text-left">
                <div>{notification.content}</div>
                <div className="text-xs">
                  {formatDate(notification.createdAt as string)}
                </div>
              </div>
            </Dropdown.Item>
          ))
        ) : (
          <Skeleton />
        )}
      </Dropdown>
      {socketEvent?.type === 'HAS_NEW_NOTIFICATION' && <Ping />}
    </div>
  )
}

export default Notification
