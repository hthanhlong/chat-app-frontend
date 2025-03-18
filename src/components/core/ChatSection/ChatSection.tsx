import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useThemeMode } from 'flowbite-react'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useAuth, useSelectedUserChat } from '../../../core/hooks'
import Message from '../../ui/Message/Message'
import Skeleton from '../../ui/Skeleton/Skeleton'
import { IMessage } from '../../../types'
import { SOCKET_EVENTS } from '../../../core/constant'
import { MessageService, WebsocketService } from '../../../core/services'
import './ChatSection.css'

type FormValues = {
  message: string
}

const ChatSection = () => {
  const { mode } = useThemeMode()
  const { userId } = useAuth()
  const { selectedId: friendId } = useSelectedUserChat()
  const [messages, setMessages] = useState<IMessage[]>([])
  const { register, handleSubmit, reset } = useForm<FormValues>()

  const { data, isLoading } = useQuery({
    queryKey: ['get-message', friendId],
    queryFn: () => MessageService.getMessageById(friendId),
  })

  useEffect(() => {
    if (data?.data.length > 0) {
      setMessages(data?.data)
    }
  }, [data])

  useEffect(() => {
    const webSocket = WebsocketService.getInstance()
    if (!webSocket) return
    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (data.type === SOCKET_EVENTS.HAS_NEW_MESSAGE) {
        const newMessage = data.payload as IMessage
        const { senderId } = data.payload
        if (senderId === friendId) {
          setMessages((prev: IMessage[]) => [...prev, newMessage])
        }
      }
    }
    webSocket.addEventListener('message', handleMessage)
    return () => {
      webSocket.removeEventListener('message', handleMessage)
    }
  }, [friendId])

  const onsubmit = (data: FormValues) => {
    const { message } = data
    if (message.trim() === '') return
    const newMessage = {
      _id: uuidv4(),
      senderId: userId,
      receiverId: friendId,
      message: message,
      createdAt: new Date().toISOString(),
    }
    if (WebsocketService.getInstance()) {
      WebsocketService.sendDataToServer({
        type: SOCKET_EVENTS.SEND_MESSAGE,
        payload: newMessage,
      })
    }
    setMessages([...messages, newMessage])
    reset((formValues) => ({
      ...formValues,
      message: '',
    }))
  }

  useEffect(() => {
    const element = document.querySelector('.scroll-nail')
    element?.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth',
    })
  })

  const styleScrollBar = mode === 'light' ? 'chat-section' : 'dark-chat-section'

  return (
    <>
      <div
        className={`${styleScrollBar} scroll-nail h-[calc(100vh-160px)] overflow-auto p-2 lg:h-[calc(650px-160px)]`}
      >
        {!isLoading ? (
          messages.map((message: IMessage) => (
            <Message
              key={message._id ? message._id : ''}
              isSender={message.senderId === userId}
              message={message.message}
            />
          ))
        ) : (
          <Skeleton />
        )}
      </div>
      <form
        className="flex h-[80px] items-center bg-slate-300 p-2 px-2  dark:bg-gray-700"
        onSubmit={handleSubmit(onsubmit)}
      >
        <div className="relative w-full rounded-full border-2 dark:border-gray-500">
          <input
            type="text"
            {...register('message', { required: true })}
            className="block w-full rounded-full border-0 bg-gray-50 p-3.5 text-sm text-gray-900 outline-none focus:ring-0 dark:bg-slate-800 dark:text-white"
            placeholder="Type a message..."
            autoComplete="off"
          />
          <button
            type="submit"
            className="font-large absolute end-1.5 top-[4px] h-10 w-10 rounded-full bg-sky-300 text-sm text-white"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </>
  )
}

export default ChatSection
