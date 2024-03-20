import { AxiosRequestConfig } from "axios"
import { http } from "../axios"
import END_POINT from "./endpoint"

class AuthService {
  signup<T>(data: T, options?: AxiosRequestConfig): Promise<void> {
    return http.post(END_POINT.signup, data, { ...options })
  }

  login<T>(data: T, options?: AxiosRequestConfig): Promise<void> {
    return http.post(END_POINT.login, data, { ...options })
  }

  getRefreshToken(): Promise<void> {
    return Promise.resolve()
  }
}

export default new AuthService()
