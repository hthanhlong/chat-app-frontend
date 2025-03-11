import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signupSchema } from '../../../core/validation'
import { useMutation } from '@tanstack/react-query'
import { useLoading } from '../../../core/hooks'
import { AuthService } from '../../../core/services'
import Title from '../../ui/Title/Title'
import { ISignUp } from '../../../types'
import { ButtonSignUp, Input } from '../../ui'
import { LocalStorageService } from '../../../core/services'
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
    onSuccess: () => {
      setGlobalLoading(false)
      navigate('/sign-in')
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
        name="nickname"
        register={register}
        errorMessage={errors.nickname?.message}
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
        {/* @ts-expect-error - //*/}
        <p className="text-red-500">{error?.response?.data.message}</p>
      </div>
      <ButtonSignUp isLoading={isPending} />
      <div className="mt-4 text-center text-sky-500 underline">
        <Link to="/sign-in">You already have account?</Link>
      </div>
    </form>
  )
}

export default SignUpForm
