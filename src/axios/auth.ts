import AuthService from "../services/AuthService"

export const refreshToken = async () => {
  try {
    const response = await AuthService.getRefreshToken()
    const newToken = response
    return newToken
  } catch (error) {
    throw new Error("Failed to refresh token")
  }
}

export const AuthSignUp = (data: unknown) => {
  //@ts-expect-error -//
  delete data.confirmPassword
  return AuthService.signup(data)
}

export const AuthLogin = async (data: LoginInput) => {
  return AuthService.login(data)
}
