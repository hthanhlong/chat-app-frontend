import { useForm, SubmitHandler } from "react-hook-form"
import PasswordInput from "./components/PasswordInput"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "./validation"
import Input from "../Input/Input"
import LoginDivider from "./components/LoginDivider"
import SignUpNow from "./components/SignUpNow"
import ButtonLogin from "./components/ButtonLogin"
import ButtonLoginX from "./components/ButtonLoginX"
import ButtonLoginGoogle from "./components/ButtonLoginGoogle"
import { useMutation } from "@tanstack/react-query"
import { AuthLogin } from "../../axios/auth"
import { toast } from "react-toastify"
import { sleep } from "../../utils"
import { useEffect } from "react"
import { useLoading } from "../../hooks/useLoading"

const LoginForm = () => {
  // const { setToken } = useAuth();
  // const navigate = useNavigate();

  // const navigate = useNavigate()
  const { setIsLoading } = useLoading()

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
    // error,
    data,
  } = useMutation({
    mutationFn: (data: LoginInput) => {
      return AuthLogin(data)
    },
  })

  const redirectFn = async (
    data: SuccessResponse
  ): Promise<void | undefined> => {
    if (data && data.isSuccess) {
      setIsLoading(true)
      toast(data.message)
      await sleep(3000)
      // navigate("/login")
    }
  }

  useEffect(() => {
    if (data) redirectFn(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <ButtonLogin isLoading={isLoading} />
      <SignUpNow />
      <LoginDivider />
      <ButtonLoginX />
      <ButtonLoginGoogle />
    </form>
  )
}

export default LoginForm
