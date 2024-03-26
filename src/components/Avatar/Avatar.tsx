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
    <div className={`flex items-center ${className ? className : ""}`}>
      <AvatarDefault
        isOnline={isOnline}
        size={size}
        avatarUrl={
          avatarUrl || "https://avatars.githubusercontent.com/u/54071671?v=4"
        }
      />

      <div className="ml-3">
        <div className={`text-${textSize} dark:text-gray-300`}>{name}</div>
        {caption && (
          <div className="text-xs text-gray-500 dark:text-gray-300">
            {caption}
          </div>
        )}
      </div>
    </div>
  )
}

export default Avatar
