const ErrorMessage = ({
  errorMessage,
}: {
  errorMessage: string | undefined
}) => {
  return (
    <>
      <p className="text-red-500 text-xs italic h-1">
        {errorMessage ? errorMessage : ""}
      </p>
    </>
  )
}

export default ErrorMessage
