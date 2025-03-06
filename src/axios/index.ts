import axios from 'axios'
import { refreshToken } from './auth'
import { LOCAL_STORAGE_KEY } from '../data'
import { clearLocalStorage } from '../helper'
import { host } from '../config'

let isCalling = false

export const http = axios.create({
  baseURL: `${host}/api/v1/`,
})

http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response?.data.errorCode === 'AccessTokenExpiredError' &&
      isCalling === false
    ) {
      isCalling = true
      originalRequest._retry = true
      try {
        const newToken = await refreshToken()
        if (!newToken) return Promise.reject(error)
        const { accessToken } = newToken
        originalRequest.headers['Authorization'] = 'Bearer ' + accessToken
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken)
        setTimeout(() => (isCalling = false), 3000)
        return http(originalRequest)
      } catch (refreshError) {
        console.error(refreshError)
        return Promise.reject(refreshError)
      }
    }

    if (error.response?.data.errorCode === 'RefreshTokenExpiredError') {
      try {
        clearLocalStorage()
        window.location.reload()
      } catch (refreshError) {
        console.error(refreshError)
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)
