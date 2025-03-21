const CloseIcon = ({
  color = 'text-gray-400',
  className = '',
  width = 'w-12',
  height = 'h-12',
}: {
  color?: string
  className?: string
  width?: string
  height?: string
}) => {
  return (
    <svg
      className={`${width} ${height} ${color} ${className}`}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
    >
      <line x1="20" y1="20" x2="44" y2="44" />
      <line x1="44" y1="20" x2="20" y2="44" />
      <rect x="8" y="8" width="48" height="48" />
    </svg>
  )
}

export default CloseIcon
