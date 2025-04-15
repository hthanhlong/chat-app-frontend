import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
// import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import {
  PasswordInput,
  SignUpNow,
  Input,
  Title,
  ButtonSignIn,
  SignInDivider,
} from '../../ui'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInSchema } from '../../../core/validation'
import { useMutation } from '@tanstack/react-query'
import { sleep } from '../../../utils'
import { useAuth, useLoading } from '../../../core/hooks'
import { ISignIn, ISignInResponse, ISuccessResponse } from '../../../types'
import { AuthService } from '../../../core/services'

const SignInForm = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const { setGlobalLoading } = useLoading()
  const [error, setError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
    resolver: yupResolver(signInSchema),
  })

  const onSubmit: SubmitHandler<ISignIn> = (data) => {
    signInFn(data)
  }

  const { mutate: signInFn, isPending } = useMutation({
    mutationFn: (data: ISignIn) => {
      return AuthService.signIn(data)
    },
    onSuccess: async (response: ISuccessResponse<ISignInResponse>) => {
      if (response.isSuccess) {
        setAuth(response.data)
        toast.success('Sign in successfully, redirecting to home page...')
        setGlobalLoading(true)
        await sleep(3000)
        setGlobalLoading(false)
        navigate('/')
      }
    },
    onError: () => {
      setError('Username or password is incorrect, please try again')
      toast.error('Sign in failed, please try again')
    },
  })

  return (
    <form
      className="flex-1 lg:px-24 lg:py-20"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <Title text="Sign in" />
      <Input
        label="username"
        name="username"
        register={register}
        errorMessage={errors.username?.message}
        placeholder="guest_1 or guest_2"
      />
      <PasswordInput
        register={register}
        errorMessage={errors.password?.message}
      />
      <p className="h-[16px] text-center text-[10px] text-red-500">
        {error || ''}
      </p>
      <ButtonSignIn isLoading={isPending} />
      <SignInDivider />
      {/* <div className="flex items-center justify-center">
        <GoogleLogin
          text="signin_with"
          theme="filled_blue"
          onSuccess={handleResponseMessage}
          onError={() => handleErrorMessage}
        />
      </div> */}
      <SignUpNow />
    </form>
  )
}

export default SignInForm
