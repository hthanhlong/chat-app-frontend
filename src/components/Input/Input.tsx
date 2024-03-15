import { capitalizeFirstLetter } from "../../utils"
import ErrorMessage from "../ErrorMessage/ErrorMessage"

const Input = ({
  label = "username",
  name = "username",
  type = "text",
  errorMessage,
  register,
  placeholder,
}: InputProps) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 text-neutral-400">
        {capitalizeFirstLetter(label)}
      </label>
      <input
        type={type}
        className="border rounded block w-full py-3 ps-3 text-sm focus:outline-none"
        {...register(name, { required: true, maxLength: 64 })}
        placeholder={placeholder ? placeholder : `Enter your ${label}`}
        autoComplete="false"
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}

export default Input
