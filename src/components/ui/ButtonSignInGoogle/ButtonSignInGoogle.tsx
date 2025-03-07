import Button from '../Button/Button'
import { GoogleIcon } from '../../../assets'

const ButtonSignInGoogle = () => {
  return (
    <Button
      text="Log in with Google"
      icon={<GoogleIcon />}
      className="inline-flex w-full items-center justify-center rounded bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700"
    />
  )
}

export default ButtonSignInGoogle
