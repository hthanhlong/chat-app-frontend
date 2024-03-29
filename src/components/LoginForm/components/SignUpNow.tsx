import { Link } from 'react-router-dom'

const SignUpNow = () => {
  return (
    <div className="mt-6 pt-2 text-center text-xs">
      <span className="text-neutral-300">Not a memeber yet? </span>
      <span className="text-sky-500 underline hover:text-sky-400">
        <Link to="/signup">Sign up now</Link>
      </span>
    </div>
  )
}

export default SignUpNow
