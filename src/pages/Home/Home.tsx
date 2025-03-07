import { RootLayout } from '../../layouts'
import {
  ChatLeft,
  ChatRight,
  LeftContentLayout,
  RightContentLayout,
} from '../../components'
import { MessageProvider } from '../../core/provider'

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
