import { useContext } from 'react'
import { PartnerContext } from '../provider/PartnerProvider'

const usePartner = () => {
  return useContext(PartnerContext)
}

export default usePartner
