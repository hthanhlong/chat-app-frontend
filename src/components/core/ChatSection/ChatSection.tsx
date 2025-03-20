import { useEffect, useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
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
  const { register, handleSubmit, reset } = useForm<FormValues>()
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [localMessages, setLocalMessages] = useState<IMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const callOneTime = useRef(true)
  console.log('isTyping', isTyping)

  const {
    data: response,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<{
    messages: IMessage[]
    hasMore: boolean
    currentPage: number
  }>({
    queryKey: ['get-message', friendId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await MessageService.getMessageById(
        friendId,
        pageParam as number,
      )
      return response.data
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) {
        if (lastPage.currentPage) {
          return Number(lastPage.currentPage) + 1
        }
        return 1
      }
      return undefined
    },
    initialPageParam: 1,
  })

  // Combine server messages và local messages
  const messages = [
    ...(response?.pages.flatMap((page) => page.messages) || []),
    ...localMessages,
  ]

  // Handle socket messages
  useEffect(() => {
    const webSocket = WebsocketService.getInstance()
    if (!webSocket) return

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (data.type === SOCKET_EVENTS.HAS_NEW_MESSAGE) {
        const newMessage = data.payload as IMessage
        if (newMessage.senderId === friendId) {
          setLocalMessages((prev) => [...prev, newMessage])
          scrollToBottom()
        }
      }
    }

    webSocket.addEventListener('message', handleMessage)
    return () => webSocket.removeEventListener('message', handleMessage)
  }, [friendId])

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight } = chatContainerRef.current
      chatContainerRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  // todo fix scroll to bottom
  useEffect(() => {
    if (callOneTime.current) {
      callOneTime.current = false
      setTimeout(() => {
        scrollToBottom()
      }, 1000)
    }
  }, [messages.length])

  const handleScroll = () => {
    if (!chatContainerRef.current) return
    const { scrollTop } = chatContainerRef.current
    if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  // Submit new message
  const onsubmit = (data: FormValues) => {
    const { message } = data
    if (message.trim() === '') return

    const newMessage: IMessage = {
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

    setLocalMessages((prev) => [...prev, newMessage])
    setIsTyping((prev) => !prev)
    reset({ message: '' })
  }

  return (
    <div>
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className={`${
          mode === 'light' ? 'chat-section' : 'dark-chat-section'
        } h-[calc(100vh-160px)] overflow-auto p-2 pt-10 lg:h-[calc(650px-160px)]`}
      >
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {isFetchingNextPage && (
              <div className="text-center">Loading...</div>
            )}
            {messages.map((message) => (
              <Message
                key={message._id}
                message={message.message}
                isSender={message.senderId === userId}
              />
            ))}
          </>
        )}
      </div>
      <form
        className="flex h-[80px] items-center bg-slate-300 p-2 px-2 dark:bg-gray-700"
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
    </div>
  )
}

export default ChatSection
