import { Link } from 'react-router-dom'

const SignUpNow = () => {
  return (
    <div className="pt-2 text-center">
      <span className="text-neutral-300">Not a memeber yet? </span>
      <span className="text-purple-600">
        <Link to="/signup">Sign up now</Link>
      </span>
    </div>
  )
}

export default SignUpNow
