import SignInImage from '../../assets/images/signin.png'
import { SignInForm } from '../../components/core'
import { motion } from 'framer-motion'

const SignIn = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className="rounded-md bg-white p-10 lg:flex lg:max-w-[1200px] lg:p-2"
      >
        <div className="hidden lg:block lg:w-1/2">
          <img src={SignInImage} className="object-fit h-full w-full" />
        </div>
        <div className="lg:flex lg:w-1/2 lg:items-center lg:justify-center">
          <SignInForm />
        </div>
      </motion.div>
    </div>
  )
}

export default SignIn
