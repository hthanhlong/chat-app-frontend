interface LoginInput {
  username: string
  password: string
}

interface SignupInput {
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface ERROR_MESSAGE {
  required: string
  maxLength: string
}

interface InputProps {
  label?: string
  name: string
  errorMessage: string | undefined
  register: UseFormRegister<LoginInput>
  placeholder?: string
  type?: string
}
