import { useForm, SubmitHandler } from 'react-hook-form'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import PasswordInput from './components/PasswordInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from './validation'
import LoginDivider from './components/LoginDivider'
import SignUpNow from './components/SignUpNow'
import ButtonLogin from './components/ButtonLogin'
import { useMutation } from '@tanstack/react-query'
import { AuthLogin, AuthLoginByGoogle } from '../../axios/auth'
import { capitalizeFirstLetter, sleep } from '../../utils'
import { useEffect } from 'react'
import { useLoading } from '../../hooks/useLoading'
import { useAuth } from '../../hooks/useAuth'
import Title from '../Title/Title'
import Input from './components/Input'
import { ILoginInput, ISuccessResponse } from '../../types'

const LoginForm = () => {
  const { accessToken, setAuth } = useAuth()
  const navigate = useNavigate()

  const { setGlobalLoading } = useLoading()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<ILoginInput> = (data) => {
    loginFn(data)
  }

  const {
    mutate: loginFn,
    //@ts-expect-error - //
    isLoading,
    error,
    data,
  } = useMutation({
    mutationFn: (data: ILoginInput) => {
      return AuthLogin(data)
    },
  })

  const redirectFn = async (
    data: ISuccessResponse<{
      accessToken: string
    }>,
  ): Promise<void | undefined> => {
    if (data && data.isSuccess) {
      setGlobalLoading(true)
      await sleep(3000)
      setAuth(data?.data)
    }
  }

  const handleResponseMessage = async (response: unknown) => {
    // @ts-expect-error - //
    const result: ISuccessResponse = await AuthLoginByGoogle(response)
    if (result.isSuccess) {
      await redirectFn(result)
    } else {
      console.error('Failed to login with Google', result)
    }
  }

  const handleErrorMessage = (error: unknown) => {
    console.error('Login error:', error)
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
    <form
      className="flex-1 lg:px-24 lg:py-20"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <Title text="Log in" />
      <Input
        label="username"
        name="username"
        defaultValue="guest_1"
        register={register}
        errorMessage={errors.username?.message}
        placeholder="id: guest_1 or guest_2"
      />
      <PasswordInput
        register={register}
        defaultValue="Password123"
        errorMessage={errors.password?.message}
      />
      <div className="text-center text-xs">
        <p className="h-[16px] text-red-500">
          {/* @ts-expect-error - //*/}
          {error?.response?.data.message
            ? //  @ts-expect-error - //
              capitalizeFirstLetter(error?.response?.data.message)
            : ''}
        </p>
      </div>
      <ButtonLogin isLoading={isLoading} />
      <LoginDivider />
      <div className="flex items-center justify-center">
        <GoogleLogin
          text="signin_with"
          theme="filled_blue"
          onSuccess={handleResponseMessage}
          onError={() => handleErrorMessage}
        />
      </div>

      <SignUpNow />
    </form>
  )
}

export default LoginForm
