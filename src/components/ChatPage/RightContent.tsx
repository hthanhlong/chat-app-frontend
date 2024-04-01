import ChatSection from './ChatSection'
import InputChat from './InputChat'

const RightContent = () => {
  return (
    <div className="flex h-full flex-col bg-slate-100 dark:bg-black">
      <ChatSection />
      <InputChat />
    </div>
  )
}

export default RightContent
