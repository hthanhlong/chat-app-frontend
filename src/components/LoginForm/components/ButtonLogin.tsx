import Button from "../../Button/Button"

const ButtonLogin = () => {
  return (
    <Button
      type="submit"
      text="Log in"
      className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
    />
  )
}

export default ButtonLogin
