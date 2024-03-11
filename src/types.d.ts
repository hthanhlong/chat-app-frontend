interface LoginInput {
  username: string
  password: string
}

interface ERROR_MESSAGE {
  required: string
  maxLength: string
}

interface InputProps {
  label?: string
  errorMessage: string | undefined
  register: UseFormRegister<LoginInput>
}
