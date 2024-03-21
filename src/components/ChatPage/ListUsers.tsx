import UserItem from "./UserItem"
import usePropertiesElement from "../../hooks/usePropertiesElement"
import { useQuery } from "@tanstack/react-query"
import { getMyFriends } from "../../axios/friend"
import { useAuth } from "../../hooks/useAuth"
import { useEffect } from "react"
import { useSelectedUserChat } from "../../hooks/useSelectedUserChat"

const OFFSET_BORDER = 6
const TOP_AND_SEARCH_BAR = 186
const TOTAL = OFFSET_BORDER + TOP_AND_SEARCH_BAR

const ListUsers = () => {
  const { id } = useAuth()
  const { selectedId, listFriends, setSelectedId, setListFriends } =
    useSelectedUserChat()
  const properties = usePropertiesElement("main-layout")
  const newH = properties && properties.height - TOTAL

  const { data, isLoading } = useQuery({
    queryKey: ["myFriends"],
    queryFn: () => getMyFriends(id),
  })

  useEffect(() => {
    if (data) {
      setSelectedId(data?.data?.[0]._id)
      setListFriends(data?.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className="overflow-auto" style={{ height: newH || "" }}>
      {!isLoading ? (
        listFriends?.map(
          (user: { _id: string; nickname: string; caption: string }) => (
            <UserItem
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
