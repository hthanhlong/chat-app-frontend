import { LoginBackground } from "../../assets"
import LoginForm from "../../components/LoginForm/LoginForm"

import "./login.css"

const Login = () => {
  return (
    <div className="login-back-ground flex items-center justify-center ">
      <div className="login-wrapper flex rounded w-[1200px] border-[18px] border-purple-500 border-opacity-25">
        <div className="login-column-left w-[620px]">
          <LoginBackground />
        </div>
        <div className="login-column-left-content p-28 flex-1">
          <div className="content">
            <h3 className="text-lg mb-4 font-medium">Log in</h3>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
