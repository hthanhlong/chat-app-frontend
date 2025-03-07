import Button from '../Button/Button'

const ButtonSignIn = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="mb-4">
      <Button
        disabled={isLoading}
        type="submit"
        text="Sign in"
        className="my-2 w-full rounded bg-[#6d4aff] px-5 py-2 text-lg font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-4 focus:ring-[#6d4aff]"
      />
      <div className="flex justify-between">
        <p className="cursor-pointer text-xs text-blue-400">Forget password</p>
        <p className="cursor-pointer text-xs text-blue-400">Login with SMS</p>
      </div>
    </div>
  )
}

export default ButtonSignIn
