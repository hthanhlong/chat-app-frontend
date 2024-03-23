import { createContext, useState, ReactNode } from "react"

export const MessageContext = createContext<{
  messages: TypeMessage[]
  setMessages: (messages: TypeMessage[]) => void
}>({
  messages: [],
  setMessages: () => {},
})

const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<TypeMessage[]>([])

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider
