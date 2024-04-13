import {
  ChatLeft,
  ChatRight,
  LeftContentLayout,
  RightContentLayout,
} from '../../components'
import RootLayout from '../../Layouts/RootLayout'
import MessageProvider from '../../provider/MessageProvider'

const Home = () => {
  return (
    <MessageProvider>
      <RootLayout>
        <LeftContentLayout>
          <ChatLeft />
        </LeftContentLayout>
        <RightContentLayout>
          <ChatRight />
        </RightContentLayout>
      </RootLayout>
    </MessageProvider>
  )
}

export default Home
