import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import {
  useAuth,
  useSelectedUserChat,
  useSocketStates,
  useMessage,
} from '../../../core/hooks'
import { SOCKET_EVENTS } from '../../../core/constant'

const InputChat = () => {
  const { id } = useAuth()
  const { selectedId: partnerId } = useSelectedUserChat()
  const { ws } = useSocketStates()
  const { register, handleSubmit, reset } = useForm()
  const { messages, setMessages } = useMessage()

  const onsubmit = (data: { message: string }) => {
    const { message } = data
    if (message.trim() === '') {
      return
    }
    if (ws?.readyState === WebSocket.OPEN) {
      const newMessage = {
        _id: uuidv4(),
        senderId: id,
        receiverId: partnerId,
        message: message,
        createdAt: new Date().toISOString(),
      }
      ws?.sendDataToServer({
        type: SOCKET_EVENTS.SEND_MESSAGE,
        payload: newMessage,
      })
      setMessages([...messages, newMessage])
    }
    reset((formValues) => ({
      ...formValues,
      message: '',
    }))
  }

  return (
    <form
      className="flex h-[80px] items-center bg-slate-300 p-2 px-2  dark:bg-gray-700"
      // @ts-expect-error - //
      onSubmit={handleSubmit(onsubmit)}
    >
      <div className="relative w-full rounded-full border-2 dark:border-gray-500">
        <input
          type="text"
          {...register('message', { required: true })}
          className="z-20 block w-full rounded-full border-0 bg-gray-50 p-3.5 text-sm text-gray-900 outline-none focus:ring-0 dark:bg-slate-800 dark:text-white"
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
  )
}

export default InputChat
