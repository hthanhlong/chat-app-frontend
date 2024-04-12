// import { useShowMenu } from '../../hooks/useShowMenu'
import SearchBar from '../SearchBar/SearchBar'
import LeftTop from './LeftTop'
import ListUsers from './ListUsers'
import { PADDING_CONTAINER } from './utils'
import { motion } from 'framer-motion'

const ChatLeft = () => {
  return (
    <motion.div className="border-r-[1px] border-gray-600 shadow-gray-500 dark:bg-black max-lg:hidden">
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
