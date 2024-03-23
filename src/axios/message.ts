import MessageService from "../services/MessageService"

export const getAllMessages = async (partnerId: string) => {
  try {
    const response = await MessageService.getAllMessages(partnerId)
    return response
  } catch (error) {
    throw new Error("Failed to get users")
  }
}
