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
      className={`mx-4 my-1 px-2 hover:text-blue-700 py-3 cursor-pointer rounded dark:text-white hover:dark:text-blue-70 hover:dark:bg-gray-800 ${
        selected === id ? "bg-gray-100 dark:bg-slate-600 text-blue-700" : ""
      }`}
    >
      {text}
    </li>
  )
}

export default CustomLink
