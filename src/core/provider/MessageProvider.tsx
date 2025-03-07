import { createContext, useState, ReactNode } from 'react'
import { IMessage } from '../../types'

export const MessageContext = createContext<{
  messages: IMessage[]
  setMessages: (messages: IMessage[]) => void
}>({
  messages: [],
  setMessages: () => {},
})

const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<IMessage[]>([])

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider
