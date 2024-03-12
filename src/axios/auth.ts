import { getRefreshToken } from "../services/auth"

export const refreshToken = async () => {
  try {
    const response = await getRefreshToken()
    const newToken = response
    return newToken
  } catch (error) {
    throw new Error("Failed to refresh token")
  }
}
