const ErrorMessage = ({
  errorMessage,
}: {
  errorMessage: string | undefined
}) => {
  return (
    <>
      <p className="h-1 text-xs italic text-red-500">
        {errorMessage ? errorMessage : ''}
      </p>
    </>
  )
}

export default ErrorMessage
