import { LeftContent, LeftTop, RightContent, RightTop } from "../../components"
import RootLayout from "../../rootLayout"
import "./Home.css"

const Home = () => {
  return (
    <RootLayout>
      <div className="home grid place-items-center">
        <div className="chat-section bg-white w-[1200px] h-[600px] flex rounded border-[12px] border-opacity-40">
          <div className="chat-left w-[360px] border-r-4">
            <LeftTop />
            <LeftContent />
          </div>
          <div className="chat-right flex-1">
            <RightTop />
            <RightContent />
          </div>
        </div>
      </div>
    </RootLayout>
  )
}

export default Home
