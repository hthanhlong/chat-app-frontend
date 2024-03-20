import UserItem from "./UserItem"
import usePropertiesElement from "../../hooks/usePropertiesElement"

const OFFSET_BORDER = 6
const TOP_AND_SEARCH_BAR = 186
const TOTAL = OFFSET_BORDER + TOP_AND_SEARCH_BAR

const ListUsers = () => {
  const properties = usePropertiesElement("main-layout")
  const newH = properties && properties.height - TOTAL

  return (
    <div className="overflow-auto" style={{ height: newH || "" }}>
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
    </div>
  )
}

export default ListUsers
