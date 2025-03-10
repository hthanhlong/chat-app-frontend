import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { host } from '../../config'
import { AuthService, LocalStorageService } from '.'

class HttpService {
  private isCalling = false
  private baseUrl = `${host}/api/v1/`
  private http: AxiosInstance

  constructor() {
    this.http = axios.create({
      baseURL: this.baseUrl,
    })

    this.http.interceptors.request.use(
      function (config) {
        const token = LocalStorageService.getAccessToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      },
    )

    this.http.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        const originalRequest = error.config
        if (
          error.response?.data.errorCode === 'AccessTokenExpired' &&
          this.isCalling === false
        ) {
          this.isCalling = true
          originalRequest._retry = true
          try {
            const { accessToken } = await AuthService.refreshToken()
            if (!accessToken) return Promise.reject(error)
            originalRequest.headers['Authorization'] = 'Bearer ' + accessToken
            LocalStorageService.setAccessToken(accessToken)
            setTimeout(() => (this.isCalling = false), 3000)
            return this.http(originalRequest)
          } catch (refreshError) {
            console.error(refreshError)
            return Promise.reject(refreshError)
          }
        }

        if (error.response?.data.errorCode === 'RefreshTokenExpiredError') {
          try {
            LocalStorageService.clear()
            window.location.reload()
          } catch (refreshError) {
            console.error(refreshError)
            return Promise.reject(refreshError)
          }
        }
        return Promise.reject(error)
      },
    )
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.http.get(url, config)
  }

  post<T>(url: string, data: T, config?: AxiosRequestConfig) {
    return this.http.post<T>(url, data, config)
  }

  put<T>(url: string, data: T, config?: AxiosRequestConfig) {
    return this.http.put<T>(url, data, config)
  }

  patch<T>(url: string, data: T, config?: AxiosRequestConfig) {
    return this.http.patch<T>(url, data, config)
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.http.delete<T>(url, config)
  }
}

export default new HttpService()
