import { useForm, SubmitHandler } from "react-hook-form"
import { GoogleIcon, XIcon } from "../../assets"
import PasswordInput from "./Input/PasswordInput"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "./validation"
import Input from "./Input/Input"
import Button from "../Button/Button"
import LoginDivider from "./components/LoginDivider"
import SignUpNow from "./components/SignUpNow"

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginInput> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-4">
        <Input
          label="username"
          register={register}
          errorMessage={errors.username?.message}
        />
      </div>
      <div className="flex flex-col mb-4">
        <PasswordInput
          register={register}
          errorMessage={errors.password?.message}
        />
      </div>
      <Button
        type="submit"
        text="Log in"
        className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
      />
      <SignUpNow />
      <LoginDivider />
      <Button
        text="Log in with X"
        icon={<XIcon />}
        className="w-full mb-4 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
      />
      <Button
        text="Log in with Google"
        icon={<GoogleIcon />}
        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
      />
    </form>
  )
}

export default LoginForm
