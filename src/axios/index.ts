import axios from "axios"
import { refreshToken } from "./auth"

export const http = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
})

http.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newToken = await refreshToken()
        originalRequest.headers["Authorization"] = "Bearer " + newToken
        return http(originalRequest)
      } catch (refreshError) {
        console.error(refreshError)
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
