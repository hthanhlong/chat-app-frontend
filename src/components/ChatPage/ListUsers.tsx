import UserItem from "./UserItem"
import usePropertiesElement from "../../hooks/usePropertiesElement"
import { useQuery } from "@tanstack/react-query"
import { getMyFriends } from "../../axios/friend"
import { useAuth } from "../../hooks/useAuth"
import { useEffect, useState } from "react"
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
  const [rightClick, setRightClick] = useState("")

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

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".menu-user-item")) {
        setRightClick("")
      }
    }
    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <div className="overflow-auto" style={{ height: newH || "" }}>
      {!isLoading ? (
        listFriends?.map(
          (user: { _id: string; nickname: string; caption: string }) => (
            <div key={user._id} className="relative">
              <UserItem
                isOnline={listOnLineUsers.includes(user._id)}
                active={selectedId === user._id}
                name={user.nickname}
                caption={user.caption}
                onClick={() => setSelectedId(user._id)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  setRightClick(user._id)
                }}
              />
              <div
                className={`menu-user-item absolute bg-white shadow-lg top-[60px] left-2 mb-3 z-10 rounded ${
                  user._id === rightClick ? "block" : "hidden"
                } `}
              >
                <ul>
                  <li className="py-2 px-1 border-b-[1px] hover:bg-slate-200 cursor-pointer text-sm">
                    Clear conservation
                  </li>
                  <li className="py-2 px-1 border-b-[1px] hover:bg-slate-200 cursor-pointer text-sm">
                    Unfriend
                  </li>
                </ul>
              </div>
            </div>
          )
        )
      ) : (
        <></>
      )}
    </div>
  )
}

export default ListUsers
