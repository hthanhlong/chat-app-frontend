import { useEffect, useState } from 'react'
import Avatar from '../Avatar/Avatar'
import { WebsocketService } from '../../../core/services'
import { IMessage, EventPayload } from '../../../types'
import { Timer } from '../../ui'
import { MESSAGE_TYPE, SOCKET_CHANNEL } from '../../../core/constant'
import { useGetLatestMessage, usePartner } from '../../../core/hooks'

const UserItem = ({
  name,
  caption,
  isOnline,
  userUuid,
  avatarUrl,
}: {
  name: string
  caption: string
  isOnline: boolean
  userUuid: string
  avatarUrl: string
}) => {
  const [latestMessage, setLatestMessage] = useState<IMessage>()
  const [highLight, setHighLight] = useState<boolean>(false)

  const { data: response } = useGetLatestMessage(userUuid)
  const { partnerId, setPartnerId } = usePartner()

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
      onClick={() => {
        setPartnerId(userUuid)
      }}
      className={`flex cursor-pointer items-center justify-between p-2 transition-all duration-300 ${
        partnerId === userUuid ? 'bg-gray-100 dark:bg-gray-800' : ''
      }`}
    >
      <Avatar
        name={name}
        caption={caption}
        isOnline={isOnline}
        avatarUrl={avatarUrl}
      />
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
              {latestMessage.receiverUuid === userUuid
                ? 'You: '
                : `${name.length > 8 ? name.slice(0, 7) + '...' : name}: `}
              <span className="truncate">
                {latestMessage?.message.length > 4
                  ? latestMessage?.message.slice(0, 3) + '...'
                  : latestMessage?.message}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserItem
