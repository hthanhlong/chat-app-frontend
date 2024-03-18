const CustomLink = ({
  text,
  onClick,
}: {
  text: string
  onClick: () => void
}) => {
  return (
    <li
      onClick={onClick}
      className="mx-4 px-2 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer rounded"
    >
      {text}
    </li>
  )
}

export default CustomLink
