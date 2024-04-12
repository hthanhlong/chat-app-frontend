// import { useShowMenu } from '../../hooks/useShowMenu'
import { useShowMenu } from '../../hooks/useShowMenu'
import LeftTop from '../ChatPage/LeftTop'
import ListUsers from '../ChatPage/ListUsers'
import { PADDING_CONTAINER } from '../ChatPage/utils'
import SearchBar from '../SearchBar/SearchBar'
import { motion } from 'framer-motion'

const ChatLeftMobile = ({ ...props }) => {
  const { isShowMenu, setIsShowMenu } = useShowMenu()

  return (
    <motion.div
      {...props}
      initial={{ x: '-100%' }}
      animate={{ x: isShowMenu ? 0 : '-100%' }}
      exit={{ x: '-100%' }}
      className="fixed z-10 h-screen w-10/12 border-r-[1px] border-gray-600 shadow-lg shadow-gray-500 dark:bg-black sm:w-8/12 md:w-5/12 lg:hidden"
    >
      <div
        onClick={() => setIsShowMenu(false)}
        className="p-4 text-right text-white"
      >
        X
      </div>
      <div className="chat-left-top">
        <LeftTop />
        <SearchBar
          className={`${PADDING_CONTAINER} border-b-[1px] py-6 dark:border-gray-600`}
        />
      </div>
      <ListUsers />
    </motion.div>
  )
}

export default ChatLeftMobile
