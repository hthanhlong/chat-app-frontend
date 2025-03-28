import Button from '../Button/Button'
import { XIcon } from '../../icons'

const ButtonSignInX = () => {
  return (
    <Button
      text="Sign in with X"
      icon={<XIcon />}
      className="inline-flex w-full items-center justify-center rounded bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
    />
  )
}

export default ButtonSignInX
