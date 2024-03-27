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
      className={`hover:dark:text-blue-70 mx-4 my-1 cursor-pointer rounded px-2 py-3 hover:text-blue-700 dark:text-white hover:dark:bg-gray-800 ${
        selected === id ? 'bg-gray-100 text-blue-700 dark:bg-slate-600' : ''
      }`}
    >
      {text}
    </li>
  )
}

export default CustomLink
