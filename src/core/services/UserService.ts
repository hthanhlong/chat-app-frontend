import { HttpService } from '.'
import END_POINT from '../endpoint'
import { ISuccessResponse } from '../../types'

class UserService {
  getUser = async () => {
    try {
      const response = await HttpService.get(END_POINT.user.getUser)
      return response
    } catch (error) {
      throw new Error('Failed to get user')
    }
  }

  getUserById = async (id: string) => {
    if (!id) throw new Error('User ID is required')

    try {
      const response = await HttpService.get(END_POINT.user.getUserById(id))
      return response
    } catch (error) {
      throw new Error('Failed to get user')
    }
  }
  getUsersNonFriends = async () => {
    try {
      const response = await HttpService.get(END_POINT.user.getUsersNonFriends)
      return response
    } catch (error) {
      throw new Error('Failed to get users')
    }
  }

  updateUser = async <T>(data: FormData): Promise<ISuccessResponse<T>> => {
    try {
      const response = await HttpService.post(END_POINT.user.updateUser, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response as unknown as ISuccessResponse<T>
    } catch (error) {
      throw new Error('Failed to update user')
    }
  }
}

export default new UserService()
