import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons'
import RootLayout from '../../layouts/RootLayout'
import { useLoading, useAuth } from '../../core/hooks'
import { sleep } from '../../utils'
import { useThemeMode } from 'flowbite-react'
import {
  Friends,
  Profiles,
  Account,
  Security,
  Notifications,
  Privacy,
  Help,
} from '../../components/core'
import {
  LeftContentLayout,
  RightContentLayout,
  CustomLink,
  CustomModal,
} from '../../components/ui'
import {
  AuthService,
  LocalStorageService,
  WebsocketService,
} from '../../core/services'

const LIST_SETTINGS = [
  {
    id: 0,
    title: 'Friends',
  },
  {
    id: 1,
    title: 'Profile',
  },
  {
    id: 2,
    title: 'Account',
  },
  {
    id: 3,
    title: 'Security',
  },
  {
    id: 4,
    title: 'Notifications',
  },
  {
    id: 5,
    title: 'Privacy',
  },
  {
    id: 6,
    title: 'Help',
  },
]

const LIST_COMPONENTS = [
  {
    component: <Friends />,
  },
  {
    component: <Profiles />,
  },
  {
    component: <Account />,
  },
  {
    component: <Security />,
  },
  {
    component: <Notifications />,
  },
  {
    component: <Privacy />,
  },
  {
    component: <Help />,
  },
]

const Settings = () => {
  const { id } = useAuth()
  const { state } = useLocation()
  const [openModal, setOpenModal] = useState(false)
  const { mode, setMode } = useThemeMode()
  const [selected, setSelected] = useState(state?.friendTap || 0)
  const { setGlobalLoading } = useLoading()

  useEffect(() => {
    return () => {
      setGlobalLoading(false)
    }
  }, [])

  return (
    <>
      <RootLayout>
        <LeftContentLayout>
          <div className="flex h-[80px] items-center justify-between border-b-[1px] border-gray-600 p-4">
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
            <ul>
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
      </RootLayout>
      <CustomModal
        openModal={openModal}
        body="Are you sure you want to logout?"
        textAccept="Yes, I'm sure"
        textClose="No, Cancel"
        actionArea={true}
        onClose={() => setOpenModal(false)}
        onAccept={async () => {
          if (WebsocketService.getInstance()) {
            WebsocketService.close()
          }
          await AuthService.signOut(id)
          LocalStorageService.clear()
          setOpenModal(false)
          setGlobalLoading(true)
          await sleep(3000)
          googleLogout()
          window.location.reload()
        }}
      />
    </>
  )
}

export default Settings
