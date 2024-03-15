import Message from "../Message/Message"
import "./ChatSection.css"

const ChatSection = () => {
  return (
    <div className="chat-section flex flex-col h-[1006px] overflow-auto">
      <Message isSender message="hello Lorem ipsum" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message message="ipsum dolor sit amet consectetur" />
      <Message message="dolor sit amet consectetur" />
      <Message message="dolor sit amet consectetur" />
      <Message message="dolor sit amet consectetur" />
      <Message isSender message="hello" />
    </div>
  )
}

export default ChatSection
