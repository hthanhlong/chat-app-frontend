import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { useForm } from "react-hook-form"
import { useAuth } from "../../hooks/useAuth"
import { useSelectedUserChat } from "../../hooks/useSelectedUserChat"
import { useSocketStates } from "../../hooks/useSocketStates"
import { useQueryClient } from "@tanstack/react-query"

const InputChat = () => {
  const queryClient = useQueryClient()
  const { id } = useAuth()
  const { selectedId: partnerId } = useSelectedUserChat()
  const { ws } = useSocketStates()
  const { register, handleSubmit, reset } = useForm()

  const onsubmit = (data: { message: string }) => {
    const { message } = data
    ws?.sendDataToServer({
      type: "SEND_MESSAGE",
      payload: {
        senderId: id,
        receiverId: partnerId,
        message: message,
      },
    })
    reset((formValues) => ({
      ...formValues,
      message: "",
    }))
    queryClient.invalidateQueries({ queryKey: ["get-message", partnerId] })
  }

  return (
    // @ts-expect-error - //
    <form className="h-20 flex items-center" onSubmit={handleSubmit(onsubmit)}>
      <div className="relative w-full border-2 rounded-full">
        <input
          type="text"
          {...register("message", { required: true })}
          className="rounded-full block p-3.5 w-full z-20 text-sm text-gray-900 bg-gray-50 outline-none border-0 focus:ring-0"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="absolute top-[4px] end-1.5 h-10 w-10 rounded-full text-sm font-large text-white bg-sky-300"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </form>
  )
}

export default InputChat
