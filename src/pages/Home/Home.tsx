import { ChatLeft, ChatRight } from '../../components'
import RootLayout from '../../Layouts/RootLayout'
import MessageProvider from '../../provider/MessageProvider'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <RootLayout>
      <MessageProvider>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex">
            <ChatLeft />
            <ChatRight />
          </div>
        </motion.div>
      </MessageProvider>
    </RootLayout>
  )
}

export default Home
