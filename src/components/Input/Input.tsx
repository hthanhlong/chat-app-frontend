import { capitalizeFirstLetter } from '../../utils'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const Input = ({
  label = 'username',
  name = 'username',
  type = 'text',
  errorMessage,
  register,
  placeholder,
}: InputProps) => {
  return (
    <div className="mb-4 flex flex-col">
      <label className="mb-1 text-neutral-400">
        {capitalizeFirstLetter(label)}
      </label>
      <input
        type={type}
        className="block w-full rounded border py-3 ps-3 text-sm focus:outline-none"
        {...register(name, { required: true, maxLength: 64 })}
        placeholder={placeholder ? placeholder : `Enter your ${label}`}
        autoComplete="false"
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}

export default Input
