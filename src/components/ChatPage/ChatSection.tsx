import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../hooks/useAuth'
import usePropertiesElement from '../../hooks/usePropertiesElement'
import './css/ChatSection.css'
import { getAllMessages } from '../../axios/message'
import { useSelectedUserChat } from '../../hooks/useSelectedUserChat'
import { useEffect } from 'react'
import Message from '../Message/Message'
import Skeleton from '../Skeleton/Skeleton'
import { useSocketStates } from '../../hooks/useSocketStates'
import { useThemeMode } from 'flowbite-react'
import { useMessage } from '../../hooks/useMessage'

const OFFSET_BORDER = 6
const TOP_AND_SEARCH_BAR = 182
const TOTAL = OFFSET_BORDER + TOP_AND_SEARCH_BAR

const ChatSection = () => {
  const { mode } = useThemeMode()
  const { id } = useAuth()
  const { selectedId: partnerId } = useSelectedUserChat()
  const { socketEvent } = useSocketStates()
  const properties = usePropertiesElement('main-layout')
  const newH = properties && properties.height - TOTAL + 12
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
      const newMessage = socketEvent.payload as TypeMessage
      if (newMessage.senderId === partnerId) {
        // @ts-expect-error -//
        setMessages((prev: TypeMessage[]) => [...prev, newMessage])
      }
    }
  }, [socketEvent])

  return (
    <div
      className={`${
        mode === 'light' ? 'chat-section' : 'dark-chat-section'
      } scroll-nail flex flex-col overflow-auto p-2`}
      style={{
        height: newH ? newH : '',
      }}
    >
      {!isLoading ? (
        messages.map((message: TypeMessage) => (
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
