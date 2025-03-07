import { UseFormRegister } from 'react-hook-form'
import { useState } from 'react'
import { HiddenPasswordIcon, OpenPasswordIcon } from '../../../assets'
import { ISignIn } from '../../../types'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const PasswordInput = ({
  errorMessage,
  register,
  defaultValue,
}: {
  errorMessage: string | undefined
  register: UseFormRegister<ISignIn>
  defaultValue?: string
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className="mb-4 flex flex-col">
      <div className="relative flex rounded border">
        <input
          className="block h-[40px] w-full rounded-md py-3 ps-3 text-sm placeholder:text-neutral-400 focus:outline-none"
          {...register('password', { required: true, maxLength: 64 })}
          type={!showPassword ? 'password' : 'text'}
          placeholder="Pass: Password123"
          autoComplete="off"
          defaultValue={defaultValue}
        />
        <div
          className="absolute right-[4%] top-[50%] -translate-y-1/2 cursor-pointer"
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
