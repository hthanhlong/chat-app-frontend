import { useEffect, useState } from "react"
import usePropertiesElement from "../../hooks/usePropertiesElement"
import Message from "../Message/Message"
import "./ChatSection.css"

const OFFSET_BORDER = 24
const TOP_AND_SEARCH_BAR = 172

const ChatSection = () => {
  const properties = usePropertiesElement("main-layout")
  const [userHeight, setUserHeight] = useState(0)

  useEffect(() => {
    if (properties) {
      const newH = properties.height - OFFSET_BORDER - TOP_AND_SEARCH_BAR
      setUserHeight(newH)
    }
  }, [userHeight, properties])

  return (
    <div
      className="chat-section flex flex-col overflow-auto"
      style={{
        height: userHeight,
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
