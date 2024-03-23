import { useContext } from "react"
import { MessageContext } from "../provider/MessageProvider"

export const useMessage = () => {
  return useContext(MessageContext)
}
