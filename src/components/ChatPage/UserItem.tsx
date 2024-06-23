import { MouseEventHandler, useEffect, useState } from 'react'
import Avatar from '../Avatar/Avatar'
import Timer from './Timer'
import { useQuery } from '@tanstack/react-query'
import { getLastMessages } from '../../axios/message'
import { useSocketStates } from '../../hooks/useSocketStates'
import { useMessage } from '../../hooks/useMessage'
import { IMessage } from '../../types'

const UserItem = ({
  name,
  caption,
  active,
  onClick,
  onContextMenu,
  isOnline,
  userId,
}: {
  name: string
  caption: string
  active?: boolean
  isOnline?: boolean
  userId?: string
  onClick?: MouseEventHandler
  onContextMenu?: MouseEventHandler
}) => {
  const { socketEvent } = useSocketStates()
  const [latestMessage, setLatestMessage] = useState<IMessage>()
  const { messages } = useMessage()
  const [highLight, setHighLight] = useState<boolean>(false)

  const { data } = useQuery({
    queryKey: ['get-last-message', userId],
    // @ts-expect-error -//
    queryFn: () => {
      if (userId) {
        return getLastMessages(userId)
      }
      return Promise.resolve({ data: {} })
    },
  })

  useEffect(() => {
    // @ts-expect-error -//
    setLatestMessage(data?.data)
  }, [data])

  useEffect(() => {
    if (socketEvent?.type === 'HAS_NEW_MESSAGE') {
      const newMessage = socketEvent.payload as IMessage
      if (newMessage.senderId === userId) {
        setLatestMessage(newMessage)
        setHighLight(true)
      }
    }
  }, [socketEvent])

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.receiverId === userId) {
      setLatestMessage(lastMessage)
    }
  }, [messages])

  return (
    <div
      className={`mx-1 my-2 flex cursor-pointer items-center justify-between rounded-s-lg bg-opacity-0 p-1 dark:border-l-4 dark:border-black hover:dark:bg-slate-800 ${
        active
          ? '!bg-gray-100 from-yellow-800 to-black dark:!border-yellow-200 dark:bg-gradient-to-r'
          : 'hover:bg-gray-100 dark:border-slate-800 dark:border-transparent dark:border-opacity-50 dark:hover:bg-slate-800'
      }`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <Avatar name={name} caption={caption} isOnline={isOnline} />
      <div
        onClick={() => {
          setHighLight(false)
        }}
        className="w-[140px] text-right"
      >
        {latestMessage && (
          <div>
            <div className="text-xs dark:text-gray-300">
              <Timer timer={latestMessage?.createdAt} />
            </div>
            <div
              className={`${
                highLight ? 'font-semibold dark:!text-sky-500' : ''
              } truncate text-xs dark:text-gray-300`}
            >
              {latestMessage.receiverId === userId ? 'You: ' : `${name}: `}
              {latestMessage?.message}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserItem
