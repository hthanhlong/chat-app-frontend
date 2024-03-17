import { useEffect, useState } from "react"
import usePropertiesElement from "../../hooks/usePropertiesElement"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import RootLayout from "../../Layouts/RootLayout"
import { Link } from "react-router-dom"
import { LogoutModal } from "../../components"
import { useLoading } from "../../hooks/useLoading"
import { sleep } from "../../utils"

const Settings = () => {
  const [openModal, setOpenModal] = useState(false)
  const properties = usePropertiesElement("main-layout")
  const { setGlobalLoading } = useLoading()

  const newH = properties && properties.height - 88

  useEffect(() => {
    return () => {
      setGlobalLoading(false)
    }
  }, [])

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
            <ul className="mt-2">
              <li className="mx-4 px-2 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer rounded">
                Profile
              </li>
              <li className="mx-4 px-2 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer rounded">
                Account
              </li>
              <li className="mx-4 px-2 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer rounded">
                Security
              </li>
              <li className="mx-4 px-2 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer rounded">
                Notifications
              </li>
              <li className="mx-4 px-2 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer rounded">
                Privacy
              </li>
              <li className="mx-4 px-2 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer rounded">
                Help
              </li>
              <li
                onClick={() => {
                  setOpenModal(true)
                }}
                className="mx-4 px-2 hover:text-blue-700 hover:bg-gray-100 py-3 cursor-pointer rounded"
              >
                Sign out
              </li>
            </ul>
          </div>
          <div className="setting-right">right</div>
        </div>
      </div>
      <LogoutModal
        openModal={openModal}
        body="Are you sure you want to logout?"
        textAccept="Yes, I'm sure"
        textClose="No, Cancel"
        onClose={() => setOpenModal(false)}
        onAccept={async () => {
          setOpenModal(false)
          setGlobalLoading(true)
          await sleep(3000)
          window.localStorage.clear()
          window.location.reload()
        }}
      />
    </RootLayout>
  )
}

export default Settings
