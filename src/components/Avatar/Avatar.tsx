import { AvatarDefault } from "../../assets"
import { PADDING_CONTAINER } from "../ChatPage/utils"

const Avatar = ({
  avatarUrl,
  name,
  caption,
}: {
  avatarUrl?: string
  name: string
  caption?: string
}) => {
  return (
    <div className={`flex items-center ${PADDING_CONTAINER}`}>
      <AvatarDefault avatarUrl={avatarUrl} />
      {caption ? (
        <div>
          <div className="ml-3">{name}</div>
          <div className="ml-3 text-xs text-gray-500 dark:text-gray-400">
            {caption}
          </div>
        </div>
      ) : (
        <span className="ml-3">{name}</span>
      )}
    </div>
  )
}

export default Avatar
