import { ReactNode, createContext, useMemo, useState } from 'react'

type MenuContextType = {
  isShowMenu: boolean
  setIsShowMenu: (isShow: boolean) => void
}

export const MenuContext = createContext<MenuContextType>({
  isShowMenu: false,
  setIsShowMenu: () => {},
})

const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isShowMenu, setIsShowMenu] = useState(false)

  const contextValue = useMemo(
    () => ({
      isShowMenu,
      setIsShowMenu,
    }),
    [isShowMenu],
  )

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  )
}

export default MenuProvider
