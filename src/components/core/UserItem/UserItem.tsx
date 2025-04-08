import { MouseEventHandler, useEffect, useState } from 'react'
import Avatar from '../Avatar/Avatar'
import { WebsocketService } from '../../../core/services'
import { IMessage, EventPayload } from '../../../types'
import { Timer } from '../../ui'
import { MESSAGE_TYPE, SOCKET_CHANNEL } from '../../../core/constant'
import { useGetLatestMessage } from '../../../core/hooks'

const UserItem = ({
  name,
  caption,
  active,
  onClick,
  onContextMenu,
  isOnline,
  userUuid,
}: {
  name: string
  caption: string
  active: boolean
  isOnline: boolean
  userUuid: string
  onClick?: MouseEventHandler
  onContextMenu?: MouseEventHandler
}) => {
  const [latestMessage, setLatestMessage] = useState<IMessage>()
  const [highLight, setHighLight] = useState<boolean>(false)

  const { data: response } = useGetLatestMessage(userUuid)

  useEffect(() => {
    if (response?.data) {
      setLatestMessage(response?.data)
    }
  }, [response])

  useEffect(() => {
    const webSocket = WebsocketService.getInstance()
    if (!webSocket) return

    webSocket.on(SOCKET_CHANNEL.MESSAGE, (payload: EventPayload<IMessage>) => {
      if (payload.eventName === MESSAGE_TYPE.NEW_MESSAGE) {
        const { senderUuid } = payload.value
        if (senderUuid === userUuid) {
          setLatestMessage(payload.value)
          setHighLight(true)
        }
      }
    })

    return () => {
      webSocket.off(SOCKET_CHANNEL.MESSAGE)
    }
  }, [userUuid])

  return (
    <div
      className={`z-0 mx-1 my-2 flex cursor-pointer items-center justify-between rounded-s-lg bg-opacity-0 p-1 dark:border-l-4 dark:border-black hover:dark:bg-slate-800 ${
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
              {latestMessage.receiverUuid === userUuid ? 'You: ' : `${name}: `}
              {latestMessage?.message}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserItem
