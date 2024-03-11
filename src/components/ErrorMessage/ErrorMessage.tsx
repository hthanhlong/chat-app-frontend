const ErrorMessage = ({
  errorMessage,
}: {
  errorMessage: string | undefined
}) => {
  return (
    <>
      {errorMessage && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}
    </>
  )
}

export default ErrorMessage
