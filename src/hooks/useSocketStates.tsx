import { useContext } from "react"
import { SocketStatesContext } from "../provider/SocketProvider"

export const useSocketStates = () => {
  return useContext(SocketStatesContext)
}
