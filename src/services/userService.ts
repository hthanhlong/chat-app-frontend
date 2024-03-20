import { AxiosRequestConfig } from "axios"
import { http } from "../axios"
import END_POINT from "./endpoint"

class UserService {
  getAllUsers(id: string, options?: AxiosRequestConfig) {
    return http.get(`${END_POINT.users}/${id}/?type=all`, { ...options })
  }

  getUserById(id: string, options?: AxiosRequestConfig) {
    return http.get(`${END_POINT.users}/${id}?type=one`, { ...options })
  }
}

export default new UserService()
