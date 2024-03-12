import Button from "../../Button/Button"

const ButtonSignup = () => {
  return (
    <Button
      type="submit"
      text="Sign up"
      className="w-full mt-8 focus:outline-none 
      text-white 
      bg-green-700 hover:bg-green-800 focus:ring-4 
      focus:ring-green-300 
      font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
    />
  )
}

export default ButtonSignup
