const Message = ({
  isSender = false,
  message,
  file,
}: {
  isSender?: boolean
  message: string
  file?: string
}) => {
  return (
    <div className={`${isSender ? 'text-right' : 'text-left'} my-1`}>
      {file ? (
        <img
          src={file}
          alt="file"
          className={`inline-block max-w-xs rounded-md ${
            file.includes('store.s3') ? 'opacity-100' : 'opacity-20'
          }`}
        />
      ) : (
        <span className="p inline-block max-w-sm self-end break-words rounded-md bg-gray-500 p-2 text-xs text-white">
          {message}
        </span>
      )}
    </div>
  )
}

export default Message
