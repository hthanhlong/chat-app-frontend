import { ChatLeft, ChatLeftMobile, ChatRight } from '../../components'
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
            className="main-layout lg:mt-10 lg:h-[650px] lg:max-w-[1200px]"
          >
            <div className="flex h-full max-lg:flex-col lg:flex-row lg:shadow-lg">
              <ChatLeft />
              <ChatLeftMobile />
              <ChatRight />
            </div>
          </motion.div>
        </RootLayout>
      </MessageProvider>
    </MenuProvider>
  )
}

export default Home
