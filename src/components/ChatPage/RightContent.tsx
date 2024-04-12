import ChatSection from './ChatSection'
import InputChat from './InputChat'

const RightContent = () => {
  return (
    <div className="right-content flex-1 flex-col bg-slate-100 dark:bg-gray-600">
      <ChatSection />
      <InputChat />
    </div>
  )
}

export default RightContent
