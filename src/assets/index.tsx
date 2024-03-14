import googleSvg from "./google.svg"
import x from "./x.svg"
import OpenEye from "./open-eye.svg"
import HiddenEye from "./hidden-eye.svg"
import LoginImage from "./images/login.png"
import SignUpImage from "./images/signup.png"
import AvatarSvg from "./avatarDefault.svg"
import { CustomSvg } from "../components"

const GoogleIcon = () => <CustomSvg src={googleSvg} alt="google" />
const XIcon = () => <CustomSvg src={x} alt="x" />
const OpenPasswordIcon = () => <CustomSvg src={OpenEye} alt="none" />
const HiddenPasswordIcon = () => <CustomSvg src={HiddenEye} alt="none" />

const AvatarDefault = ({ avatarUrl }: { avatarUrl?: string }) => (
  <div className="relative flex items-center justify-center w-14 h-14 rounded-full border-2">
    <img
      className="w-12 h-12 rounded-full dark:bg-gray-600 dark:filter dark:grayscale dark:invert dark:sepia-100"
      src={avatarUrl || AvatarSvg.toString()}
      alt="none"
    />
    <span className="bottom-0 left-9 absolute w-2.5 h-2.5 bg-lime-600 rounded-full"></span>
  </div>
)

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
  AvatarDefault,
}
