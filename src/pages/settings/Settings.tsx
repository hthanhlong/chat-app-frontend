import { useEffect, useState } from 'react'
import { googleLogout } from '@react-oauth/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons'
import RootLayout from '../../Layouts/RootLayout'
import { Link, useLocation } from 'react-router-dom'
import {
  CustomLink,
  CustomModal,
  LeftContentLayout,
  RightContentLayout,
} from '../../components'
import { useLoading } from '../../hooks/useLoading'
import { sleep } from '../../utils'
import { LIST_COMPONENTS, LIST_SETTINGS } from './utils'
import { useSocketStates } from '../../hooks/useSocketStates'
import { useThemeMode } from 'flowbite-react'
import { clearLocalStorage } from '../../helper'

const Settings = () => {
  const { state } = useLocation()
  const [openModal, setOpenModal] = useState(false)
  const { mode, setMode } = useThemeMode()
  const [selected, setSelected] = useState(state?.friendTap || 0)
  const { setGlobalLoading } = useLoading()
  const { ws, setWs } = useSocketStates()

  useEffect(() => {
    return () => {
      setGlobalLoading(false)
    }
  }, [])

  return (
    <RootLayout>
      <LeftContentLayout>
        <div className="flex min-h-[80px] items-center justify-between border-b-[1px] border-gray-600 p-4">
          <h1 className="text-md dark:text-white lg:text-xl">Settings</h1>
          <div>
            <button
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
              className="mr-6 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon
                icon={mode === 'light' ? faMoon : faSun}
                fontSize={24}
              />
            </button>
            <Link to="/">
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="text-gray-500 hover:text-gray-700"
                fontSize={24}
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col dark:border-gray-600 dark:bg-black">
          <ul className="mt-2 min-h-[562px] overflow-auto">
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
      </LeftContentLayout>
      <RightContentLayout>
        {LIST_COMPONENTS[selected].component}
      </RightContentLayout>
      <CustomModal
        openModal={openModal}
        body="Are you sure you want to logout?"
        textAccept="Yes, I'm sure"
        textClose="No, Cancel"
        actionArea={true}
        onClose={() => setOpenModal(false)}
        onAccept={async () => {
          clearLocalStorage()
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
          googleLogout()

          window.location.reload()
        }}
      />
    </RootLayout>
  )
}

export default Settings
