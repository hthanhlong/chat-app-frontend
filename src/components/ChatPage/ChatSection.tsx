import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../../hooks/useAuth"
import usePropertiesElement from "../../hooks/usePropertiesElement"
import "./ChatSection.css"
import { getAllMessages } from "../../axios/message"
import { useSelectedUserChat } from "../../hooks/useSelectedUserChat"
import { useEffect } from "react"
import Message from "../Message/Message"
import Skeleton from "../Skeleton/Skeleton"
import { useSocketStates } from "../../hooks/useSocketStates"

const OFFSET_BORDER = 6
const TOP_AND_SEARCH_BAR = 182
const TOTAL = OFFSET_BORDER + TOP_AND_SEARCH_BAR

const ChatSection = () => {
  const { id } = useAuth()
  const { selectedId: partnerId } = useSelectedUserChat()
  const { triggerUpdate } = useSocketStates()
  const properties = usePropertiesElement("main-layout")
  const newH = properties && properties.height - TOTAL
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["get-message", partnerId],
    queryFn: () => getAllMessages(partnerId),
  })

  useEffect(() => {
    const element = document.querySelector(".chat-section")
    element?.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    })
  }, [data])

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["get-message", partnerId] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerUpdate, partnerId])

  return (
    <div
      className="chat-section flex flex-col overflow-auto pl-2 pt-2"
      style={{
        height: newH ? newH : "",
      }}
    >
      {!isLoading ? (
        //@ts-expect-error -//
        data?.data.map(
          (message: { _id: string; senderId: string; message: string }) => (
            <Message
              key={message._id}
              isSender={message.senderId === id}
              message={message.message}
            />
          )
        )
      ) : (
        <Skeleton />
      )}
    </div>
  )
}

export default ChatSection
