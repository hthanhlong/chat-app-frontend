import AuthService from '../services/AuthService'
import { LOCAL_STORAGE_KEY } from '../constant'

export const refreshToken = async () => {
  try {
    const refToken = localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN)
    const result = (await AuthService.callRefreshToken({
      refreshToken: refToken,
    })) as unknown as SuccessResponse<{
      accessToken: string
    }>
    if (result?.isSuccess) return result?.data
  } catch (error) {
    throw new Error('Failed to refresh token')
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

export const AuthLoginByGoogle = async (data: unknown) => {
  return AuthService.loginByGoogle(data)
}
