import { useState } from "react"
import { HiddenPasswordIcon, OpenPasswordIcon } from "../../../assets"
import ErrorMessage from "../../ErrorMessage/ErrorMessage"
import { capitalizeFirstLetter } from "../../../utils"

const PasswordInput = ({
  label = "password",
  errorMessage,
  register,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-neutral-400">
        {capitalizeFirstLetter(label)}
      </label>
      <div className="flex border rounded">
        <input
          className=" block w-full py-3 ps-3 text-sm focus:outline-none"
          {...register("password", { required: true, maxLength: 64 })}
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
        />
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <HiddenPasswordIcon /> : <OpenPasswordIcon />}
        </button>
      </div>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}

export default PasswordInput
