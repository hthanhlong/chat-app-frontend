import { useEffect, useState } from "react"
import usePropertiesElement from "../../hooks/usePropertiesElement"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import RootLayout from "../../Layouts/RootLayout"
import { Link } from "react-router-dom"
import { CustomLink, CustomModal } from "../../components"
import { useLoading } from "../../hooks/useLoading"
import { sleep } from "../../utils"
import { LIST_COMPONENTS, LIST_SETTINGS } from "./utils"
import WsService from "../../services/WsService"

const Settings = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState(0)
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
          <h1 className="text-xl">Settings</h1>
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
              {LIST_SETTINGS.map((item, index) => (
                <CustomLink
                  key={index}
                  text={item.title}
                  id={item.id}
                  onClick={() => setSelected(item.id)}
                  selected={selected}
                />
              ))}
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
          <div className="setting-right grid w-full h-20 place-items-center px-2">
            {LIST_COMPONENTS[selected].component}
          </div>
        </div>
      </div>
      <CustomModal
        openModal={openModal}
        body="Are you sure you want to logout?"
        textAccept="Yes, I'm sure"
        textClose="No, Cancel"
        actionArea={true}
        onClose={() => setOpenModal(false)}
        onAccept={async () => {
          setOpenModal(false)
          setGlobalLoading(true)
          await sleep(3000)
          new WsService().close()
          window.localStorage.clear()
          window.location.reload()
        }}
      />
    </RootLayout>
  )
}

export default Settings
