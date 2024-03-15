import { LeftContent, LeftTop, RightContent, RightTop } from "../../components"
import RootLayout from "../../rootLayout"
import "./Home.css"

const Home = () => {
  return (
    <RootLayout>
      <div className="home grid place-items-center overflow-auto">
        <div className="chat-root bg-white w-[1200px] flex rounded border-[12px] border-opacity-40">
          <div className="chat-left w-[360px] border-r-4 flex flex-col">
            <LeftTop />
            <LeftContent />
          </div>
          <div className="chat-right flex-1 flex flex-col">
            <RightTop />
            <RightContent />
          </div>
        </div>
      </div>
    </RootLayout>
  )
}

export default Home
