import { useContext } from 'react'
import { LoadingContext } from '../provider/LoadingProvider'

const useLoading = () => {
  return useContext(LoadingContext)
}

export default useLoading
