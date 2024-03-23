import UserItem from "./UserItem"
import usePropertiesElement from "../../hooks/usePropertiesElement"
import { useQuery } from "@tanstack/react-query"
import { getMyFriends } from "../../axios/friend"
import { useAuth } from "../../hooks/useAuth"
import { useEffect } from "react"
import { useSelectedUserChat } from "../../hooks/useSelectedUserChat"
import { useSocketStates } from "../../hooks/useSocketStates"

const OFFSET_BORDER = 6
const TOP_AND_SEARCH_BAR = 186
const TOTAL = OFFSET_BORDER + TOP_AND_SEARCH_BAR

const ListUsers = () => {
  const { id } = useAuth()
  const { selectedId, listFriends, setSelectedId, setListFriends } =
    useSelectedUserChat()
  const { ws, listOnLineUsers } = useSocketStates()
  const properties = usePropertiesElement("main-layout")
  const newH = properties && properties.height - TOTAL

  const { data, isLoading } = useQuery({
    queryKey: ["myFriends"],
    queryFn: () => getMyFriends(id),
  })

  useEffect(() => {
    if (data && data.data?.length > 0) {
      ws?.sendDataToServer({ type: "GET_ONLINE_USERS" })
      setSelectedId(data?.data?.[0]._id)
      setListFriends(data?.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, ws])

  useEffect(() => {
    const TIME_CALL_GET_ONLINE_USERS = 1000 * 60 * 5 // 5 minutes
    const id = setInterval(() => {
      ws?.sendDataToServer({ type: "GET_ONLINE_USERS" })
    }, TIME_CALL_GET_ONLINE_USERS)
    return () => clearInterval(id)
  }, [ws])

  return (
    <div className="overflow-auto" style={{ height: newH || "" }}>
      {!isLoading ? (
        listFriends?.map(
          (user: { _id: string; nickname: string; caption: string }) => (
            <UserItem
              isOnline={listOnLineUsers.includes(user._id)}
              active={selectedId === user._id}
              key={user._id}
              name={user.nickname}
              caption={user.caption}
              onClick={() => setSelectedId(user._id)}
            />
          )
        )
      ) : (
        <></>
      )}
    </div>
  )
}

export default ListUsers
