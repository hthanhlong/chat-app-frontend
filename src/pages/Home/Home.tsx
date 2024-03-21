import { ChatLeft, ChatRight } from "../../components"
import RootLayout from "../../Layouts/RootLayout"
import SelectedUserChatProvider from "../../provider/SelectedUserChatProvider"

const Home = () => {
  return (
    <RootLayout>
      <div className="flex">
        <SelectedUserChatProvider>
          <ChatLeft />
          <ChatRight />
        </SelectedUserChatProvider>
      </div>
    </RootLayout>
  )
}

export default Home
