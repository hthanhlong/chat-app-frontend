import { GoogleIcon } from '../../icons'
import Button from '../Button/Button'

const ButtonSignInGoogle = () => {
  return (
    <Button
      text="Sign in with Google"
      icon={<GoogleIcon />}
      className="inline-flex w-full items-center justify-center rounded bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700"
    />
  )
}

export default ButtonSignInGoogle
