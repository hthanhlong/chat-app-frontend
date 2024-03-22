import { AvatarDefault } from "../../assets"

const Avatar = ({
  avatarUrl,
  name,
  caption,
  className,
  size = "xl",
  textSize = "lg",
  isOnline = false,
}: {
  name?: string
  avatarUrl?: string
  caption?: string
  className?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  textSize?: "xs" | "sm" | "md" | "lg" | "xl"
  isOnline?: boolean
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <AvatarDefault
        isOnline={isOnline}
        size={size}
        avatarUrl={
          avatarUrl || "https://avatars.githubusercontent.com/u/54071671?v=4"
        }
      />
      {caption ? (
        <div>
          <div className={`ml-3 text-${textSize}`}>{name}</div>
          <div className="ml-3 text-xs text-gray-500 dark:text-gray-400">
            {caption}
          </div>
        </div>
      ) : (
        <span className={`ml-3 text-${textSize}`}>{name}</span>
      )}
    </div>
  )
}

export default Avatar
