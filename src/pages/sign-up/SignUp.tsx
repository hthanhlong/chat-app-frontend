import SignUpImage from '../../assets/images/signup.png'
import SignUpForm from '../../components/core/SignUpForm/SignUpForm'
import { motion } from 'framer-motion'

const SignUp = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-md bg-white p-10 lg:flex lg:max-w-[1200px] lg:p-2"
      >
        <div className="lg:flex lg:w-1/2 lg:items-center lg:justify-center">
          <SignUpForm />
        </div>
        <div className="hidden lg:block lg:w-1/2">
          <img src={SignUpImage} className="object-fit h-full w-full" />
        </div>
      </motion.div>
    </div>
  )
}

export default SignUp
