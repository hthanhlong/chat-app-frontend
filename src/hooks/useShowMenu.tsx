import { useContext } from 'react'
import { MenuContext } from '../provider/MenuProvider'

export const useShowMenu = () => {
  return useContext(MenuContext)
}
