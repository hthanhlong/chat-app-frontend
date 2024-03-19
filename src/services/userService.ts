import { AxiosRequestConfig } from "axios"
import { http } from "../axios"
import END_POINT from "./endpoint"

export const getAllUsers = (options?: AxiosRequestConfig) => {
  return http.get(END_POINT.users, { ...options })
}
