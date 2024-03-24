const Message = ({
  isSender = false,
  message,
}: {
  isSender?: boolean
  message: string
}) => {
  const classSender = isSender ? "ml-auto mr-2" : ""

  return (
    <div
      className={`pb-2 max-w-[460px] w-fit rounded-md my-1 p-2 ${classSender} dark:bg-slate-800 dark:text-white `}
    >
      {message}
    </div>
  )
}

export default Message
