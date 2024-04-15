const Message = ({
  isSender = false,
  message,
}: {
  isSender?: boolean
  message: string
}) => {
  return (
    <div className={`mb-2 flex justify-start ${isSender ? 'justify-end' : ''}`}>
      <span className="break-words rounded-md bg-gray-200 px-2 py-1 dark:bg-slate-800 dark:text-white max-lg:max-w-[460px] max-sm:max-w-[200px] lg:max-w-[500px]">
        {message}
      </span>
    </div>
  )
}

export default Message
