import usePropertiesElement from "../../hooks/usePropertiesElement"
import Message from "../Message/Message"
import "./ChatSection.css"

const OFFSET_BORDER = 24
const TOP_AND_SEARCH_BAR = 182
const TOTAL = OFFSET_BORDER + TOP_AND_SEARCH_BAR

const ChatSection = () => {
  const properties = usePropertiesElement("main-layout")
  const newH = properties && properties.height - TOTAL

  return (
    <div
      className="chat-section flex flex-col overflow-auto"
      style={{
        height: newH ? newH : "",
      }}
    >
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
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
      <Message message="Lorem Lorem ipsum dolor sit amet consectetur" />
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
