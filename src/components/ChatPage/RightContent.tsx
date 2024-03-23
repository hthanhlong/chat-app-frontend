import MessageProvider from "../../provider/MessageProvider"
import ChatSection from "./ChatSection"
import InputChat from "./InputChat"

const RightContent = () => {
  return (
    <MessageProvider>
      <div className="flex-1 flex flex-col p-3 pb-0 bg-slate-100">
        <ChatSection />
        <InputChat />
      </div>
    </MessageProvider>
  )
}

export default RightContent
