import { capitalizeFirstLetter } from '../../../utils'

const ErrorMessage = ({
  errorMessage,
}: {
  errorMessage: string | undefined
}) => {
  return (
    <>
      <p className="h-1 text-xs text-red-500">
        {errorMessage ? capitalizeFirstLetter(errorMessage) : ''}
      </p>
    </>
  )
}

export default ErrorMessage
