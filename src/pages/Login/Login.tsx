import { LoginBackground } from '../../assets'
import { Title } from '../../components'
import LoginForm from '../../components/LoginForm/LoginForm'

import './login.css'

const Login = () => {
  return (
    <div className="login-back-ground flex items-center justify-center">
      <div className="login-wrapper flex w-[1200px] rounded border-[18px] border-purple-500 border-opacity-25">
        <div className="login-column-left w-[620px]">
          <LoginBackground />
        </div>
        <div className="login-column-left-content grid flex-1 place-content-center">
          <div className="content">
            <Title text="Log in" />
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
