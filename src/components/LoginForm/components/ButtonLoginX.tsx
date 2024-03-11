import { XIcon } from "../../../assets"
import Button from "../../Button/Button"

const ButtonLoginX = () => {
  return (
    <Button
      text="Log in with X"
      icon={<XIcon />}
      className="w-full mb-4 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
    />
  )
}

export default ButtonLoginX
