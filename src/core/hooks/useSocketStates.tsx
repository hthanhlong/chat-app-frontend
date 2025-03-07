import { useContext } from 'react'
import { SocketStatesContext } from '../provider/SocketProvider'

const useSocketStates = () => {
  return useContext(SocketStatesContext)
}

export default useSocketStates
