import { AxiosRequestConfig } from 'axios'
import END_POINT from '../endpoint'
import { ISignIn, ISignUp } from '../../types'
import { HttpService, LocalStorageService } from '.'

class AuthService {
  async signIn(data: ISignIn, options?: AxiosRequestConfig) {
    const response = await HttpService.post(END_POINT.SIGN_IN, data, {
      ...options,
    })
    return response.data
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

  async loginByGoogle(data: unknown, options?: AxiosRequestConfig) {
    const response = await HttpService.post(END_POINT.AUTH_GOOGLE, data, {
      ...options,
    })
    return response.data
  }
}

export default new AuthService()
