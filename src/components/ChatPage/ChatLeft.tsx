import { useShowMenu } from '../../hooks/useShowMenu'
import SearchBar from '../SearchBar/SearchBar'
import LeftTop from './LeftTop'
import ListUsers from './ListUsers'
import { PADDING_CONTAINER } from './utils'
import { motion } from 'framer-motion'

const ChatLeft = () => {
  const { isShowMenu, setIsShowMenu } = useShowMenu()
  console.log('isShowMenu', isShowMenu)

  return (
    <motion.div
      initial={{ x: '-100%', opacity: 0 }}
      animate={{
        x: isShowMenu ? 0 : '-110%',
        opacity: isShowMenu ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="fixed z-10 h-screen w-10/12 bg-yellow-200 shadow-lg shadow-gray-500 dark:bg-black"
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

export default ChatLeft
