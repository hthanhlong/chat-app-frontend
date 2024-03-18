import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify"
import Input from "../Input/Input"
import ButtonSignup from "./components/ButtonSingup"
import { signupSchema } from "./validation"
import { useMutation } from "@tanstack/react-query"
import { sleep } from "../../utils"
import { useLoading } from "../../hooks/useLoading"
import { AuthSignUp } from "../../axios/auth"

const SignUpForm = () => {
  const navigate = useNavigate()
  const { setGlobalLoading } = useLoading()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: yupResolver(signupSchema),
  })

  const onSubmit: SubmitHandler<SignupInput> = (data) => {
    signupFn(data)
  }

  const {
    mutate: signupFn,
    //@ts-expect-error - //
    isLoading,
    error,
    data,
  } = useMutation({
    mutationFn: (data: SignupInput) => {
      return AuthSignUp(data)
    },
  })

  const redirectFn = async (
    data: SuccessResponse<null>
  ): Promise<void | undefined> => {
    if (data && data.isSuccess) {
      setGlobalLoading(true)
      await sleep(2000)
      toast.success(
        "Account created successfully, redirecting to login page..."
      )
      await sleep(2000)
      navigate("/login")
    }
  }

  useEffect(() => {
    if (data) redirectFn(data)
    return () => {
      setGlobalLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <form
      className={`${isLoading ? "pointer-events-none" : ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <ButtonSignup isLoading={isLoading} />
    </form>
  )
}

export default SignUpForm
