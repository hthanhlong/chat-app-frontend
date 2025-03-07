import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

export interface IInputProps<T extends FieldValues> {
  label?: string
  name: 'username' | 'password' | 'nickname' | 'email' | 'confirmPassword'
  errorMessage: string | undefined
  register: UseFormRegister<T>
  placeholder?: string
  type?: string
  defaultValue?: string
}

const Input = <T extends FieldValues>({
  label = 'username',
  name = 'username',
  type = 'text',
  defaultValue = '',
  errorMessage,
  register,
  placeholder,
}: IInputProps<T>) => {
  return (
    <div className="mb-4 flex flex-col">
      <input
        type={type}
        defaultValue={defaultValue}
        className="block h-[40px] w-full rounded-md border py-3 ps-3 text-sm placeholder:text-neutral-400 focus:outline-none"
        {...register(name as Path<T>, { required: true, maxLength: 64 })}
        placeholder={placeholder ? placeholder : `Enter your ${label}`}
        autoComplete="off"
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}

export default Input
