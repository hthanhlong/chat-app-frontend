import { useState } from 'react'
import { HiddenPasswordIcon, OpenPasswordIcon } from '../../../assets'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import { capitalizeFirstLetter } from '../../../utils'

const PasswordInput = ({
  label = 'password',
  errorMessage,
  register,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className="mb-4 flex flex-col">
      <label className="mb-2 text-neutral-400">
        {capitalizeFirstLetter(label)}
      </label>
      <div className="relative flex rounded border">
        <input
          className=" block w-full rounded py-3 ps-3 text-sm"
          {...register('password', { required: true, maxLength: 64 })}
          type={!showPassword ? 'password' : 'text'}
          placeholder="Enter your password"
          autoComplete="new-password"
        />
        <div
          className="absolute bottom-3 right-0 cursor-pointer"
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
