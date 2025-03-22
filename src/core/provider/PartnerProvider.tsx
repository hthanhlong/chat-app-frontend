import { ReactNode, createContext, useState } from 'react'

type PartnerProviderContextType = {
  partnerId: string
  setPartnerId: (id: string) => void
}

export const PartnerContext = createContext<PartnerProviderContextType>({
  partnerId: '',
  setPartnerId: () => {},
})

const PartnerProvider = ({ children }: { children: ReactNode }) => {
  const [partnerId, setPartnerId] = useState('')
  return (
    <PartnerContext.Provider value={{ partnerId, setPartnerId }}>
      {children}
    </PartnerContext.Provider>
  )
}

export default PartnerProvider
