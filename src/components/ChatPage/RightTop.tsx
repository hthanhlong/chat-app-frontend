import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import Avatar from "../Avatar/Avatar"

const RightTop = () => {
  return (
    <div className="border-b-4 flex items-center justify-between">
      <Avatar name="Brett Johnson" caption="Active" />
      <div className="relative">
        <button
          id="dropdownDefaultButton"
          className="hover:text-blue-700"
          data-dropdown-toggle="settings-dropdown"
          type="button"
        >
          <FontAwesomeIcon
            icon={faGear}
            className="mr-3 opacity-20"
            fontSize={26}
          />
        </button>
        <div
          id="settings-dropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow"
        >
          <ul
            className="text-sm text-gray-700 rounded-lg"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 hover:rounded-lg"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 hover:rounded-lg"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RightTop
