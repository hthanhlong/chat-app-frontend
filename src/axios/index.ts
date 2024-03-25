import axios from "axios"
import { refreshToken } from "./auth"
import { AUTH_VARIABLE } from "../constant"

export const http = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
})

http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(AUTH_VARIABLE.ACCESS_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
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
    if (error.response?.data.errorCode === "AccessTokenExpiredError") {
      originalRequest._retry = true
      try {
        const newToken = await refreshToken()
        if (!newToken) return Promise.reject(error)
        const { accessToken } = newToken
        originalRequest.headers["Authorization"] = "Bearer " + accessToken
        localStorage.setItem(AUTH_VARIABLE.ACCESS_TOKEN, accessToken)
        return http(originalRequest)
      } catch (refreshError) {
        console.error(refreshError)
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
