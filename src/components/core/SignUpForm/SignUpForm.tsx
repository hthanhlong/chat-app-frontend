import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { signupSchema } from '../../../core/validation'
import { useMutation } from '@tanstack/react-query'
import { useLoading } from '../../../core/hooks'
import { AuthService } from '../../../core/services'
import Title from '../../ui/Title/Title'
import { ISignUp } from '../../../types'
import { ButtonSignUp, Input } from '../../ui'
import { LocalStorageService } from '../../../core/services'
import { sleep } from '../../../utils'
const SignUpForm = () => {
  const navigate = useNavigate()
  const { setGlobalLoading } = useLoading()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: yupResolver(signupSchema),
  })

  const onSubmit: SubmitHandler<ISignUp> = (data) => {
    setGlobalLoading(true)
    signupFn(data)
  }

  const {
    mutate: signupFn,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: ISignUp) => {
      return AuthService.signUp(data)
    },
    onSuccess: async () => {
      toast.success('Sign up successfully, redirecting to sign in page...')
      await sleep(3000)
      setGlobalLoading(false)
      navigate('/sign-in')
    },
    onError: () => {
      setGlobalLoading(false)
      toast.error('Sign up failed, please try again')
    },
  })

  useEffect(() => {
    const accessToken = LocalStorageService.getAccessToken()
    if (accessToken) navigate('/')
  }, [])

  return (
    <form
      className={`flex-1 lg:px-24 lg:py-20 ${isPending ? 'pointer-events-none' : ''}`}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <Title text="Create your Account" />
      <Input
        label="nickname"
        name="nickName"
        register={register}
        errorMessage={errors.nickName?.message}
      />
      <Input
        label="username"
        name="username"
        register={register}
        errorMessage={errors.username?.message}
      />
      <Input
        label="email"
        name="email"
        register={register}
        errorMessage={errors.email?.message}
      />
      <Input
        type="password"
        label="password"
        name="password"
        register={register}
        errorMessage={errors.password?.message}
      />
      <Input
        type="password"
        label="confirm Password"
        name="confirmPassword"
        placeholder="Confirm your password"
        register={register}
        errorMessage={errors.confirmPassword?.message}
      />
      <div className="text-center">
        {/* @ts-expect-error - error is not defined */}
        <p className="text-xs text-red-500">{error?.response?.data.message}</p>
      </div>
      <ButtonSignUp isLoading={isPending} />
      <div className="mt-4 text-center text-sky-500 underline">
        <Link className="text-xs" to="/sign-in">
          You already have account?
        </Link>
      </div>
    </form>
  )
}

export default SignUpForm
