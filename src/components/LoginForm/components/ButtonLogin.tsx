import Button from '../../Button/Button'

const ButtonLogin = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      text="Log in"
      className="my-2 w-full rounded-lg bg-purple-700 px-5 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300"
    />
  )
}

export default ButtonLogin
