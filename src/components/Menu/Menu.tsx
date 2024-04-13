import { MenuIcon } from '../../assets'

const Menu = ({ handleClickOpen }: { handleClickOpen: () => void }) => {
  return (
    <div className="w-[80px] border-r-[1px] border-gray-600 pt-4 dark:bg-black lg:hidden">
      <div onClick={handleClickOpen} className="flex justify-center">
        <MenuIcon className="h-[32px] w-[32px] cursor-pointer rounded-full text-center transition-all hover:scale-125" />
      </div>
    </div>
  )
}

export default Menu
