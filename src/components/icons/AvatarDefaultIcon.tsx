const AvatarDefaultIcon = ({
  color = 'text-gray-400',
  className = '',
  width = 'h-12',
  height = 'w-12',
}: {
  color?: string
  className?: string
  width?: string
  height?: string
}) => {
  return (
    <svg
      className={`absolute -left-1 ${width} ${height} ${color} ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default AvatarDefaultIcon
