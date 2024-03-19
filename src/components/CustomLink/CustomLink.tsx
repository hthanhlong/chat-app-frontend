const CustomLink = ({
  id,
  text,
  onClick,
  selected,
}: {
  id: number
  text: string
  onClick: () => void
  selected: number
}) => {
  return (
    <li
      onClick={onClick}
      className={`mx-4 my-1 px-2 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer rounded ${
        selected === id ? "bg-gray-100 text-blue-700" : ""
      }`}
    >
      {text}
    </li>
  )
}

export default CustomLink
