import usePropertiesElement from "../../hooks/usePropertiesElement"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import RootLayout from "../../Layouts/RootLayout"
import { Link } from "react-router-dom"

const Settings = () => {
  const properties = usePropertiesElement("main-layout")
  const newH = properties && properties.height - 88

  return (
    <RootLayout>
      <div className="setting w-full">
        <div className="setting-top flex w-full h-[88px] justify-between p-4 border-b-2 items-center">
          <h1>Settings</h1>
          <Link to="/">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="text-gray-500 hover:text-gray-700"
              fontSize={24}
            />
          </Link>
        </div>
        <div className="setting-body flex">
          <div
            className="setting-left w-[300px] border-r-2"
            style={{
              height: newH || "",
            }}
          >
            <ul className="">
              <li className="px-4 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer">
                Profile
              </li>
              <li className="px-4 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer">
                Account
              </li>
              <li className="px-4 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer">
                Security
              </li>
              <li className="px-4 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer">
                Notifications
              </li>
              <li className="px-4 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer">
                Privacy
              </li>
              <li className="px-4 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer">
                Help
              </li>
              <li className="px-4 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer">
                Sign Out
              </li>
            </ul>
          </div>
          <div className="setting-right">right</div>
        </div>
      </div>
    </RootLayout>
  )
}

export default Settings
