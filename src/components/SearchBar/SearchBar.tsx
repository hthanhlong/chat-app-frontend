import { ClassAttributes, FormHTMLAttributes } from "react"
import { JSX } from "react/jsx-runtime"

const SearchBar = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLFormElement> &
    FormHTMLAttributes<HTMLFormElement>
) => {
  return (
    <form {...props}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-700 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-2.5 ps-10 text-sm text-black bg-gray-300 rounded-full"
          placeholder="Searching..."
          required
        />
      </div>
    </form>
  )
}

export default SearchBar
