import { useState } from 'react'
import { HiddenPasswordIcon, OpenPasswordIcon } from '../../../assets'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'

const PasswordInput = ({ errorMessage, register }: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className="mb-4 flex flex-col">
      <div className="relative flex rounded border">
        <input
          className="block h-[40px] w-full py-3 ps-3 text-sm placeholder:text-neutral-400 focus:outline-none"
          {...register('password', { required: true, maxLength: 64 })}
          type={!showPassword ? 'password' : 'text'}
          placeholder="Enter your password"
          autoComplete="off"
        />
        <div
          className="absolute -right-1 bottom-2 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <HiddenPasswordIcon /> : <OpenPasswordIcon />}
        </div>
      </div>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}

export default PasswordInput
