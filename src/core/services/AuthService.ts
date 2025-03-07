import { AxiosRequestConfig } from 'axios'
import {
  ISignIn,
  ISignInResponse,
  ISignUp,
  ISuccessResponse,
} from '../../types'
import { HttpService, LocalStorageService } from '.'
import END_POINT from '../endpoint'

class AuthService {
  async signIn(
    data: ISignIn,
    options?: AxiosRequestConfig,
  ): Promise<ISuccessResponse<ISignInResponse>> {
    const response = await HttpService.post(END_POINT.SIGN_IN, data, {
      ...options,
    })
    return response as unknown as ISuccessResponse<ISignInResponse>
  }

  async signUp(data: ISignUp, options?: AxiosRequestConfig) {
    const response = await HttpService.post(END_POINT.SIGN_UP, data, {
      ...options,
    })
    return response.data
  }

  async refreshToken() {
    const refToken = LocalStorageService.getRefreshToken()
    if (!refToken) return Promise.reject(new Error('No refresh token found'))
    const response = await HttpService.post(END_POINT.REFRESH_TOKEN, {
      refreshToken: refToken,
    })
    return response.data
  }

  async signInByGoogle(data: unknown, options?: AxiosRequestConfig) {
    const response = await HttpService.post(END_POINT.AUTH_GOOGLE, data, {
      ...options,
    })
    return response.data
  }
}

export default new AuthService()
