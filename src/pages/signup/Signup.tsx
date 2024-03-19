import { Link } from "react-router-dom"
import { SignUpBackground } from "../../assets"
import { Title } from "../../components"
import SignUpForm from "../../components/SignupForm/SignupForm"

const Signup = () => {
  return (
    <div className="login-back-ground flex items-center justify-center ">
      <div className="login-wrapper block lg:flex rounded w-[1200px] border-[18px] border-purple-500 border-opacity-25">
        <div className="login-column-left-content px-28 flex-1 h-full m-auto">
          <div className="content">
            <Title text="Create Account" />
            <SignUpForm />
            <Link
              className="inline-block mt-4 text-center w-full text-sky-500 underline hover:text-sky-600"
              to="/login"
            >
              You already have account?
            </Link>
          </div>
        </div>
        <div className="login-column-left w-full lg:w-[620px]">
          <SignUpBackground />
        </div>
      </div>
    </div>
  )
}

export default Signup
