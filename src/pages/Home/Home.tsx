import { ChatLeft, ChatRight } from '../../components'
import RootLayout from '../../Layouts/RootLayout'
import MenuProvider from '../../provider/MenuProvider'
import MessageProvider from '../../provider/MessageProvider'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <MenuProvider>
      <MessageProvider>
        <RootLayout>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex max-lg:flex-col"
          >
            <ChatLeft />
            <ChatRight />
          </motion.div>
        </RootLayout>
      </MessageProvider>
    </MenuProvider>
  )
}

export default Home
