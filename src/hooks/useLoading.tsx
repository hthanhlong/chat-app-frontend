import { useContext } from 'react'
import { LoadingContext } from '../provider/LoadingProvider'

export const useLoading = () => {
  return useContext(LoadingContext)
}
