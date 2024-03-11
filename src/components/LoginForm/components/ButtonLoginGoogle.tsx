import Button from "../../Button/Button"
import { GoogleIcon } from "../../../assets"

const ButtonLoginGoogle = () => {
  return (
    <Button
      text="Log in with Google"
      icon={<GoogleIcon />}
      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
    />
  )
}

export default ButtonLoginGoogle
