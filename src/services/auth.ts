import { AxiosRequestConfig } from "axios"
import { http } from "../axios"
import END_POINT from "./endpoint"

export const signup = <T>(
  data: T,
  options?: AxiosRequestConfig
): Promise<void> => {
  // @ts-expect-error - //
  delete data.confirmPassword
  return http.post(END_POINT.signup, data, { ...options })
}

export const getRefreshToken = (): Promise<void> => {
  return Promise.resolve()
}
