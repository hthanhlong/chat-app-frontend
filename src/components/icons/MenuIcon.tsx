const MenuIcon = ({
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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default MenuIcon
