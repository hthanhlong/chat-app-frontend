const Message = ({
  isSender = false,
  message,
}: {
  isSender?: boolean
  message: string
}) => {
  return (
    <div className={`${isSender ? 'text-right' : 'text-left'} my-4`}>
      <span className="self-end rounded-md bg-gray-500 p-2 text-xs text-white">
        {message}
      </span>
    </div>
  )
}

export default Message
