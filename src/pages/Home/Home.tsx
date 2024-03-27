import { ChatLeft, ChatRight } from '../../components'
import RootLayout from '../../Layouts/RootLayout'

const Home = () => {
  return (
    <RootLayout>
      <div className="flex">
        <ChatLeft />
        <ChatRight />
      </div>
    </RootLayout>
  )
}

export default Home
