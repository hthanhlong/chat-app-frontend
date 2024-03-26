import MessageProvider from "../../provider/MessageProvider"
import ChatSection from "./ChatSection"
import InputChat from "./InputChat"

const RightContent = () => {
  return (
    <MessageProvider>
      <div className="flex flex-col bg-slate-100 h-full dark:bg-black">
        <ChatSection />
        <InputChat />
      </div>
    </MessageProvider>
  )
}

export default RightContent
