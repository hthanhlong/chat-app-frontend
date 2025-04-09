const Message = ({
  isSender = false,
  message,
  fileUrl,
  isImageLoaded,
}: {
  isSender?: boolean
  message: string
  fileUrl?: string
  isImageLoaded?: boolean
}) => {
  return (
    <div className={`${isSender ? 'text-right' : 'text-left'} my-1`}>
      {fileUrl ? (
        <img
          src={fileUrl}
          alt="file"
          className={`inline-block max-w-xs rounded-md ${
            isImageLoaded ? 'opacity-100' : 'opacity-20'
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
