import googleSvg from "./google.svg"
import x from "./x.svg"
import OpenEye from "./open-eye.svg"
import HiddenEye from "./hidden-eye.svg"
import LoginImage from "./images/login.png"
import SignUpImage from "./images/signup.png"
import { CustomSvg } from "../components"

const GoogleIcon = () => <CustomSvg src={googleSvg} alt="google" />
const XIcon = () => <CustomSvg src={x} alt="x" />
const OpenPasswordIcon = () => <CustomSvg src={OpenEye} alt="none" />
const HiddenPasswordIcon = () => <CustomSvg src={HiddenEye} alt="none" />
const LoginBackground = () => (
  <img src={LoginImage} className="object-fit h-full w-full" />
)

const SignUpBackground = () => (
  <img src={SignUpImage} className="object-fit h-full w-full" />
)

export {
  GoogleIcon,
  XIcon,
  OpenPasswordIcon,
  HiddenPasswordIcon,
  LoginBackground,
  SignUpBackground,
}
