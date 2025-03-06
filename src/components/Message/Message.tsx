const Message = ({
  isSender = false,
  message,
}: {
  isSender?: boolean
  message: string
}) => {
  return (
    <div className={`${isSender ? 'text-right' : 'text-left'} my-1`}>
      <span className="p inline-block max-w-sm self-end break-words rounded-md bg-gray-500 p-2 text-xs text-white">
        {message}
      </span>
    </div>
  )
}

export default Message
