import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { useSelectedUserChat } from '../../hooks/useSelectedUserChat'
import { useSocketStates } from '../../hooks/useSocketStates'
import { useQueryClient } from '@tanstack/react-query'

const InputChat = () => {
  const queryClient = useQueryClient()
  const { id } = useAuth()
  const { selectedId: partnerId } = useSelectedUserChat()
  const { ws } = useSocketStates()
  const { register, handleSubmit, reset } = useForm()

  const onsubmit = (data: { message: string }) => {
    const { message } = data
    if (ws?.readyState === WebSocket.OPEN) {
      ws?.sendDataToServer({
        type: 'SEND_MESSAGE',
        payload: {
          senderId: id,
          receiverId: partnerId,
          message: message,
        },
      })
    }
    reset((formValues) => ({
      ...formValues,
      message: '',
    }))
    queryClient.invalidateQueries({ queryKey: ['get-message', partnerId] })
  }

  return (
    <form
      className="flex h-20 items-center bg-slate-300 px-2 dark:bg-gray-700 dark:bg-opacity-35"
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
