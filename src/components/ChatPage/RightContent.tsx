import ChatSection from "./ChatSection"
import InputChat from "./InputChat"

const RightContent = () => {
  return (
    <div className="flex-1 flex flex-col p-3 pb-0 bg-slate-100">
      <ChatSection />
      <InputChat />
    </div>
  )
}

export default RightContent
