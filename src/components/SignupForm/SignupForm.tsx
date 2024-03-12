import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Input from "../Input/Input"
import ButtonSignup from "./components/ButtonSingup"
import { signupSchema } from "./validation"
import { useMutation } from "@tanstack/react-query"
import { signup } from "../../services/auth"

const SignUpForm = () => {
  // const { setToken } = useAuth();
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: yupResolver(signupSchema),
  })

  const onSubmit: SubmitHandler<SignupInput> = (data) => {
    //@ts-expect-error - we are deleting confirmPassword from the data
    delete data.confirmPassword
    signupFn(data)
  }

  const {
    mutate: signupFn,
    // isLoading,
    // isError,
    // error,
  } = useMutation({
    mutationFn: (data: Omit<SignupInput, "confirmPassword">) => {
      return signup<Omit<SignupInput, "confirmPassword">>(data)
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <ButtonSignup />
    </form>
  )
}

export default SignUpForm
