import { useQuery } from '@tanstack/react-query'
import { useAuth, useSelectedUserChat, useWebSocket } from '../../../core/hooks'
import { useEffect, useState } from 'react'
import Message from '../../ui/Message/Message'
import Skeleton from '../../ui/Skeleton/Skeleton'
import { useThemeMode } from 'flowbite-react'
import { IMessage } from '../../../types'
import { SOCKET_EVENTS } from '../../../core/constant'
import { MessageService } from '../../../core/services'
import './ChatSection.css'

const ChatSection = () => {
  const { mode } = useThemeMode()
  const { id } = useAuth()
  const { selectedId: partnerId } = useSelectedUserChat()
  const { webSocketEvent } = useWebSocket()
  const [messages, setMessages] = useState<IMessage[]>([])

  const { data: response, isLoading } = useQuery({
    queryKey: ['get-message', partnerId],
    queryFn: () => MessageService.getAllMessages(partnerId),
  })

  useEffect(() => {
    if (response?.data.length > 0) {
      setMessages(response?.data)
    }
  }, [response])

  useEffect(() => {
    const element = document.querySelector('.scroll-nail')
    element?.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth',
    })
  })

  useEffect(() => {
    if (webSocketEvent?.type === SOCKET_EVENTS.HAS_NEW_MESSAGE) {
      const newMessage = webSocketEvent.payload as IMessage
      if (newMessage.senderId === partnerId) {
        setMessages((prev: IMessage[]) => [...prev, newMessage])
      }
    }
  }, [webSocketEvent])

  const styleScrollBar = mode === 'light' ? 'chat-section' : 'dark-chat-section'

  return (
    <div
      className={`${styleScrollBar} scroll-nail h-[calc(100vh-160px)] overflow-auto p-2 lg:h-[calc(650px-160px)]`}
    >
      {!isLoading ? (
        messages.map((message: IMessage) => (
          <Message
            key={message._id ? message._id : ''}
            isSender={message.senderId === id}
            message={message.message}
          />
        ))
      ) : (
        <Skeleton />
      )}
    </div>
  )
}

export default ChatSection
