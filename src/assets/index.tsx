import googleSvg from './google.svg'
import x from './x.svg'
import OpenEye from './open-eye.svg'
import HiddenEye from './hidden-eye.svg'
import LoginImage from './images/login.png'
import SignUpImage from './images/signup.png'
import AvatarSvg from './avatarDefault.svg'
import { CustomSvg } from '../components'

const GoogleIcon = () => <CustomSvg src={googleSvg} alt="google" />
const XIcon = () => <CustomSvg src={x} alt="x" />
const OpenPasswordIcon = () => <CustomSvg src={OpenEye} alt="none" />
const HiddenPasswordIcon = () => <CustomSvg src={HiddenEye} alt="none" />

const AvatarDefault = ({
  avatarUrl,
  isOnline = false,
  size = 'xl',
}: {
  avatarUrl?: string
  isOnline?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}) => {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  }

  return (
    <div
      className={`relative flex items-center justify-center ${sizeMap[size]} rounded-full border-2`}
    >
      <img
        className="rounded-full"
        src={avatarUrl || AvatarSvg.toString()}
        alt="none"
      />
      {isOnline && (
        <span className="absolute bottom-0 left-9 h-2.5 w-2.5 rounded-full bg-lime-600"></span>
      )}
    </div>
  )
}

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
