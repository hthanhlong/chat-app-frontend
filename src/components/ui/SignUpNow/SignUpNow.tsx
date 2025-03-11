import { Link } from 'react-router-dom'

const SignUpNow = () => {
  return (
    <div className="text-md mt-6 pt-2 text-center">
      <span className="text-neutral-300">Not a memeber yet? </span>
      <span className="text-sky-500 underline hover:text-sky-400">
        <Link to="/sign-up">Sign up now</Link>
      </span>
    </div>
  )
}

export default SignUpNow
