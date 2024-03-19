import { getAllUsers } from "./../services/userService"
export const listUser = async () => {
  try {
    const response = await getAllUsers()
    console.log("response", response)
    return response
  } catch (error) {
    throw new Error("Failed to get users")
  }
}
