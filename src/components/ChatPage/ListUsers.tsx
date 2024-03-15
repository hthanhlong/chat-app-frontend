import { useEffect, useState } from "react"
import UserItem from "./UserItem"
import usePropertiesElement from "../../hooks/usePropertiesElement"

const OFFSET_BORDER = 24
const TOP_AND_SEARCH_BAR = 186

const ListUsers = () => {
  const properties = usePropertiesElement("main-layout")
  const [userHeight, setUserHeight] = useState(0)

  useEffect(() => {
    if (properties) {
      const newH = properties.height - OFFSET_BORDER - TOP_AND_SEARCH_BAR
      setUserHeight(newH)
    }
  }, [userHeight, properties])

  return (
    <div className="overflow-auto" style={{ height: userHeight }}>
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
