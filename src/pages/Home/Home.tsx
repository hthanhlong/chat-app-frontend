import { ChatLeft, ChatRight } from "../../components"
import RootLayout from "../../rootLayout"

const Home = () => {
  return (
    <RootLayout>
      <div className="flex overflow-hidden">
        <ChatLeft />
        <ChatRight />
      </div>
    </RootLayout>
  )
}

export default Home
