import { useQuery } from '@tanstack/react-query'
import {
  useAuth,
  useMessage,
  useSelectedUserChat,
  useSocketStates,
} from '../../../core/hooks'
import { useEffect } from 'react'
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
  const { socketListener } = useSocketStates()
  const { messages, setMessages } = useMessage()

  const { data, isLoading } = useQuery({
    queryKey: ['get-message', partnerId],
    // @ts-expect-error -//
    queryFn: () => {
      if (partnerId) {
        return MessageService.getAllMessages(partnerId)
      }
      return Promise.resolve({ data: [] })
    },
  })

  useEffect(() => {
    const element = document.querySelector('.scroll-nail')
    element?.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth',
    })
  })

  useEffect(() => {
    setMessages([])
    if (data?.data.length > 0) {
      setMessages(data?.data)
    }
  }, [data])

  useEffect(() => {
    if (socketListener?.type === SOCKET_EVENTS.HAS_NEW_MESSAGE) {
      const newMessage = socketListener.payload as IMessage
      if (newMessage.senderId === partnerId) {
        // @ts-expect-error -//
        setMessages((prev: IMessage[]) => [...prev, newMessage])
      }
    }
  }, [socketListener])

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
