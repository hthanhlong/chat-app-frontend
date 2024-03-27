import { XIcon } from '../../../assets'
import Button from '../../Button/Button'

const ButtonLoginX = () => {
  return (
    <Button
      text="Log in with X"
      icon={<XIcon />}
      className="mb-4 inline-flex w-full items-center justify-center rounded bg-blue-400 px-4 py-2 font-bold text-white hover:bg-blue-500"
    />
  )
}

export default ButtonLoginX
