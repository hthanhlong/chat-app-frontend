import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

const InputChat = () => {
  return (
    <form className="h-20 flex items-center">
      <div className="relative w-full">
        <input
          type="search"
          id="search-dropdown"
          className="rounded-full block p-3.5 w-full z-20 text-sm text-gray-900 bg-gray-50 outline-none border-gray-300 border-2"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="absolute top-1.5 end-1.5 h-10 w-10 rounded-full text-sm font-large text-white bg-sky-300"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </form>
  )
}

export default InputChat
