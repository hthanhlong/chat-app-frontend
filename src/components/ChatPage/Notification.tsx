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
import { useNotification } from '../../hooks/userNotification'

const Notification = () => {
  const { id } = useAuth()
  const queryClient = useQueryClient()
  const { isNotification, setIsNotification } = useNotification()
  const { socketEvent } = useSocketStates()
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
      setIsNotification(true)
    }
  }, [socketEvent, id, queryClient, setIsNotification])

  return (
    <div
      className="relative"
      onClick={() => {
        queryClient.invalidateQueries({ queryKey: ['notifications', id] })
        setIsNotification(false)
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
              className={`text-bold text-md relative mb-1 font-medium ${
                notification.status === 'UNREAD'
                  ? ' bg-slate-100 text-black dark:!bg-gray-700 dark:!text-white'
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
