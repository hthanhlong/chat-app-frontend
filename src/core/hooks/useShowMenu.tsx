import { useContext } from 'react'
import { MenuContext } from '../provider/MenuProvider'
const useShowMenu = () => {
  return useContext(MenuContext)
}

export default useShowMenu
