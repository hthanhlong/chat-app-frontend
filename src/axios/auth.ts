import AuthService from "../services/AuthService"
import { AUTH_VARIABLE } from "../constant"

export const refreshToken = async () => {
  try {
    const refToken = localStorage.getItem(AUTH_VARIABLE.REFRESH_TOKEN)
    const result = (await AuthService.callRefreshToken({
      refreshToken: refToken,
    })) as unknown as SuccessResponse<{
      accessToken: string
    }>
    if (result?.isSuccess) return result?.data
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
