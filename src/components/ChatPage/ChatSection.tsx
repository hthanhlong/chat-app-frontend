import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../hooks/useAuth'
import './css/ChatSection.css'
import { getAllMessages } from '../../axios/message'
import { useSelectedUserChat } from '../../hooks/useSelectedUserChat'
import { useEffect } from 'react'
import Message from '../Message/Message'
import Skeleton from '../Skeleton/Skeleton'
import { useSocketStates } from '../../hooks/useSocketStates'
import { useThemeMode } from 'flowbite-react'
import { useMessage } from '../../hooks/useMessage'
import { IMessage } from '../../types'

const ChatSection = () => {
  const { mode } = useThemeMode()
  const { id } = useAuth()
  const { selectedId: partnerId } = useSelectedUserChat()
  const { socketEvent } = useSocketStates()
  const { messages, setMessages } = useMessage()

  const { data, isLoading } = useQuery({
    queryKey: ['get-message', partnerId],
    // @ts-expect-error -//
    queryFn: () => {
      if (partnerId) {
        return getAllMessages(partnerId)
      }
      return Promise.resolve({ data: [] })
    },
  })

  useEffect(() => {
    const chatRight = document.getElementById('chat-right')
    if (!chatRight) return
    const height = chatRight.clientHeight
    console.log(height)
    const element = document.querySelector('.scroll-nail')
    element?.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth',
    })
  })

  useEffect(() => {
    setMessages([])
    // @ts-expect-error -//
    if (data?.data.length > 0) {
      // @ts-expect-error -//
      setMessages(data?.data)
    }
  }, [data])

  useEffect(() => {
    if (socketEvent?.type === 'HAS_NEW_MESSAGE') {
      const newMessage = socketEvent.payload as IMessage
      if (newMessage.senderId === partnerId) {
        // @ts-expect-error -//
        setMessages((prev: IMessage[]) => [newMessage, ...prev])
      }
    }
  }, [socketEvent])

  const styleScrollBar = mode === 'light' ? 'chat-section' : 'dark-chat-section'

  return (
    <div
      className={`${styleScrollBar} scroll-nail h-[calc(100vh-160px)] overflow-y-auto p-2 lg:h-[calc(650px-160px)]`}
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
