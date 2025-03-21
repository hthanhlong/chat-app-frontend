import { AvatarDefaultIcon } from '../../icons'
const AvatarDefault = ({
  avatarUrl,
  isOnline = false,
  size = 'xl',
}: {
  avatarUrl?: string
  isOnline?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}) => {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  }

  return (
    <div
      className={`relative flex items-center justify-center ${sizeMap[size]} rounded-full border-2 max-lg:h-[40px] max-lg:w-[40px]`}
    >
      {avatarUrl ? (
        <img className="rounded-full" src={avatarUrl} alt="none" />
      ) : (
        <AvatarDefaultIcon />
      )}
      {isOnline && (
        <span className="absolute bottom-0 left-7 h-2 w-2 rounded-full bg-lime-600"></span>
      )}
    </div>
  )
}

export default AvatarDefault
