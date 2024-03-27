import { useForm, SubmitHandler } from 'react-hook-form'
import PasswordInput from './components/PasswordInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from './validation'
import Input from '../Input/Input'
import LoginDivider from './components/LoginDivider'
import SignUpNow from './components/SignUpNow'
import ButtonLogin from './components/ButtonLogin'
import ButtonLoginX from './components/ButtonLoginX'
import ButtonLoginGoogle from './components/ButtonLoginGoogle'
import { useMutation } from '@tanstack/react-query'
import { AuthLogin } from '../../axios/auth'
import { sleep } from '../../utils'
import { useEffect } from 'react'
import { useLoading } from '../../hooks/useLoading'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const { accessToken, setAuth } = useAuth()
  const navigate = useNavigate()

  const { setGlobalLoading } = useLoading()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    loginFn(data)
  }

  const {
    mutate: loginFn,
    //@ts-expect-error - //
    isLoading,
    error,
    data,
  } = useMutation({
    mutationFn: (data: LoginInput) => {
      return AuthLogin(data)
    },
  })

  const redirectFn = async (
    data: SuccessResponse<{
      accessToken: string
    }>,
  ): Promise<void | undefined> => {
    if (data && data.isSuccess) {
      setGlobalLoading(true)
      await sleep(3000)
      setAuth(data?.data)
    }
  }

  useEffect(() => {
    if (data) redirectFn(data)
  }, [data])

  useEffect(() => {
    if (accessToken) navigate('/')
    return () => {
      setGlobalLoading(false)
    }
  }, [accessToken])

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Input
        label="username"
        name="username"
        register={register}
        errorMessage={errors.username?.message}
      />
      <PasswordInput
        name="password"
        register={register}
        errorMessage={errors.password?.message}
      />
      <div className="text-center">
        {/* @ts-expect-error - //*/}
        <p className="text-red-500">{error?.response?.data.message}</p>
      </div>
      <ButtonLogin isLoading={isLoading} />
      <SignUpNow />
      <LoginDivider />
      <ButtonLoginX />
      <ButtonLoginGoogle />
    </form>
  )
}

export default LoginForm
