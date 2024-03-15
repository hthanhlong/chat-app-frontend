const Message = ({
  isSender = false,
  message,
}: {
  isSender?: boolean
  message: string
}) => {
  const classSender = isSender ? "ml-auto bg-blue-200" : "bg-white"

  return (
    <div
      className={`pb-2 max-w-[460px] w-fit rounded-md my-1 p-2 ${classSender}`}
    >
      {message}
    </div>
  )
}

export default Message
