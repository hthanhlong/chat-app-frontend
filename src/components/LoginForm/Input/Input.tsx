import { capitalizeFirstLetter } from "../../../utils"
import ErrorMessage from "../../ErrorMessage/ErrorMessage"

const Input = ({ label = "username", errorMessage, register }: InputProps) => {
  return (
    <>
      <label className="mb-2 text-neutral-400">
        {capitalizeFirstLetter(label)}
      </label>
      <input
        className="border rounded block w-full py-3 ps-3 text-sm focus:outline-none"
        {...register(label, { required: true, maxLength: 64 })}
        placeholder="Enter your username"
      />
      <ErrorMessage errorMessage={errorMessage} />
    </>
  )
}

export default Input
