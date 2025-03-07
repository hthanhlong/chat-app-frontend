import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { signupSchema } from '../../../core/validation'
import { useMutation } from '@tanstack/react-query'
import { sleep } from '../../../utils'
import { useLoading, useAuth } from '../../../core/hooks'
import { AuthService } from '../../../core/services'
import Title from '../../ui/Title/Title'
import { ISignUp, ISuccessResponse } from '../../../types'
import { ButtonSignUp, Input } from '../../ui'

const SignUpForm = () => {
  const navigate = useNavigate()
  const { accessToken } = useAuth()
  const { setGlobalLoading } = useLoading()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: yupResolver(signupSchema),
  })

  const onSubmit: SubmitHandler<ISignUp> = (data) => {
    signupFn(data)
  }

  const {
    mutate: signupFn,
    //@ts-expect-error - //
    isLoading,
    error,
    data,
  } = useMutation({
    mutationFn: (data: ISignUp) => {
      return AuthService.signUp(data)
    },
  })

  const redirectFn = async (
    data: ISuccessResponse<null>,
  ): Promise<void | undefined> => {
    if (data && data.isSuccess) {
      setGlobalLoading(true)
      await sleep(2000)
      toast.success(
        'Account created successfully, redirecting to login page...',
      )
      await sleep(2000)
      navigate('/login')
    }
  }

  useEffect(() => {
    // @ts-expect-error - //
    if (data) redirectFn(data)
    return () => {
      setGlobalLoading(false)
    }
  }, [data])

  useEffect(() => {
    if (accessToken) navigate('/')
    return () => {
      setGlobalLoading(false)
    }
  }, [accessToken])

  return (
    <form
      className={`flex-1 lg:px-24 lg:py-20 ${isLoading ? 'pointer-events-none' : ''}`}
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
      <ButtonSignUp isLoading={isLoading} />
      <div className="mt-4 text-center text-sky-500 underline">
        <Link to="/login">You already have account?</Link>
      </div>
    </form>
  )
}

export default SignUpForm
