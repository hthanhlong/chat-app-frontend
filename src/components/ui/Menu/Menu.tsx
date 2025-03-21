import { MenuIcon } from '../../icons'

const Menu = ({ handleClickOpen }: { handleClickOpen: () => void }) => {
  return (
    <div
      onClick={handleClickOpen}
      className="flex w-full max-w-[80px] justify-center border-r-[1px] border-gray-600 pt-4 dark:bg-black lg:hidden"
    >
      <span>
        <MenuIcon />
      </span>
    </div>
  )
}

export default Menu
