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

const LoginForm = () => {
  // const { setToken } = useAuth();
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    // setToken("this is a test token");
    // navigate("/", { replace: true });
    console.log(data)
  }

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
      <ButtonLogin />
      <SignUpNow />
      <LoginDivider />
      <ButtonLoginX />
      <ButtonLoginGoogle />
    </form>
  )
}

export default LoginForm
