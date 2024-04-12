import { MenuIcon } from '../../assets'
import { useShowMenu } from '../../hooks/useShowMenu'
import RightContent from './RightContent'
import RightTop from './RightTop'

const ChatRight = () => {
  const { setIsShowMenu } = useShowMenu()

  return (
    <div className="flex-1 dark:bg-black max-lg:flex max-lg:min-h-screen lg:min-w-[888px]">
      <nav className="border-gray-6 flex flex-col items-center gap-10 border-r-[1px] pt-4 dark:border-gray-600 max-lg:min-w-[80px] lg:hidden">
        <button
          onClick={() => setIsShowMenu(true)}
          className="rounded-full border-[1px] border-gray-200 p-2"
        >
          <MenuIcon className="transition-all hover:scale-110" />
        </button>
      </nav>
      <div className="flex h-full flex-1 flex-col">
        <RightTop />
        <RightContent />
      </div>
    </div>
  )
}

export default ChatRight
