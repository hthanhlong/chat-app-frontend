import { IInputProps, ILoginInput } from '../../../types'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'

const Input = ({
  label = 'username',
  name = 'username',
  type = 'text',
  defaultValue = '',
  errorMessage,
  register,
  placeholder,
}: IInputProps<ILoginInput>) => {
  return (
    <div className="mb-4 flex flex-col">
      <input
        type={type}
        defaultValue={defaultValue}
        className="block h-[40px] w-full rounded-md border py-3 ps-3 text-sm placeholder:text-neutral-400 focus:outline-none"
        {...register(name as 'username', { required: true, maxLength: 64 })}
        placeholder={placeholder ? placeholder : `Enter your ${label}`}
        autoComplete="off"
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}

export default Input
