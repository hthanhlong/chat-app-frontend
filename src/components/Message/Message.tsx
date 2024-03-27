const Message = ({
  isSender = false,
  message,
}: {
  isSender?: boolean
  message: string
}) => {
  const classSender = isSender ? 'ml-auto' : ''

  return (
    <div
      className={`my-1 w-fit max-w-[460px] rounded-md bg-slate-200 p-2 pb-2 dark:bg-slate-800 dark:text-white ${classSender}`}
    >
      {message}
    </div>
  )
}

export default Message
