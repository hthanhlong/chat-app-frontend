import UserService from "../services/UserService"

export const getAllUsers = async (id: string) => {
  try {
    const response = await UserService.getAllUsers(id)
    return response
  } catch (error) {
    throw new Error("Failed to get users")
  }
}

export const getUserById = async (id: string) => {
  try {
    const response = await UserService.getUserById(id)
    return response
  } catch (error) {
    throw new Error("Failed to get user")
  }
}
