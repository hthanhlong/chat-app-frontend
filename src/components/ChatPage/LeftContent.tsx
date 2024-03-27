import SearchBar from '../SearchBar/SearchBar'
import ListUsers from './ListUsers'
import { PADDING_CONTAINER } from './utils'

const LeftContent = () => {
  return (
    <div className="flex flex-1 flex-col overflow-hidden border-t-4">
      <SearchBar className={`${PADDING_CONTAINER} py-6`} />
      <ListUsers />
    </div>
  )
}

export default LeftContent
