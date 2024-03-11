import googleSvg from "./google.svg"
import x from "./x.svg"
import OpenEye from "./open-eye.svg"
import HiddenEye from "./hidden-eye.svg"
import { CustomSvg } from "../components"

const GoogleIcon = () => <CustomSvg src={googleSvg} alt="google" />
const XIcon = () => <CustomSvg src={x} alt="x" />
const OpenPasswordIcon = () => <CustomSvg src={OpenEye} alt="none" />
const HiddenPasswordIcon = () => <CustomSvg src={HiddenEye} alt="none" />

export { GoogleIcon, XIcon, OpenPasswordIcon, HiddenPasswordIcon }
