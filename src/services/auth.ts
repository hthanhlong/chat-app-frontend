import { AxiosRequestConfig } from "axios"
import { http } from "../axios"
import END_POINT from "./endpoint"

export const serviceSignup = <T>(
  data: T,
  options?: AxiosRequestConfig
): Promise<void> => {
  return http.post(END_POINT.signup, data, { ...options })
}

export const serviceLogin = <T>(
  data: T,
  options?: AxiosRequestConfig
): Promise<void> => {
  return http.post(END_POINT.login, data, { ...options })
}

export const getRefreshToken = (): Promise<void> => {
  return Promise.resolve()
}
