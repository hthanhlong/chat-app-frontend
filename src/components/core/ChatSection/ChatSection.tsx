import { useEffect, useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useThemeMode } from 'flowbite-react'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faFile } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'
import { useAuth, usePartner } from '../../../core/hooks'
import Message from '../../ui/Message/Message'
import Skeleton from '../../ui/Skeleton/Skeleton'
import { IMessage } from '../../../types'
import { MESSAGE_TYPE, SOCKET_CHANNEL } from '../../../core/constant'
import { MessageService, WebsocketService } from '../../../core/services'
import './ChatSection.css'

const ChatSection = () => {
  const { mode } = useThemeMode()
  const { uuid } = useAuth()
  const { partnerId } = usePartner()
  const { register, handleSubmit, reset } = useForm<{ message: string }>()
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [localMessages, setLocalMessages] = useState<IMessage[]>([])
  const [scrollToBottomFlag, setScrollToBottomFlag] = useState(false)
  const callOneTime = useRef(true)

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
    queryKey: ['get-message', partnerId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await MessageService.getMessageById(
        partnerId,
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
    staleTime: 1000 * 5, // 5 seconds
  })

  const messages = [
    ...(response?.pages.flatMap((page) => page.messages) || []),
    ...localMessages,
  ]

  // Handle socket messages
  useEffect(() => {
    setLocalMessages([]) // reset local messages when partnerId changes
    const webSocket = WebsocketService.getInstance()
    if (!webSocket) return

    const handleNewMessage = ({
      eventName,
      value,
    }: {
      eventName: string
      value: IMessage
    }) => {
      if (eventName === MESSAGE_TYPE.NEW_MESSAGE) {
        const { senderUuid } = value
        if (senderUuid === partnerId) {
          setLocalMessages((prev) => [...prev, value])
          setScrollToBottomFlag((prev) => !prev)
        }
      }
    }
    webSocket.on(SOCKET_CHANNEL.MESSAGE, handleNewMessage)
    return () => {
      webSocket.off(SOCKET_CHANNEL.MESSAGE, handleNewMessage)
    }
  }, [partnerId])

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight } = chatContainerRef.current
      chatContainerRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottomFlag])

  // todo fix scroll to bottom
  useEffect(() => {
    if (callOneTime.current) {
      callOneTime.current = false
      setTimeout(() => {
        setScrollToBottomFlag((prev) => !prev)
      }, 1000)
    }
  }, [partnerId])

  const handleScroll = () => {
    if (!chatContainerRef.current) return
    const { scrollTop } = chatContainerRef.current
    if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  // Submit new message
  const onsubmit = (data: { message: string }) => {
    const { message } = data
    if (message.trim() === '') return

    const newMessage: IMessage = {
      uuid: uuidv4(),
      senderUuid: uuid,
      receiverUuid: partnerId,
      message: message,
    }

    if (WebsocketService.getInstance()) {
      WebsocketService.sendMessage(SOCKET_CHANNEL.MESSAGE, {
        eventName: MESSAGE_TYPE.NEW_MESSAGE,
        data: {
          uuid,
          value: newMessage,
        },
      })
    }

    setLocalMessages((prev) => [...prev, newMessage])
    setScrollToBottomFlag((prev) => !prev)
    reset({ message: '' })
  }

  const handleUploadImage = (file: File) => {
    if (!file) return
    const _uuid = uuidv4()
    const uploadImagePromise = new Promise((resolve, reject) => {
      try {
        if (!file || !file.type.startsWith('image/')) return

        const newMessage: IMessage = {
          uuid: _uuid,
          senderUuid: uuid,
          receiverUuid: partnerId,
          message: '',
          file: URL.createObjectURL(file),
        }
        setLocalMessages((prev) => [...prev, newMessage])
        setScrollToBottomFlag((prev) => !prev)
        resolve(newMessage)
      } catch (error) {
        reject(error)
      }
    })

    uploadImagePromise.then((value: unknown) => {
      setTimeout(async () => {
        if (typeof value !== 'object') return
        const newMessage = value as IMessage
        const formData = new FormData()
        formData.append('file', file)
        for (const key in newMessage) {
          if (key === 'file') continue
          if (key === 'isImageLoaded') continue
          formData.append(key, newMessage[key as keyof IMessage] as string)
        }
        const response = await MessageService.uploadImage(formData)
        const data = response.data as unknown as IMessage
        if (data) {
          setLocalMessages((preMessages) =>
            preMessages.map((message: IMessage) =>
              message.uuid === data.uuid ? { ...data } : message,
            ),
          )
        }
      }, 1000)
    })
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    //validate size max 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }
    handleUploadImage(file)
  }

  return (
    <div>
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className={`${
          mode === 'light' ? 'chat-section' : 'dark-chat-section'
        } h-[calc(100vh-160px)] overflow-auto p-2 lg:h-[calc(650px-160px)]`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
      >
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {isFetchingNextPage && (
              <div className="text-center">Loading...</div>
            )}
            {messages?.map((message) => (
              <Message
                key={message.uuid}
                message={message.message}
                isSender={message.senderUuid === uuid}
                file={message.file}
              />
            ))}
          </>
        )}
      </div>
      <form
        className="flex h-[80px] items-center bg-slate-300 p-2 px-2 dark:bg-gray-700"
        onSubmit={handleSubmit(onsubmit)}
      >
        <div className="relative flex w-full dark:border-gray-500">
          <input
            type="text"
            {...register('message', { required: true })}
            placeholder="Type a message..."
            autoComplete="off"
            className="order-0 mx-4 w-full rounded-full bg-gray-50 p-3 text-xs text-gray-900 outline-none focus:ring-0 dark:bg-slate-800 dark:text-white"
          />
          <label
            htmlFor="file-upload"
            className="absolute right-14 top-1/2 mx-1 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-sky-300"
          >
            <FontAwesomeIcon icon={faFile} />
          </label>
          <button
            className="absolute right-4 top-1/2 mx-1 h-8 w-8 -translate-y-1/2 rounded-full bg-sky-300"
            type="submit"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
        <input
          id="file-upload"
          className="invisible absolute right-4 top-1/2 mx-1 h-8 w-8 -translate-y-1/2 rounded-full bg-sky-300"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleUploadImage(file)
          }}
        />
      </form>
    </div>
  )
}

export default ChatSection
