import { AxiosRequestConfig } from 'axios'
import { http } from '../axios'
import END_POINT from './endpoint'

class UserService {
  getAllUsers(id: string, options?: AxiosRequestConfig) {
    return http.get(`${END_POINT.users}/${id}/?type=all`, { ...options })
  }

  getUserById(id: string, options?: AxiosRequestConfig) {
    return http.get(`${END_POINT.users}/${id}?type=one`, { ...options })
  }

  updateUserById(
    id: string,
    data: Record<keyof User, unknown>,
    options?: AxiosRequestConfig,
  ) {
    return http.put(`${END_POINT.users}/${id}`, data, { ...options })
  }
}

export default new UserService()
