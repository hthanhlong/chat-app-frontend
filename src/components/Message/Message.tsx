const Message = ({
  isSender = false,
  message,
}: {
  isSender?: boolean
  message: string
}) => {
  const classSender = isSender ? "ml-auto" : ""

  return (
    <div
      className={`pb-2 max-w-[460px] w-fit rounded-md my-1 p-2 dark:bg-slate-800 dark:text-white bg-slate-200 ${classSender}`}
    >
      {message}
    </div>
  )
}

export default Message
