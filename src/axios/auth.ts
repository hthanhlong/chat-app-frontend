import { getRefreshToken, serviceSignup, serviceLogin } from "../services/authService"

export const refreshToken = async () => {
  try {
    const response = await getRefreshToken()
    const newToken = response
    return newToken
  } catch (error) {
    throw new Error("Failed to refresh token")
  }
}

export const AuthSignUp = (data: unknown) => {
  //@ts-expect-error -//
  delete data.confirmPassword
  return serviceSignup(data)
}

export const AuthLogin = async (data: LoginInput) => {
  return serviceLogin(data)
}
