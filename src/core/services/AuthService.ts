import {
  ISignIn,
  ISignInResponse,
  ISignUp,
  ISuccessResponse,
} from '../../types'
import { HttpService, LocalStorageService } from '.'
import END_POINT from '../endpoint'

class AuthService {
  async signIn(data: ISignIn): Promise<ISuccessResponse<ISignInResponse>> {
    const response = await HttpService.post(END_POINT.auth.signIn, data)
    return response as unknown as ISuccessResponse<ISignInResponse>
  }

  async signUp(data: ISignUp) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = data
    const response = await HttpService.post(END_POINT.auth.signUp, rest)
    return response.data
  }

  async refreshToken(): Promise<{ accessToken: string }> {
    const refToken = LocalStorageService.getRefreshToken()
    if (!refToken) return Promise.reject(new Error('No refresh token found'))
    const response = await HttpService.post(END_POINT.auth.refreshToken, {
      refreshToken: refToken,
    })
    return response.data as unknown as { accessToken: string }
  }

  async signInByGoogle(data: unknown) {
    const response = await HttpService.post(END_POINT.auth.googleSignIn, data)
    return response.data
  }

  async signOut() {
    const response = await HttpService.get(END_POINT.auth.signOut)
    return response.data
  }
}

export default new AuthService()
