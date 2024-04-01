import { ChatLeft, ChatRight } from '../../components'
import RootLayout from '../../Layouts/RootLayout'
import MessageProvider from '../../provider/MessageProvider'

const Home = () => {
  return (
    <RootLayout>
      <MessageProvider>
        <div className="flex">
          <ChatLeft />
          <ChatRight />
        </div>
      </MessageProvider>
    </RootLayout>
  )
}

export default Home
