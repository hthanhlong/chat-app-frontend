import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'flowbite-react'
import Avatar from '../Avatar/Avatar'
import { useAuth } from '../../hooks/useAuth'
import {
  getAllNotifications,
  updateNotification,
} from '../../axios/notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Skeleton from '../Skeleton/Skeleton'
import { useSocketStates } from '../../hooks/useSocketStates'
import Ping from '../Ping/Ping'
import { useEffect } from 'react'

const Notification = () => {
  const { id } = useAuth()
  const queryClient = useQueryClient()
  const { socketEvent, setSocketEvent } = useSocketStates()

  const { data: listNotis, isSuccess } = useQuery({
    queryKey: ['notifications', id],
    queryFn: () => getAllNotifications(id),
  })

  const { mutate } = useMutation({
    mutationFn: (data: { id: string; status: 'READ' | 'UNREAD' }) => {
      return updateNotification(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', id] })
    },
  })

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
          listNotis?.data.map(
            (notification: {
              _id: string
              content: string
              status: string
              updateAt: string
            }) => (
              <Dropdown.Item
                key={notification._id}
                className={`mb-1 ${
                  notification.status === 'UNREAD'
                    ? 'text-red-500 dark:bg-gray-600 dark:text-sky-500'
                    : ''
                } `}
                onClick={() =>
                  mutate({
                    id: notification._id,
                    status: 'READ',
                  })
                }
              >
                <Avatar />
                <div className="text-left">
                  <div>{notification.content}</div>
                  <div>{notification.updateAt}</div>
                </div>
              </Dropdown.Item>
            ),
          )
        ) : (
          <Skeleton />
        )}
      </Dropdown>
      {socketEvent?.type === 'HAS_NEW_NOTIFICATION' && <Ping />}
    </div>
  )
}

export default Notification
