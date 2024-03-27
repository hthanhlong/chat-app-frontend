import { useEffect, useState } from 'react'
import usePropertiesElement from '../../hooks/usePropertiesElement'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import RootLayout from '../../Layouts/RootLayout'
import { Link } from 'react-router-dom'
import { CustomLink, CustomModal } from '../../components'
import { useLoading } from '../../hooks/useLoading'
import { sleep } from '../../utils'
import { LIST_COMPONENTS, LIST_SETTINGS } from './utils'
import { useSocketStates } from '../../hooks/useSocketStates'

const Settings = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState(0)
  const properties = usePropertiesElement('main-layout')
  const { setGlobalLoading } = useLoading()
  const { ws, setWs } = useSocketStates()
  const newH = properties && properties.height - 88

  useEffect(() => {
    return () => {
      setGlobalLoading(false)
    }
  }, [])

  return (
    <RootLayout>
      <div className="setting w-full">
        <div className="setting-top flex h-[88px] w-full items-center justify-between border-b-2 p-4">
          <h1 className="text-xl dark:text-white">Settings</h1>
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
              height: newH || '',
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
                className="mx-4 cursor-pointer rounded px-2 py-3 hover:bg-gray-100 hover:text-blue-700 dark:text-white hover:dark:bg-gray-800"
              >
                Sign out
              </li>
            </ul>
          </div>
          <div className="setting-right grid h-20 w-full place-items-center px-2">
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
          if (ws?.readyState === WebSocket.OPEN) {
            ws?.sendDataToServer({
              type: 'CLOSE_CONNECTION',
            })
          }
          // @ts-expect-error - //
          setWs(null)
          await sleep(3000)
          window.localStorage.clear()
          window.location.reload()
        }}
      />
    </RootLayout>
  )
}

export default Settings
