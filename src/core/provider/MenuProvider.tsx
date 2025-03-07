import { useAnimate } from 'framer-motion'
import { ReactNode, Ref, createContext } from 'react'

export const MenuContext = createContext<{
  scope: Ref<HTMLDivElement>
  animate: unknown
}>({
  scope: null,
  animate: () => {},
})

const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [scope, animate] = useAnimate()

  return (
    <MenuContext.Provider
      value={{
        scope,
        animate,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export default MenuProvider
