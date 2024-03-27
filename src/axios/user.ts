import UserService from '../services/UserService'

export const getAllUsers = async (id: string) => {
  try {
    const response = await UserService.getAllUsers(id)
    return response
  } catch (error) {
    throw new Error('Failed to get users')
  }
}

export const getUserById = async (id: string) => {
  try {
    const response = await UserService.getUserById(id)
    return response
  } catch (error) {
    throw new Error('Failed to get user')
  }
}

export const updateUserById = async (
  id: string,
  data: Record<string, unknown>,
) => {
  try {
    const response = await UserService.updateUserById(id, data)
    return response
  } catch (error) {
    throw new Error('Failed to update user')
  }
}
